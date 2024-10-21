"use server";

import { redirect } from "next/navigation";
// import { signIn } from "@/auth";
// import { AuthError } from "next-auth";
import {
  SignupFormSchema,
  LoginFormSchema,
  SignupFormState,
  User,
  NeonDbError,
} from "@/app/lib/definitions";
import bcrypt from "bcryptjs"; //must do pnpm install --save-dev @types/bcryptjs
import { sql } from "@vercel/postgres";
import { createAuthSession, destroySession } from "@/app/lib/session";

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email};`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}


function isNeonDbError(error: unknown): error is NeonDbError {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    "code" in error
  );
}

export async function authenticate(
  prevState: SignupFormState,
  formData: FormData
) {

  
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    callbackUrl: formData.get("callbackUrl"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data
  const { email, password, callbackUrl } = validatedFields.data;

  try {
    const user = await getUser(email);

    if (!user) {
      return {
        message: "Invalid credentials",
      };
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return {
        message: "invalid password!",
      };
    }

    // const id: string = user.id.toString();
    // console.log(typeof user.id);
    // console.log(typeof id);

    await createAuthSession(user.id, email);
    
  } catch (error) {
    // if (error instanceof AuthError) {
    //   switch (error.type) {
    //     case "CredentialsSignin":
    //       return { message: "Invalid credentials." };
    //     default:
    //       return { message: "Something went wrong." };
    //   }
    // }
    console.log(error);
    return { message: "Invalid credentials or something went wrong!" };
    throw new Error("Cannot sign in.");
  }
  //console.log(callbackUrl.slice(1));
  redirect(callbackUrl.slice(1) || '/tutorials');
}

export async function signup(state: SignupFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    callbackUrl: formData.get("callbackUrl"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { name, email, password, callbackUrl } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const data =
      await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword});`;

    const user = await getUser(email);

    if (!user) {
      return {
        message:
          "Something went wrong. An error occurred while creating your account.!",
      };
    }
    
    await createAuthSession(user.id, user.email);
    
  } catch (error: unknown) {
    if (isNeonDbError(error)) {
      if (error.name === "NeonDbError") {
        if (error.code === "23505") {
          return { message: error.detail.slice(4) };
        }
      }
    }
    console.log(error);
    return {
      message: "An error occur while creating your account!",
    };
    throw error;
  }
  redirect(callbackUrl.slice(1) || "/tutorials");
}

export async function logout() {
  await destroySession();

  redirect("/");
}

// if (Object.keys(errors).length > 0) {
//     console.log(errors);
//     return {
//         errors: errors,
//     }
// }
//store it in the database (create a new user)


// export async function authenticate(
//   mode: AuthMode,
//   prevState: SignupFormState,
//   formData: FormData
// ) {
//   if (mode === "login") {
//     return login(prevState, formData);
//   }

//   return signup(prevState, formData);
// }
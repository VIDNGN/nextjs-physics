"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import {
  SignupFormSchema,
  LoginFormSchema,
  SignupFormState,
  AuthMode,
} from "@/app/lib/definitions";
import bcrypt from "bcryptjs"; //must do pnpm install --save-dev @types/bcryptjs
import { sql } from "@vercel/postgres";

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

export async function authenticate(prevState: SignupFormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await signIn("credentials", formData);
    return {
      message: "login successful",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid credentials." };
        default:
          return { message: "Something went wrong." };
      }
    }

    throw new Error("Cannot sign in.");
  }
}

export async function signup(state: SignupFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const data =
      await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword});`;

    const user = data.rows[0];

    if (!user) {
      return {
        message: "An error occurred while creating your account.",
      };
    }
    redirect("/tutorial");
    
  } catch (error) {
    return {
      message: "and error occur while creating your account!",
    };
    throw error;
  }
}

// if (Object.keys(errors).length > 0) {
//     console.log(errors);
//     return {
//         errors: errors,
//     }
// }
//store it in the database (create a new user)

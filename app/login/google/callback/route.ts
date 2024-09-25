import { google, lucia } from "@/app/lib/session";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
//import { generateIdFromEntropySize } from "lucia";
import { v4 as uuidv4 } from "uuid";
import { GoogleUser } from "@/app/lib/definitions";
import { User } from "@/app/lib/definitions";
import { sql } from "@vercel/postgres";

async function getUser(google_id: string): Promise<User | undefined> {
  try {
    const user =
      await sql<User>`SELECT users.id, users.name, users.email, users.google_id, users.picture FROM users WHERE google_id = ${google_id};`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user with google_id:", error);
    throw new Error("Failed to fetch user with google_id.");
  }
}

export async function GET(request: Request): Promise<Response> {
  if (!process.env.AUTH_SECRET) {
    throw new Error("Auth Secret are required!");
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  
  const codeVerifier = process.env.AUTH_SECRET;
  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }
  const callbackUrl = cookies().get("callbackUrl")?.value ?? null;
  //console.log("callbackURL from google OAuth: ", callbackUrl); // http://localhost:3000/login?callbackUrl=%2Ftutorials%2Felectrical-charge

//   const redirectURL = decodeURIComponent(callbackUrl?.split('callbackUrl=')[1]) ?? '/chat' //decodeURIComponent will throw error if callbackUrl is null or undefined!!
  //console.log("redirectURL ", redirectURL);
  const redirectURL = callbackUrl ? decodeURIComponent(callbackUrl.split('callbackUrl=')[1] || '/chat') : '/chat'; //check for callbackUrl before attempting to decode and split. If callbackUrl is defined, then we split and decode. If the split fails to find the parameter (array [1]), we default to '/chat'. Finally, if the entire callback is null or undefined, we default to '/chat'

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const googleUserResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );

    const googleUser: GoogleUser = await googleUserResponse.json();

    if (!googleUser) {
      return new Response(null, {
        status: 500,
      });
    }

    const existingUser = await getUser(googleUser.sub); //googleUser sub looks like id. In db, sub is google_id.

    if (existingUser) {
      const { id, name, email, google_id, picture } = existingUser;
      const session = await lucia.createSession(existingUser.id, {
        email,
        google_id,
        name,
        picture,
      }); //lucia will use {email, google_id, name, picture} these names and look for db column names in user_sessions table.
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: `${redirectURL}`,
        },
      });
    }

    //const userId = generateIdFromEntropySize(10); // 16 characters long
    const userId = uuidv4();

    const { sub, name, picture, email } = googleUser;

    const google_id = sub; //since user_sessions db table has a column named google_id which is for sub

    await sql`INSERT INTO users (id, name, email, password, google_id, picture) VALUES (${userId}, ${googleUser.name}, ${googleUser.email}, 'google_password', ${googleUser.sub}, ${googleUser.picture});`;

    const session = await lucia.createSession(userId, {
      email,
      google_id,
      name,
      picture,
    });
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: `${redirectURL}`,
      },
    });
  } catch (error) {
    if (error instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

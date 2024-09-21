import { generateState } from "arctic";
import { google } from "@/app/lib/session";
import { cookies } from "next/headers";



export async function GET(): Promise<Response> {


    
if (!process.env.AUTH_SECRET) {
    throw new Error("Auth Secret are required!");
  }

    const codeVerifier = process.env.AUTH_SECRET;
	const state = generateState();
	const url : URL = await google.createAuthorizationURL(state, codeVerifier, {scopes: ["email", "profile"]});
    console.log(url);
	cookies().set("google_oauth_state", state, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax"
	});


	return Response.redirect(url);
}
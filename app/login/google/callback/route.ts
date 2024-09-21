import { google, lucia } from "@/app/lib/session";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
//import { generateIdFromEntropySize } from "lucia";
import { uuid } from 'uuidv4';
import { GoogleUser } from "@/app/lib/definitions";
import { User } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';

async function getUser (google_id: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT users.id, users.name, users.email, users.google_id, users.picture FROM users WHERE google_id = ${google_id};`
        return user.rows[0];
    } catch (error){
        console.error("Failed to fetch user with google_id:", error);
        throw new Error("Failed to fetch user with google_id.");
    }
}

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
    const codeVerifier = process.env.AUTH_SECRET!;
	const storedState = cookies().get("google_oauth_state")?.value ?? null;
	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

    try {
        const tokens = await google.validateAuthorizationCode(code, codeVerifier);
        const googleUserResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
            headers:{
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });

        const googleUser: GoogleUser = await googleUserResponse.json();

        if (!googleUser) {
            return new Response(null, {
                status: 500
            });
        }

        const existingUser = await getUser(googleUser.sub); //googleUser sub looks like id. In db, sub is google_id.
        
        if (existingUser) {
            const {id, name, email, google_id, picture } = existingUser;
            const session = await lucia.createSession(existingUser.id, {email, google_id, name, picture});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/chat"
				}
			});
        }

        //const userId = generateIdFromEntropySize(10); // 16 characters long
        const userId = uuid();

        const { sub, name, picture, email } = googleUser; 
        
        const google_id = sub;

        await sql`INSERT INTO users (id, name, email, password, google_id, picture) VALUES (${userId}, ${googleUser.name}, ${googleUser.email}, 'google_password', ${googleUser.sub}, ${googleUser.picture});`
        
        const session = await lucia.createSession(userId, {email, google_id, name, picture});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/chat"
			}
		});

    } catch (error) {
        if (error instanceof OAuth2RequestError ){
            return new Response(null, {
                status:400
            });
        }
        return new Response(null, {
            status: 500
        });
    }


}
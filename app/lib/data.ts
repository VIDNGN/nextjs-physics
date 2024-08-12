import { sql } from "@vercel/postgres";
import { Tutorial } from "./definitions";
import { TutorialsTable } from "./definitions";




export async function fetchTutorials(){

    try {

        const data = await sql<Tutorial>`SELECT * FROM tutorials`

        const tutorials = data.rows;

        return tutorials;

        
    }catch(error) {
        console.error("Database error: ", error);
        throw new Error("Failed to fetch all tutorials!");
    }
}

export async function fetchTutorialBySlug(slug: string){
    try{
        const data = await sql<Tutorial>`SELECT 
           tutorials.id, tutorials.slug, tutorials.title, tutorials.description FROM tutorials WHERE tutorials.slug= ${slug};`
    
        const tutorial = data.rows.map((tutorial) => ({
            ...tutorial,
        }));

        return tutorial[0];
        }   catch (error) {
            console.log("Database error: ", error);
            throw new Error("Failed to fetch tutorial.");
        }
}
import { sql } from "@vercel/postgres";
import { Tutorial, Question, Equipment, Option  } from "./definitions";
import { TutorialsTable } from "./definitions";
import { list } from '@vercel/blob';



export async function fetchTutorials(){

  

    try {

        const data = await sql`SELECT * FROM tutorials ORDER BY date ASC;`

        const tutorials = data.rows;

        return tutorials;

        
    }catch(error) {
        console.error("Database error: ", error);
        throw new Error("Failed to fetch all tutorials!");
    }
}

export async function fetchAllImages() {
    
    try {
        
        const blobs = await list();
        return blobs

    } catch (error){
        console.log(error);
        throw new Error("Failed to fetch blobs!")
    }

}

export async function fetchTutorialBySlug(slug: string){
    try{
        const data = await sql`SELECT 
           tutorials.slug, tutorials.title, tutorials.image_url, tutorials.description, tutorials.qslug FROM tutorials WHERE tutorials.slug= ${slug};`
    
        const tutorial = data.rows.map((tutorial) => ({
            ...tutorial,
        }));

        return tutorial[0];
        }   catch (error) {
            console.log("Database error: ", error);
            throw new Error("Failed to fetch tutorial.");
        }
}

export async function fetchQuestionsBySlug(slug: string) {
    try {
        const data = await sql<Question>`SELECT questions.question_id, questions.question_slug, questions.type, questions.question FROM questions WHERE questions.question_slug= ${slug};`

        const questions = data.rows.map( (question) => ({
            ...question,
        }) );

        return questions;
    }  catch(error) {
        console.log("Database error: ", error);
        throw new Error("Failed to fetch questions.");
    }
}

export async function fetchEquipmentBySlug(slug: string) {
    try {
        const data = await sql<Equipment>`SELECT demoequipment.equipment FROM demoequipment WHERE demoequipment.question_slug=${slug};`

        const equipmentAll = data.rows.map( (eqipment) => ( {
            ...eqipment,
        }));
        return equipmentAll;
    } catch (error){
        console.log("Database error: ", error);
        throw new Error("Failed to fetch equipment info.");
        }
}

export async function fetchOptionsAnswersBySlug(slug: string){
    try {
        const data = await sql<Option>`SELECT optionAnswers.id, optionAnswers.option_text, optionAnswers.is_correct FROM optionanswers WHERE optionAnswers.question_slug = ${slug};`

        const options = data.rows.map( (option) => ( {
            ...option,
        }));
        return options;
    } catch(error){
        console.log("Database error: ", error);
        throw new Error("Failed to fetch options answer.");
    }
}

export async function fetchCorrectAnswerbyQuestionId(questionId: string){
    try {
        const correctAnswers = await sql`SELECT question_id, correct_answer FROM questions WHERE question_id = ANY(${questionId});
        `;
        return correctAnswers.rows;
    } catch (error) {
        console.error("Error fetching correct answers:", error);
        return {
            message: "Error fetching correct answers.",
        };
    }

}
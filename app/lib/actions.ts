"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import xss from "xss";

const FormSchema = z.object({
  questionId: z.string(),
  answer_: z.string({ invalid_type_error: "Please enter your input." }),
  date: z.string(),
});

export type State = {
  errors?: {
    questionId?: string[];
    answer?: string[];
  };
  message?: string | null;
  correctAnswers: string[];
};

//const CreateTutorial = FormSchema.omit({ id: true, date: true });

export async function createTutorial(prevState: State, formData: FormData) {
  //const data = xss(formData);

  const rawFormData = Object.fromEntries(formData.entries());

  //console.log(rawFormData);
  //console.log(typeof rawFormData);

  const questionAnswerPairs = [];

  for (const [key, value] of Object.entries(rawFormData)) {
    if (key.startsWith("questionId_")) {
      const questionNum = key.split("_")[1];
      const answerKey = `answer_${questionNum}`;

      if (rawFormData[answerKey]) {
        questionAnswerPairs.push([questionNum, value, rawFormData[answerKey]]); //array of questions and answers
      }
    }
  }
  const date = new Date().toISOString().split("T")[0];
  try {
    await Promise.all(
      questionAnswerPairs.map(
        ([question_num, questionText, answer], id) => {

          const questionID = typeof question_num === 'string' ? question_num : '';
          const processedQuestionText = questionText instanceof File ? "File uploaded" : questionText;
          const processedAnswer = answer instanceof File ? "File uploaded" : answer;

          sql`INSERT INTO formanswers (question_id, question, answer, date) VALUES (${question_num}, ${questionText}, ${answer}, ${date});`
  })
    );

    const questionIds = questionAnswerPairs.map(([questionNum]) => questionNum );
    //console.log(questionIds);

    const correctAnswers = await sql`
                          SELECT question_id, correct_answer 
                          FROM questions 
                          WHERE question_id = ANY(${questionIds});`;

    //return the correct answers to the client
    //console.log("success message will be returned.");
    correctAnswers: correctAnswers.rows
    
    //console.log(correctAnswers.rows);

    return { message: "Form submitted successfully!", correctAnswers: correctAnswers.rows };
   
  } catch (error) {
    console.error("Error during form submission: ", error);
    return {
      message: "Database Error: Failed to create answer form.",
    };
  }

  //revalidatePath("/tutorials/");
  //redirect("/tutorials/")
}

//   'questionId_928d8227-afca-4265-9dad-dda5736eea96': 'Blow up the balloon, and rub it on your hair. Describe the behavior of your hair as you bring the balloon toward it.',
//   'answer_928d8227-afca-4265-9dad-dda5736eea96': 'test0\r\n\r\n\r\n',
//   'questionId_09766551-a92a-4a8e-8c40-a7e3137b5274': 'It is important that as you perform the experiment above, that you keep your hands and other objects away your hair. Explain why this is necessary',
//   'answer_09766551-a92a-4a8e-8c40-a7e3137b5274': 'test2',
//   'questionId_8032678c-02e5-4da1-9ad5-9bcb59ede678': 'Rub the PVC pipe with the Swiffer Duster. Bring the PVC pipe to your hair. Describe your observations',
//   'answer_8032678c-02e5-4da1-9ad5-9bcb59ede678': 'test3',
//   'questionId_87837e6e-d99c-41ab-ac8f-9573f7abd6b7': 'How does the distance between the pipe and your hair affect the interaction between them',
//   'answer_87837e6e-d99c-41ab-ac8f-9573f7abd6b7': 'test4',
//   'questionId_d448bc1b-66b4-4e6f-a4e0-f5b4072cee82': 'what would happen if you brought the PVC pipe and the balloon near each other? Describe the interaction?',
// 'answer_d448bc1b-66b4-4e6f-a4e0-f5b4072cee82': 'test5'

/* const columns = Object.keys(rawFormData);
    const values = Object.values(rawFormData);
    console.log("values: ", values);

    const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');
    console.log("placeholder: ", placeholders);
    
    await sql`INSERT INTO studentsAnswers (${columns.join(', ')}) VALUES (${placeholders}) RETURNING *`;


    Object.entries(rawFormData).forEach(([key, value]) => {

        console.log(`key: ${key}, value: ${value}`);
    }); */

//const validatedEntries = CreateTutorial.safeParse({rawFormData});

// if (!validatedEntries.success) {
//     console.log(validatedEntries);
//     return {
//         errors: validatedEntries.error.flatten().fieldErrors,
//         message: "Missing answers. Failed to submit questions!"
//     };
// }

// if (validatedEntries.success) {
//     console.log(validatedEntries.data);
// }

"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import {
  CorrectAnswer,
  State,
  AskQuestionFormSchema,
  DiscussionFormState,
  DiscussionReplyFormSchema,
  ContactFormState,
  ContactFormSchema,
  SurveyFormState,
  MyFormData,
} from "@/app/lib/definitions";
import { v4 as uuidv4 } from "uuid";
import { validate as validateUUID } from "uuid";
import { verifyAuth } from "@/app/lib/session";
import { createSurveyEntry, submitSurveyAnswers } from "@/app/lib/data";

const FormSchema = z.object({
  questionId: z.string(),
  answer_: z.string({ invalid_type_error: "Please enter your input." }),
  date: z.string(),
});

//const CreateTutorial = FormSchema.omit({ id: true, date: true });

export async function createTutorial(prevState: State, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  if (!rawFormData) {
    return {
      errors: "Form data is invalid!",
      message: "Form is empty",
      correctAnswers: [],
    };
  }
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
      questionAnswerPairs.map(([question_num, questionText, answer], id) => {
        const questionID = typeof question_num === "string" ? question_num : "";
        const processedQuestionText =
          questionText instanceof File ? "File uploaded" : questionText;
        const processedAnswer =
          answer instanceof File ? "File uploaded" : answer;

        // const questionID =  question_num as string;
        // const processedQuestionText = questionText as string;
        // const processedAnswer = answer as string;

        sql`INSERT INTO formanswers (question_id, question, answer, date) VALUES (${questionID}, ${processedQuestionText}, ${processedAnswer}, ${date});`;
      })
    );
  } catch (error) {
    console.log("Error insert to formanswer: ,", error);
    return {
      errors: "Failed to process form data.",
      message: "Failed to submit form.",
      correctAnswers: [],
    };
  }

  const questionIds = questionAnswerPairs?.map(
    ([questionNum]) => questionNum as string
  ); //or questionNum as number

  try {
    const dbCorrAnswers = await sql<CorrectAnswer>`
                          SELECT question_id, correct_answer
                          FROM questions
                          WHERE question_id = ANY(${questionIds as any})`;

    // Check if dbCorrAnswers is undefined
    if (!dbCorrAnswers) {
      console.error("dbCorrAnswers is undefined or null");
    }

    //return the correct answers to the client
    console.log("success message will be returned.");

    const answers = dbCorrAnswers?.rows;

    if (dbCorrAnswers) {
      return {
        message: "Your responses have been successfully submitted. Thank you!", //// If there's no message, set it to null
        correctAnswers: answers ?? [], //can also use optional chaining to access rows and nullish coalescing to ensure dbCorrectAnswers.rows has a fallback if it's undefined
      };
    } else {
      return {
        errors: "Can't find correct answers. Failed to submit form.",
        message: "Form not successfully submitted!", //// If there's no message, set it to null
        correctAnswers: answers ?? [], //can also use optional chaining to access rows and nullish coalescing to ensure dbCorrectAnswers.rows has a fallback if it's undefined
      };
    }
  } catch (error) {
    console.log("Error during form submission: ", error);
    return {
      message: "Failed to submit form.",
      correctAnswers: [],
    };
  }

  return {
    message: "Unknown form submission",
    correctAnswers: [],
  };

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

export async function answerQuestions(
  prevState: DiscussionFormState,
  formData: FormData
) {
  const validatedFields = AskQuestionFormSchema.safeParse({
    subject: formData.get("subject"),
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ask Questions Form Missing fields",
    };
  }

  const { subject, content } = validatedFields.data;
  console.log(subject);
  console.log(content);

  const date = new Date().toISOString().split("T")[0];

  const result = await verifyAuth();
  const sessionData = result.session;
  const username = sessionData?.email?.split("@")[0];

  try {
    await sql`INSERT into discussions (username, subject, content, date) VALUES (${username}, ${subject}, ${content}, ${date});`;
    //return { message: "Successfully submitted your message."}
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong. Cannot submitted your message!" };
  }
  console.log("Your responses have been successfully submitted. Thank you!.");
  redirect("/chat");
}

export async function replyDiscussion(
  //discussionId: string, //if want to use bind to bind discussionId and subject.
  //subject: string,
  prevState: DiscussionFormState,
  formData: FormData
) {
  const validatedFields = DiscussionReplyFormSchema.safeParse({
    discussionId: formData.get("discussionId"),
    subject: formData.get("subject"),
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Discussion Form Missing fields",
    };
  }

  const { discussionId, subject, content } = validatedFields.data;
  console.log(subject);
  //console.log(content);

  const date = new Date().toISOString().split("T")[0];

  const result = await verifyAuth();
  const sessionData = result.session;
  const username = sessionData?.email?.split("@")[0];

  try {
    await sql`INSERT into replies (discussion_id, username, subject, content, date) VALUES (${discussionId}, ${username}, ${subject}, ${content}, ${date});`;
    revalidatePath("/chat");
    return {
      success: true,
      message: "Thank you! Your message has been posted.",
    };
  } catch (error) {
    console.error("Error inserting reply: ", error);
    return { success: false };
  }

  //console.log("Your responses have been successfully submitted. Thank you!");
  //revalidatePath("/chat");
  //redirect('/chat');
}

export async function postReplyToServer(
  discussionId: string,
  data: { content: string }
) {
  try {
    // Insert the reply into the database
    await sql`
      INSERT INTO replies (discussionId, content, date)
      VALUES (${discussionId}, ${data.content}, NOW())
    `;

    // If no error is thrown, assume success
    return { success: true };
  } catch (error) {
    console.error("Error inserting reply:", error);
    return { success: false };
  }
}

export async function contact(prevState: ContactFormState, formData: FormData) {
  // Use Zod to update the expected types:
  //const CreateContactMessage = ContactFormSchema.omit({ date: true });
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    content: formData.get("content"),
    callbackUrl: formData.get("callbackUrl"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Message Form Missing fields",
    };
  }

  const { name, email, content, callbackUrl } = validatedFields.data;

  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`INSERT INTO contacts (name, email, content, date) VALUES (${name}, ${email}, ${content}, ${date});`;
    return {
      success: true,
      message: "Thank you! Your message has beent sent.",
    };
  } catch (error) {
    console.error("Error inserting into contacts: ", error);
    return {
      success: false,
      message: "Something's wrong. Failed to submit your message",
    };
  }
}

export async function createSurvey(
  prevState: SurveyFormState,
  formData: MyFormData
) {
  //const rawFormData = Object.fromEntries(formData.entries());
  const rawFormData = formData;
  console.log(rawFormData);

  if (!rawFormData) {
    return {
      errors: "Form data is invalid!",
      message: "Form is empty",
      correctAnswers: [],
    };
  }

  let survey_id = null;
  try {
    survey_id = await createSurveyEntry(formData);

    console.log("survey_id: ", survey_id);

    const result = await submitSurveyAnswers(survey_id, formData);

    if (result) {
      // return {
      //   success: true,
      //   message: survey_id,
      // };
   
    }
  } catch (error) {
    console.error("Failed to submit answers for survey: ", error);
    return { errors: "Failed to submit survey answers" };
  }

  return redirect(`/learningPath?survey_id=${survey_id}`);

  // try {
  //  // await sql`INSERT INTO contacts (name, email, content, date) VALUES (${name}, ${email}, ${content}, ${date});`;
  //   return {
  //     success: true,
  //     message: "Thank you! Your message has beent sent.",
  //   };
  // } catch (error) {
  //   console.error("Error inserting into contacts: ", error);
  //   return { success: false, message: "Something's wrong. Failed to submit your message"};
  // }
}

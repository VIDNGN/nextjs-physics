// import pg from "pg";
import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import { put } from "@vercel/blob";

import {
  users,
  alltutorials,
  questions,
  answerOptions,
  shortAnswers,
  studentAnswers,
  demoEquipment,
} from "@/app/lib/placeholder-data";

const fs = require("fs");
const path = require("path");
const mime = require("mime-types"); // For determining content type

/* 
const { Client } = pg;

const client = new Client({
    user : process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POGTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
// });

try{
    await client.connect() 
} catch(error){
    console.log(error);

} */

const client = await db.connect();

if (!client) {
  console.log("cannot connect. client is null!");
}

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
          INSERT INTO users (id, name, email, password)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
    })
  );

  return insertedUsers;
}

async function seedTutorials() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS tutorials (
      tutorial_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      image_url TEXT NOT NULL,
      image_url_2 TEXT,
      date DATE NOT NULL,
      description TEXT NOT NULL,
      qSlug TEXT NOT NULL
    );
  `;

  const insertedTutorials = await Promise.all(
    alltutorials.map(
      (tutorial) => client.sql`
        INSERT INTO tutorials (slug, title, image_url, image_url_2, date, description, qSlug)
        VALUES (${tutorial.slug}, ${tutorial.title}, ${tutorial.image_url}, ${tutorial.image_url_2}, ${tutorial.date}, ${tutorial.content}, ${tutorial.qSlug})
        ON CONFLICT (slug) DO NOTHING;`
    )
  );

  return insertedTutorials;
}

async function seedQuestions() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`CREATE TABLE IF NOT EXISTS questions (
    question_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, 
    tutorial_id UUID NOT NULL, 
    question_slug TEXT NOT NULL, 
    type TEXT NOT NULL, 
    question TEXT NOT NULL,
    FOREIGN KEY (tutorial_id) REFERENCES tutorials(tutorial_id) ON DELETE SET NULL);`;

  const insertQuestions = await Promise.all(
    questions.map((question) => {
      client.sql`
        INSERT INTO questions (tutorial_id, question_slug, type, question) VALUES (${question.tutorial_id}, ${question.qSlug}, ${question.type}, ${question.question})
        ON CONFLICT (question_id) DO NOTHING;
        `;
    })
  );
  return insertQuestions;
}

async function seedMultipleChoiceAnswers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`CREATE TABLE IF NOT EXISTS optionAnswers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        tutorial_id UUID NOT NULL, 
        question_id UUID NOT NULL,
        question_slug TEXT NOT NULL,
        question TEXT NOT NULL,
        option_text TEXT NOT NULL,
        is_correct BOOLEAN NOT NULL,
        FOREIGN KEY (tutorial_id) REFERENCES tutorials(tutorial_id) ON DELETE SET NULL,
        FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE SET NULL
         );
    `;

  const insertMultipleChoice = await Promise.all(
    answerOptions.map(
      (option, id) => client.sql`
        INSERT INTO optionAnswers (tutorial_id, question_id, question_slug, question, option_text, is_correct)
        VALUES (${option.tutorial_id}, ${option.question_id}, ${option.qSlug}, ${option.question}, ${option.option_text}, ${option.is_correct})
        ON CONFLICT (id) DO NOTHING; `
    )
  );

  return insertMultipleChoice;
}

async function seedShortAnswers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`CREATE TABLE IF NOT EXISTS shortAnswers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        tutorial_id UUID NOT NULL, 
        question_id UUID NOT NULL,
        question_slug TEXT NOT NULL,
        question TEXT NOT NULL, 
        correct_answer TEXT NOT NULL,
        FOREIGN KEY (tutorial_id) REFERENCES tutorials(tutorial_id) ON DELETE SET NULL,
        FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE SET NULL
     );
    `;

  const insertShortAnswers = await Promise.all(
    shortAnswers.map(
      (shortAnswer) => client.sql`
        INSERT INTO shortAnswers (tutorial_id, question_id, question_slug, question, correct_answer)
        VALUES (${shortAnswer.tutorial_id}, ${shortAnswer.question_id},${shortAnswer.qSlug},${shortAnswer.question}, ${shortAnswer.correctAnswer})
        ON CONFLICT (id) DO NOTHING; `
    )
  );

  return insertShortAnswers;
}

async function seedStudentAnswers() {
  studentAnswers.map((answer, id) => console.log(answer.tutorial_slug));

  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`CREATE TABLE IF NOT EXISTS studentsAnswers ( 
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, 
            tutorial_id UUID NOT NULL, 
            question_id UUID NOT NULL, 
            question_slug TEXT NOT NULL, 
            question TEXT NOT NULL, 
            answer TEXT NOT NULL,
            FOREIGN KEY (tutorial_id) REFERENCES tutorials(tutorial_id) ON DELETE SET NULL,
            FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE SET NULL
            );`;

  const insertStudentAnswers = await Promise.all(
    studentAnswers.map(
      (answer, id) =>
        client.sql`INSERT INTO studentsAnswers (tutorial_id, question_id, question_slug, question, answer)
            VALUES (
            ${answer.tutorial_id}, ${answer.question_id}, ${answer.qSlug}, ${answer.question}, ${answer.answer}
            )
            ON CONFLICT (id) DO NOTHING;`
    )
  );
  return insertStudentAnswers;
}

async function seedtutorialEquipment() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`CREATE TABLE IF NOT EXISTS demoEquipment ( 
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        tutorial_id UUID NOT NULL,
        question_slug TEXT NOT NULL,
        equipment TEXT,
        FOREIGN KEY (tutorial_id) REFERENCES tutorials(tutorial_id) ON DELETE SET NULL
        ); `;

  const insertDemoEquipment = await Promise.all(
    demoEquipment.map(
      (
        demoEquipment
      ) => client.sql`INSERT INTO demoEquipment (tutorial_id, question_slug, equipment) 
            VALUES (${demoEquipment.tutorial_id}, ${demoEquipment.qSlug}, ${demoEquipment.equipment}) 
            ON CONFLICT (id) DO NOTHING;`
    )
  );

  return insertDemoEquipment;
}

async function seedFormAnswers() {
  //studentAnswers.map((answer, id) => console.log(answer.tutorial_slug));

  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`CREATE TABLE IF NOT EXISTS formanswers ( 
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, 
            question_id UUID NOT NULL,
            question TEXT NOT NULL, 
            answer TEXT NOT NULL,
            date DATE NOT NULL,
            FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE SET NULL
            );`;

  const insertFormAnswers = await Promise.all(
    studentAnswers.map(
      (answer, id) =>
        client.sql`INSERT INTO formanswers (question_id, question, answer, date)
            VALUES (${answer.question_id}, ${answer.question}, ${answer.answer}, ${answer.date}
            )
            ON CONFLICT (id) DO NOTHING;`
    )
  );
  return insertFormAnswers;
}

async function updateQuestions() {
  //await client.sql`ALTER TABLE questions ADD COLUMN correct_answer TEXT;`

  const UpdateNewCol = await Promise.all(
    questions.map((question) => {
      client.sql`UPDATE questions SET correct_answer = (${question.correctAnswer}) WHERE question_id = ${question.id};`;
    })
  );

  return updateQuestions;
}

async function seedDatabase() {
  // await seedUsers();
}

async function seedTutorialsImages() {
  //studentAnswers.map((answer, id) => console.log(answer.tutorial_slug));

  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`CREATE TABLE IF NOT EXISTS tutorials_images  ( 
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, 
            image_url TEXT NOT NULL,
            tutorial_id UUID NOT NULL,
            FOREIGN KEY (tutorial_id) REFERENCES tutorials(tutorial_id) ON DELETE SET NULL
            );`;

  const insertTutorialsImages = await Promise.all(
    alltutorials.map(
      (tutorial, id) =>
        client.sql`INSERT INTO tutorials_images (tutorial_id, image_url)
            VALUES (${tutorial.id}, ${tutorial.image_url} 
            )
            ON CONFLICT (id) DO NOTHING;`
    )
  );
  return insertTutorialsImages;
}

async function uploadImagesToBlobFromLocal(folderPath) {

  const files = fs
      .readdirSync(folderPath)
      .map((fileName) => path.join(folderPath, fileName));


  const uploadPromises = files.map(async (filePath) => {
    try {

      if (fs.existsSync(filePath)) {
        console.log("File exists:", filePath);
      } else {
        console.error("File not found:", filePath);
      }

      //const fileStream = fs.createReadStream(filePath);
      // fileStream.on("error", (error) => {
      //   console.log("Error in file stream: ", error.message);
      // });

      const fileContent = fs.readFileSync(filePath);

      if (fileContent === null || fileContent === undefined) {
        throw new Error("File content is null or undefined!");
      }

      const fileName = path.basename(filePath);
      const contentType = mime.lookup(filePath);

      if (!contentType) {
        throw new Error(
          `Unable to determine content type for file: ${fileName}`
        );
      }

      const { url} = await put(fileName, fileContent, {
        access: "public",
        contentType,
      });

      return {fileName, url} ;
    } catch (error) {
      console.log(error);
    }
  });

  //fs.readdir(files).forEach((file) => Blob.upload(file));
  //const imageResponses = await Promise.all(imageUploads);

  return Promise.all(uploadPromises);
}

async function updateTutorialsImages(tutorialId, folderPath) {

  // Upload images from local storage
  const uploadedImages = await uploadImagesToBlobFromLocal(folderPath);

  // Update the homework_images table with the URLs
  const updatePromises = uploadedImages.map(({ fileName, url }) => {
    return client.sql`
      INSERT INTO tutorials_images (tutorial_id, image_url)
      VALUES (${tutorialId}, ${url});
    `;
  });

  return Promise.all(updatePromises);
}

export async function GET() {
  // return Response.json({
  //     message:
  //         'Uncomment this file and remove this line. Can delete this file after seeding the DB.',
  // });

  try {
    await client.sql`BEGIN`;

    // await seedUsers();
    // await seedTutorials();
    //await seedQuestions();
    //await seedShortAnswers();
    //await seedMultipleChoiceAnswers();
    //await seedStudentAnswers();
    //await seedtutorialEquipment();
    //await seedFormAnswers();
    //await updateQuestions();
    //await seedTutorialsImages();

    const cwd = process.cwd();

    const folderPath1 = cwd + "\\public\\em\\electric_charge";
    await updateTutorialsImages(alltutorials[0].id, folderPath1);
    const folderPath2 = cwd + "\\public\\em\\electric_field";
    await updateTutorialsImages(alltutorials[2].id, folderPath2);
    const folderPath3 = cwd + "\\public\\em\\gauss";
    await updateTutorialsImages(alltutorials[3].id, folderPath3);
    const folderPath4 = cwd + "\\public\\em\\application_em";
    await updateTutorialsImages(alltutorials[5].id, folderPath4);
    const folderPath5 = cwd + "\\public\\em\\vector_calculus";
    await updateTutorialsImages(alltutorials[4].id, folderPath5);
    const folderPath6 = cwd + "\\public\\em\\coulomb";
    await updateTutorialsImages(alltutorials[1].id, folderPath6);

    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.log(error);
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}

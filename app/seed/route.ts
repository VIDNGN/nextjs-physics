//import pg from "pg";
// import bcrypt from 'bcrypt';
// import { db } from '@vercel/postgres';

// import { users, tutorials } from '@/app/lib/placeholder-data';


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

// const client = await db.connect();

// if (!client) {
//   console.log("cannot connect. client is null!");
// }

// async function seedUsers() {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     await client.sql`
//       CREATE TABLE IF NOT EXISTS users (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email TEXT NOT NULL UNIQUE,
//         password TEXT NOT NULL
//       );
//     `;

//     const insertedUsers = await Promise.all(
//         users.map(async (user) => {
//             const hashedPassword = await bcrypt.hash(user.password, 10);
//             return client.sql`
//           INSERT INTO users (id, name, email, password)
//           VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//           ON CONFLICT (id) DO NOTHING;
//         `;
//         }),
//     );

//     return insertedUsers;
// }

// async function seedTutorials() {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     await client.sql`
//     CREATE TABLE IF NOT EXISTS tutorials (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       slug TEXT NOT NULL,
//       title TEXT NOT NULL,
//       image_url TEXT NOT NULL,
//       date DATE NOT NULL,
//       description TEXT NOT NULL,
//       formSlug TEXT NOT NULL
//     );
//   `;

//     const insertedTutorials = await Promise.all(
//         tutorials.map(
//             (tutorial) => client.sql`
//         INSERT INTO tutorials (slug, title, image_url, date, description, formSlug)
//         VALUES (${tutorial.slug}, ${tutorial.title}, ${tutorial.image_url}, ${tutorial.date}, ${tutorial.content}, ${tutorial.formSlug})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//         ),
//     );

//     return insertedTutorials;
// }

// export async function GET() {

//     try {
//         await client.sql`BEGIN`;
//         await seedUsers();
//         await seedTutorials();
//         await client.sql`COMMIT`;
//         return Response.json({ message: 'Database seeded successfully' });
//     } catch (error) {
//         await client.sql`ROLLBACK`;
//         return Response.json({ error }, { status: 500 });
//     }

// }
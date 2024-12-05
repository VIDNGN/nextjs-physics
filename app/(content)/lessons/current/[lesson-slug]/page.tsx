import {fetchLessonBySlug} from "@/app/lib/data";

export default async function CurrentLesson({ params }: { params: { "lesson-slug": string } }) {
    // const lesson = await getLessonByTitle(decodeURIComponent(params["lesson-title"]));
    
    const lesson = await fetchLessonBySlug((params["lesson-slug"]));
    return (
      <div>
        <h1>{lesson.title}</h1>
        <p>{lesson.content}</p>
      </div>
    );
  }
  
//   async function getLessonByTitle(title: string) {
//     // Simulated database query
//     return {
//       title,
//       content: "Full lesson content goes here.",
//     };
//   }
  
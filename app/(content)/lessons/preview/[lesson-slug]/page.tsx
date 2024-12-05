import {fetchLessonBySlug} from "@/app/lib/data"


export default async function PreviewLesson({ params }: { params: { "lesson-slug": string } }) {
  // const lesson = await getLessonByTitle(decodeURIComponent(params["lesson-title"]));
  const lesson = await fetchLessonBySlug(params["lesson-slug"]);
  return (
    <div>
      <h2>Preview: {lesson.title}</h2>
      <p>{lesson.content}</p>
    </div>
  );
}

// async function getLessonBySlug(title: string) {
//   // Simulate a database query
//   return {
//     title,
//     preview: "Preview of the lesson goes here.",
//   };
// }

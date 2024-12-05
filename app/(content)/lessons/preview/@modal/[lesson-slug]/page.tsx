"use client";

export default function PreviewModal({ params }: { params: { "lesson-slug": string } }) {
  const { "lesson-slug": lessonSlug } = params;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={() => window.history.back()} // Close modal on background click
    >
      <div
        className="bg-white p-6 rounded"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
      >
        <h2>Preview Lesson: {lessonSlug}</h2>
        <p>This is a modal preview of the lesson.</p>
        <button onClick={() => window.history.back()} className="mt-4">
          Close
        </button>
      </div>
    </div>
  );
}

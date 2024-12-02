<Modal isOpen={isPreviewOpen} onClose={closePreviewModal}>
  <h3>{selectedLesson.title}</h3>
  <p>{selectedLesson.summary}</p>
  {selectedLesson.prerequisites.length > 0 && (
    <p>
      This lesson builds on:
      {selectedLesson.prerequisites.map((prerequisite) => (
        <span key={prerequisite.id}>{prerequisite.title}</span>
      ))}
    </p>
  )}
  <button onClick={() => navigateToLesson(selectedLesson.prerequisites[0].id)}>
    Go to Prerequisite
  </button>
  <button onClick={() => previewLesson(selectedLesson.id)}>Preview Lesson</button>
</Modal>
 
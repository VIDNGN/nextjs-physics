export default function PreviewLayout({
    children,
    modal, // Parallel route for modal
  }: {
    children: React.ReactNode;
    modal: React.ReactNode;
  }) {
    return (
      <html>
        <body>
          {children} {/* Main content */}
          {modal} {/* Intercepted modal */}
        </body>
      </html>
    );
  }
  
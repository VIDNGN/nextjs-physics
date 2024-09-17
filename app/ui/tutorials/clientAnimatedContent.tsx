"use client";

import { motion, Variants} from "framer-motion";

export default function ClientAnimatedContent({
  paragraphs,
}: {
  paragraphs: string[];
}) {
  const sentenceVariant: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { ease: "linear", duration: 5 } },
  };

  return (
    <>
      {paragraphs.map((paragraph, idx) => (
        <motion.div key={idx} variants={sentenceVariant} initial="hidden" animate="visible">
          <p>{paragraph}</p>
        </motion.div>
      ))}
    </>
  );
}

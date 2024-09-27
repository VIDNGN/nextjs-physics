"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { TutorialImage } from "@/app/lib/definitions";

interface ImageProps {
  image: TutorialImage;
  scale: number;
  xCalOrigin: string; // e.g., '50vh'
  xCalMov: string; // e.g., '100px'
}

export default function ClientAnimatedImages({
  image,
  scale,
  xCalOrigin,
  xCalMov,
}: ImageProps) {
  const name = image.image_name.split(".").slice(0, -1).join("."); //slice returns onbject, doing .join(".") to make the returned a string
  const caption = name.replace(/[_-]/g, " "); //g flag ensures that all instances are replaced, not just the first one.

  return (
    <>
      <motion.div
        whileTap={{ scale: `${scale}`, x: `calc(${xCalOrigin} - ${xCalMov})` }}
        // whileInView={{
        //   opacity: [0, 1],
        //   transition: { type: "spring", stiffness: 500 }, // damping: 100
        //   //duration: 0.5,
        //   zIndex:-1
        // }}
        style={{ transformOrigin: "Center" , position: "relative"}}
      >
        <figure className="flex flex-col items-center z-0">
          <Image
            className="rounded-lg w-auto h-96 p-4"
            priority
            // src={tutorial.image_url}
            src={image.image_url}
            // alt={image.image_name.split('.').slice(0,-1)}
            alt={caption}
            width={1024}
            height={638}
          />
          <figcaption>{caption}</figcaption>
        </figure>
      </motion.div>
    </>
  );
}

import {
  fetchTutorialBySlug,
  fetchAllImagesFromBlob,
  fetchImagesByTutorialSlug,
} from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Breadcrumbs from "@/app/ui/tutorials/breadcrumbs";
//import { lusitana } from "@/app/ui/fonts";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/ui/button";
import { unstable_noStore as noStore } from "next/cache";
import { motion, Variants } from "framer-motion";
import ClientAnimatedImages from "@/app/ui/tutorials/clientAnimatedImages";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/20/solid";
import AskQuestionClient from "@/app/ui/chat/ask-question-client";
import { verifyAuth, getSessionData } from "@/app/lib/session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Tutorials",
};

export default async function Page({ params }: { params: { slug: string } }) {
  noStore();
  const tslug = params.slug;
  //console.log(tslug);

  const tutorial = await fetchTutorialBySlug(tslug);
  //const title = tutorial.title;
  //const images = await fetchAllImagesFromBlob();

  const tutorial_images = await fetchImagesByTutorialSlug(tslug);

  const keyTerms = [
    "gravity",
    "strong nuclear force",
    "like charges repel, and opposite charges attract",
    "uncertainty principle",
    "Coulomb's Law",
  ];

  const highlightTerms = (text: string) => {
    const regex = new RegExp(`(${keyTerms.join("|")})`, "gi");
    return text.split(regex).map((part, idx) =>
      keyTerms.includes(part) ? (
        <strong key={idx} className="font-bold">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  if (!tutorial) {
    notFound();
  }

  //verify if user is logged in
  const result = await verifyAuth();
  const userId = result.user;

  return (
    <main className="w-full max-w-7xl justify-center z-0">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tutorials", href: "/tutorials" },
          { label: `${tslug}`, href: `/tutorials/${tslug}`, active: true },
        ]}
      />

      <div className="mt-6 flex justify-end">
        <AskQuestionClient isAuthenticated={!!userId} buttonName="Ask Questions"/>
      </div>

      <div className="flex flex-col justify-left">
        <div>
          {tutorial_images
            .filter((image) => image.image_name.startsWith(`${tslug}`))
            .map((image, index) => (
              <div key={image.image_name}>
                {/*First image*/}
                {image.image_name.includes("atomic-model") && (
                  <div className="flex flex-row">
                    {/* <Image
                        className="rounded-lg w-2/5 h-2/5 bg-gray-100 p-4 shadow-md"
                        priority
                        // src={tutorial.image_url}
                        src={image.image_url}
                        alt={tutorial.title}
                        width={1024}
                        height={638}
                      /> */}
                    <ClientAnimatedImages
                      image={image}
                      scale={1.3}
                      xCalOrigin="5vh"
                      xCalMov="15px"
                    />
                  </div>
                )}
              </div>
            ))}

          <div className="py-8">
            <h1 className="text-4xl font-bold"> {tutorial.title}</h1>{" "}
          </div>

          <div className="text-justify leading-9 whitespace-pre-wrap bg-gray-100 p-6 rounded-lg shadow-md">
            {tutorial.description
              .split(/\r\n|\r|\n/) //The default line ending varies depending on the platform (Unix, Windows, etc.). The line splitting provided in this example works on all platforms.
              .map((paragraph: string, idx: number, paragraphs: string[]) =>
                idx < 3 ? (
                  <div key={idx}>
                    <p>
                      {paragraph.split(/(\.)/).map(
                        (sentence: string, index: number) =>
                          // <motion.span key={index} variants={sentenceVariant}>
                          // {" "}
                          index === 0 && idx === 0 ? (
                            <strong key={index}>
                              {highlightTerms(sentence)}
                            </strong>
                          ) : (
                            highlightTerms(sentence)
                          )
                        // </motion.span>
                      )}
                    </p>
                    {idx === 2 && (
                      <div className="flex flex-row p-2">
                        {tutorial_images.map((image, index) => (
                          <div key={image.image_name}>
                            {image.image_name.includes(
                              "Rutherford_atom_model"
                            ) && (
                              <div className="p-2">
                                {/* <Image
                                      className="rounded-lg w-96 h-96 shadow-md"
                                      priority
                                      // src={tutorial.image_url}
                                      src={image.image_url}
                                      alt={tutorial.title}
                                      width={1024}
                                      height={638}
                                    /> */}
                                <ClientAnimatedImages
                                  image={image}
                                  scale={1.3}
                                  xCalOrigin="0vh"
                                  xCalMov="5px"
                                />
                              </div>
                            )}
                          </div>
                        ))}

                        {tutorial_images
                          .filter((image) =>
                            image.image_name.startsWith(`${tslug}`)
                          )
                          .map((image, index) => (
                            <div key={image.image_name}>
                              {image.image_name.includes(
                                "simple_model_atom"
                              ) && (
                                <div className="p-2">
                                  {/* <Image
                                    className="rounded-lg w-96 h-96 shadow-md"
                                    priority
                                    // src={tutorial.image_url}
                                    src={image.image_url}
                                    alt={tutorial.title}
                                    width={1064}
                                    height={1064}
                                  /> */}
                                  <ClientAnimatedImages
                                    image={image}
                                    scale={1.3}
                                    xCalOrigin="0vh"
                                    xCalMov="10px"
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div key={idx} className="">
                    <div className="">
                      {/* add text motion */}

                      <p>
                        {paragraph.split(/(\.)/).map(
                          (sentence: string, idx: number) =>
                            // <motion.span
                            //   key={idx}
                            //   variants={sentenceVariant}
                            // >
                            highlightTerms(sentence)
                          // </motion.span>
                        )}
                      </p>
                    </div>
                    {idx === 5 && (
                      <div>
                        {tutorial_images.map((image, index) => (
                          <div key={image.image_name}>
                            {image.image_name.includes("Rutherford_model") && (
                              <div className="p-2">
                                {/* <Image
                                  className="rounded-lg w-96 h-96 shadow-md"
                                  priority
                                  // src={tutorial.image_url}
                                  src={image.image_url}
                                  alt={tutorial.title}
                                  width={1024}
                                  height={638}
                                /> */}
                                <ClientAnimatedImages
                                  image={image}
                                  scale={2}
                                  xCalOrigin="0vh"
                                  xCalMov="10px"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href={`${tutorial.slug}/${tutorial.qslug}/`}
            className="flex h-10 items-center rounded-lg bg-[#27374D] px-4 text-sm font-medium text-white transition-colors hover:bg-[#526D82] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-[#526D82] active:bg-[#27374D] aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
          >
            To Experiment
          </Link>
        </div>
      </div>
    </main>
  );
}

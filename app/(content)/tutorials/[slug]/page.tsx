import { fetchTutorialBySlug, fetchAllImages } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Breadcrumbs from "@/app/ui/tutorials/breadcrumbs";
import { lusitana } from "@/app/ui/fonts";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/ui/button";
import { unstable_noStore as noStore } from "next/cache";

export const metadata: Metadata = {
  title: "Tutorials",
};

export default async function Page({ params }: { params: { slug: string } }) {
  noStore();
  const tslug = params.slug;
  //console.log(tslug);

  const tutorial = await fetchTutorialBySlug(tslug);
  //const title = tutorial.title;
  const images = await fetchAllImages();

  const keyTerms = [
    "gravity",
    "strong nuclear force",
    "like charges repel, and opposite charges attract",
    "uncertainty principle",
    "Coulomb's Law"
  ];

  const highlightTerms = (text:string) => {
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
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tutorials", href: "/tutorials" },
          { label: `${tslug}`, href: `/tutorials/${tslug}`, active: true },
        ]}
      />
      <div className="flex flex-col justify-left">
        <div>
          {images.blobs
            .filter((image) => image.pathname.startsWith(`${tslug}`))
            .map((image, index) => (
              <div key={image.pathname}>
                {/*First image*/}
                {index === 1 && (
                  <div className="section1 flex flex-row">
                    <Image
                      className="rounded-lg w-2/5 h-2/5"
                      priority
                      // src={tutorial.image_url}
                      src={image.url}
                      alt={tutorial.title}
                      width={1024}
                      height={638}
                    />
                  </div>
                )}
              </div>
            ))}
          <div className="py-8">
            <h1 className="text-4xl font-bold"> {tutorial.title}</h1>{" "}
          </div>
          <div className="grid grid-cols-2 gap-36">
            <div className="text-justify leading-9 whitespace-pre-wrap bg-gray-100 p-6 rounded-lg shadow-md">
              <p>
                {tutorial.description.split(".").map((sentence:string, idx:number) => (
                  <span key={idx}>
                    {idx === 0 ? (
                      <strong>{highlightTerms(sentence)}</strong>
                    ) : (
                      highlightTerms(sentence)
                    )}
                  </span>
                ))}
              </p>
            </div>
            <div className="px-8 space-y-8">
              {images.blobs
                .filter((image) => image.pathname.startsWith(`${tslug}`))
                .map((image, index) => (
                  <div key={image.pathname}>
                    {/* next 3 images */}

                    {index === 4 && (
                      <div>
                        <Image
                          className="rounded-lg w-3/5 h-3/5 bg-gray-100 p-6 rounded-lg shadow-md"
                          priority
                          // src={tutorial.image_url}
                          src={image.url}
                          alt={tutorial.title}
                          width={1024}
                          height={638}
                        />
                      </div>
                    )}
                  </div>
                ))}

              {images.blobs
                .filter((image) => image.pathname.startsWith(`${tslug}`))
                .map((image, index) => (
                  <div key={image.pathname}>
                    {index < 1 && (
                      <div>
                        <Image
                          className="rounded-lg w-3/5 h-3/5 bg-gray-100 p-6 rounded-lg shadow-md"
                          priority
                          // src={tutorial.image_url}
                          src={image.url}
                          alt={tutorial.title}
                          width={1064}
                          height={1064}
                        />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-4">
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

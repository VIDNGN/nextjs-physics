import { fetchTutorialBySlug, fetchAllImages } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Breadcrumbs from "@/app/ui/tutorials/breadcrumbs";
import { lusitana } from "@/app/ui/fonts";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/ui/button";

export const metadata: Metadata = {
  title: "Tutorials",
};

export default async function Page({ params }: { params: { slug: string } }) {
  const tslug = params.slug;
  console.log(tslug);

  const tutorial = await fetchTutorialBySlug(tslug);
  //const title = tutorial.title;
  const images = await fetchAllImages();

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
                {index === 3 && (
                  <div className="section1 flex flex-row">
                    <Image
                      className="rounded-lg w-1/4 h-1/4"
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

          <div className="py-8">
            <h1 className="text-4xl"> {tutorial.title}</h1>{" "}
          </div>
          <div className="text-justify leading-9 whitespace-pre-wrap">
            <p>{tutorial.description}</p>
          </div>

          {images.blobs
            .filter((image) => image.pathname.startsWith(`${tslug}`))
            .map((image, index) => (
              <div key={image.pathname}>
                {/* next 3 images */}
                {index < 5 && (
                  <div className="section2 flex flex-row">
                    <Image
                      className="rounded-lg w-96 h-96"
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

        {/* <div className="flex justify-center">
          <Image
            className="rounded-lg w-96 h-96"
            src={`${tutorial.image_url_2}`}
            alt={tutorial.title}
            width={1024}
            height={1024}
          />
        </div> */}
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href={`${tutorial.slug}/${tutorial.qslug}/`}
            className="flex h-10 items-center rounded-lg bg-sky-600 px-4 text-sm font-medium text-white transition-colors hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-sky-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
          >
            Continue
          </Link>
        </div>
      </div>
    </main>
  );
}

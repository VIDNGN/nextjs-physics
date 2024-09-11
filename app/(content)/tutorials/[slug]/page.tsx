import { fetchTutorialBySlug } from "@/app/lib/data";
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

  const tutorial = await fetchTutorialBySlug(tslug);
  //const title = tutorial.title;

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
      <div className="flex flex-col space-y-4 justify-left">
        <div>
          <Image
            className="rounded-lg w-96 h-96"
            src={`${tutorial.image_url}`}
            alt={tutorial.title}
            width={1024}
            height={1024}
          />
        </div>
        <div>
          <h1 className={`${lusitana.className} text-2xl`}>
            {" "}
            {tutorial.title}
          </h1>{" "}
        </div>
        <div className="text-justify leading-9 whitespace-pre-wrap">
          <p>{tutorial.description}</p>
        </div>
        <div className="flex justify-center">
          <Image
            className="rounded-lg w-96 h-96"
            src={`${tutorial.image_url_2}`}
            alt={tutorial.title}
            width={1024}
            height={1024}
          />
        </div>
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

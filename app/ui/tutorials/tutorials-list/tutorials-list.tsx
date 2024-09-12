import { fetchTutorials, fetchAllImages } from "@/app/lib/data";
import Link from "next/link";
import Image from "next/image";

export default async function TutorialsList() {
  const tutorials = await fetchTutorials();
  const images = await fetchAllImages();

  if (!tutorials) {
    return null;
  }

  return (
    <div>
      <ul className="grid gap-28 grid-cols-3">
        {tutorials.map((tutorial) => (
          <li key={tutorial.id}>
            <Link href={`/tutorials/${tutorial.slug}`}>
              <div className="flex flex-col space-y-8 items-center text-[#131309] rounded-md text-lg">
                <div>
                  {images.blobs
                    .filter((image) =>
                      image.pathname.startsWith(`homepage_${tutorial.slug}`)
                    )
                    .map((image) => (
                      <Image
                        className="rounded-lg w-96 h-96"
                        priority
                        key={image.pathname}
                        // src={tutorial.image_url}
                        src={image.url}
                        alt={tutorial.title}
                        width={1064}
                        height={1064}
                      />
                    ))}
                </div>
                <div>{tutorial.title}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

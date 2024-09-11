import { fetchTutorials } from "@/app/lib/data";
import Link from "next/link";
import Image from "next/image";

export default async function TutorialsList() {
  const tutorials = await fetchTutorials();

  if (!tutorials) {
    return null;
  }

  return (
    <ul className="grid gap-28 grid-cols-3">
      {tutorials.map((tutorial) => (
        <li key={tutorial.id}>
          <Link href={`/tutorials/${tutorial.slug}`}>
            <div className="flex flex-col space-y-8 items-center text-[#131309] rounded-md text-lg">
              <div>
                <Image
                  className="rounded-lg w-96 h-96"
                  src={tutorial.image_url}
                  alt={tutorial.title}
                  width={1064}
                  height={1064}
                />
              </div>
              <div>{tutorial.title}</div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

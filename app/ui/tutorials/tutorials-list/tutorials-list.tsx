import { fetchLessons, fetchHomePageImages} from "@/app/lib/data";
import Link from "next/link";
import Image from "next/image";

//TypeScript JSX expects functions to return a valid JSX element (i.e., ReactElement). TutorialsList component is returning a Promise because it is a async function. It is returning Type 'Promise<Element | null>' 
//(which is not a valid JSX element). 
export default async function TutorialsList(): Promise<JSX.Element | null> {
  const lessons = await fetchLessons();
  //const images = await fetchAllImagesFromBlob();
  const homepage_images = await fetchHomePageImages();

  //console.log('tutorials: ', tutorials);
  //console.log('images: ', images);
  
  if (!lessons || !homepage_images ) {
    return null;
  }

  return (
    <div>
      <ul className="grid lg:gap-28 lg:grid-cols-3 gap-3 grid-cols-2">
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link href={`/tutorials/${lesson.slug}`}>
              <div className="flex flex-col space-y-8 items-center text-[#131309] rounded-md text-lg">
                <div>
                  {homepage_images
                    .filter((image) =>
                      image.image_name.startsWith(`homepage_${lesson.slug}`)
                    )
                    .map((image) => (
                      <Image
                        className="rounded-lg w-96 h-auto"
                        priority
                        key={image.image_name}
                        // src={tutorial.image_url}
                        src={image.image_url}
                        alt={lesson.title}
                        width={1064}
                        height={1064}
                      />
                    ))}
                </div>
                <div>{lesson.title}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

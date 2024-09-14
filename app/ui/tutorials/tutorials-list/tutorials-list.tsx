import { fetchTutorials, fetchHomePageImages} from "@/app/lib/data";
import Link from "next/link";
import Image from "next/image";

//TypeScript JSX expects functions to return a valid JSX element (i.e., ReactElement). TutorialsList component is returning a Promise because it is a async function. It is returning Type 'Promise<Element | null>' 
//(which is not a valid JSX element). 
export default async function TutorialsList(): Promise<JSX.Element | null> {
  const tutorials = await fetchTutorials();
  //const images = await fetchAllImagesFromBlob();
  const homepage_images = await fetchHomePageImages();

  //console.log('tutorials: ', tutorials);
  //console.log('images: ', images);
  
  if (!tutorials || !homepage_images ) {
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
                  {homepage_images
                    .filter((image) =>
                      image.image_name.startsWith(`homepage_${tutorial.slug}`)
                    )
                    .map((image) => (
                      <Image
                        className="rounded-lg w-96 h-96"
                        priority
                        key={image.image_name}
                        // src={tutorial.image_url}
                        src={image.image_url}
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

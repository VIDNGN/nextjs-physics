import { fetchTutorials, fetchAllImages } from "@/app/lib/data";
import Link from "next/link";
import Image from "next/image";

export default function TutorialsList() {
  //const tutorials = await fetchTutorials();
  //const images = await fetchAllImages();

  //console.log('tutorials: ', tutorials);
  //console.log('images: ', images);
  
  // if (!tutorials || !images ) {
  //   return null;
  // }

  return (
    <div>
      <h1>Tutorials List</h1>
    </div>
  );
}

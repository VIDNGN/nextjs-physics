import Image from "next/image";
import logo from '@/app/ui/logo.png';
import Link from "next/link";
import { lusitana } from "../ui/fonts";
//import styles from '@/app/ui/home.module.css';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     
     {/* <div className={styles.home}> */}
     <div className="flex flex-col items-center space-y-8">
      <Image  className="flex rounded-full w-80 h-80 relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
  src={logo} alt="A great blue heron" width={400} height={400} priority/>

      <h1 className={`${lusitana.className} text-2xl`}>Tutorials in Introductory Physics</h1>
      <p>
        Tutorials in Introductory Physics is an sequence of questions and answers which are indended to supplement the classroom and textbook of Introductory Physics in Mechanics, ELectromagnetism, Heat, and Wave. 
      </p>

      <p>
        The tutorials aim to guide you through important physical concepts and scientific reasoning skills. We strive to deliver the tutorial materials in a way that promotes active mental engagement 
        while applying the physics concepts that the students learned in textbook or class. 
      </p>

      <p>
        The tutorials comprise of basic demonstrations of physics concepts, worksheets, assignments that the students can work through on their own with hints. The worksheets, which consists of sequenced tasks and questions and answers. 
      </p>

      <div className="self-strech">
        <Link href="/tutorials"><span>Enter<ArrowRightIcon className="w-5 md:w-6" /></span></Link>
      </div>
    </div>
      

      
    </main>
  );
}



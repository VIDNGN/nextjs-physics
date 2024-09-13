import Image from "next/image";
import logo from "@/app/ui/logo.png";
import Link from "next/link";
import { lusitana, montserrat } from "../ui/fonts";
//import styles from '@/app/ui/home.module.css';
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-36 mx-28">
      {/* <div className={styles.home}> */}
      <div className="flex flex-col items-center space-y-16">
        <Image
          className="flex rounded-full w-80 h-80 relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src={logo}
          alt="A great blue heron"
          width={400}
          height={400}
          priority
        />

        <h1 className={`${montserrat.className} text-4xl`}>
          Tutorials in Introductory Physics
        </h1>
        <div className="text-xl space-y-16 text-center">
          <p>
            Tutorials in Introductory Physics is an sequence of questions and
            answers which are indended to supplement the classroom and textbook
            of Introductory Physics in Mechanics, ELectromagnetism, Heat, and
            Wave.
          </p>

          <p>
            The tutorials aim to guide you through important physical concepts
            and scientific reasoning skills. We strive to deliver the tutorial
            materials in a way that promotes active mental engagement while
            applying the physics concepts that the students learned in textbook
            or class.
          </p>

          <p>
            The tutorials comprise of basic demonstrations of physics concepts,
            worksheets, assignments that the students can work through on their
            own with hints. The worksheets, which consists of sequenced tasks
            and questions and answers.
          </p>
        </div>
      </div>
      <div className="pb-48 pt-24">
        <Link
          href="/tutorials"
          className="flex h-20 items-center rounded-lg bg-[#27374D] px-4 text-med font-medium text-white transition-colors hover:bg-[#526D82] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-[#27374D] active:bg-[#526D82]aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        >
          <span>Enter</span>
          <span>
            <ArrowRightIcon className="w-5 md:w-6" />
          </span>
        </Link>
      </div>
    </main>
  );
}

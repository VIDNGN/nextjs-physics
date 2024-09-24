import Breadcrumbs from "@/app/ui/tutorials/breadcrumbs";
import {
  fetchQuestionsBySlug,
  fetchEquipmentBySlug,
  fetchOptionsAnswersBySlug,
} from "@/app/lib/data";
import Form from "@/app/ui/tutorials/create-form";
import { unstable_noStore as noStore } from "next/cache";
import { verifyAuth } from "@/app/lib/session";
import Link from "next/link";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { Button } from "@/app/ui/button";
import AskQuestionsForm from "@/app/ui/chat/ask-question-form";
import styles from "@/app/ui/home.module.css";
import AskQuestionClient from "@/app/ui/chat/ask-question-client";
//import { lusitana } from "@/app/ui/fonts";
//import { ChatBubbleOvalLeftIcon } from "@heroicons/react/20/solid";
export default async function Page({ params }: { params: { qslug: string } }) {
  noStore();

  const slug = params.qslug;
  //console.log(slug);

  const [questions, demo_equipment, optionsAnswers] = await Promise.all([
    fetchQuestionsBySlug(slug),
    fetchEquipmentBySlug(slug),
    fetchOptionsAnswersBySlug(slug),
  ]);

  if (!questions) {
    notFound();
  }

  return (
    <main className="w-full max-w-7xl">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tutorials", href: "/tutorials" },
          { label: `${slug}`, href: `/tutorials/${slug}`, active: true },
        ]}
      />
      {/* <div className="mt-6 flex justify-end">
        <Link
          href="/chat"
          className="flex h-10 items-center rounded-lg bg-[#27374D] px-4 text-sm font-medium text-white transition-colors hover:bg-[#526D82] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-[#526D82] active:bg-[#27374D] aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        >
          Ask A question <ChatBubbleOvalLeftIcon />

        </Link>
      </div> */}

      <div className="mt-6 flex justify-end">
        <AskQuestionClient />
      </div>

      <div className="flex flex-col py-4 space-y-4 px-4">
        <h1 className="font-fold text-4xl">Experiment</h1>

        <h2 className="text-2xl">List of Equipment for Experiment</h2>

        {demo_equipment && demo_equipment.length > 0 ? (
          <ul className="list-inside list-disc leading-7">
            {" "}
            {demo_equipment.map((demoEquip) => (
              <li key={demoEquip.id}>{demoEquip.equipment}</li>
            ))}
          </ul>
        ) : (
          <p>Nothing is needed for this tutorial</p>
        )}
      </div>
      <Form questions={questions} options={optionsAnswers} />
    </main>
  );
}

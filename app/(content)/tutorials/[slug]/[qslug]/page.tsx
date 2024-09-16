import Breadcrumbs from "@/app/ui/tutorials/breadcrumbs";
import {
  fetchQuestionsBySlug,
  fetchEquipmentBySlug,
  fetchOptionsAnswersBySlug,
} from "@/app/lib/data";
import Form from "@/app/ui/tutorials/create-form";
import { unstable_noStore as noStore } from "next/cache";

//import { lusitana } from "@/app/ui/fonts";

import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { qslug: string } }) {
  //noStore();

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
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tutorials", href: "/tutorials" },
          { label: `${slug}`, href: `/tutorials/${slug}`, active: true },
        ]}
      />

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

import { lusitana } from "@/app/ui/fonts";
import Breadcrumbs from "@/app/ui/tutorials/breadcrumbs";
import TutorialsList from "@/app/ui/tutorials/tutorials-list/tutorials-list";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutorials",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tutorials", href: "/tutorials", active: true },
        ]}
      />

      <h1 className={`${lusitana.className} mb-4 text-2xl md:text 2xl`}>
        {" "}
        Tutorials{" "}
      </h1>

      <div>
        <Suspense fallback={null}>
          {" "}
          <TutorialsList />
        </Suspense>
      </div>
    </main>
  );
}

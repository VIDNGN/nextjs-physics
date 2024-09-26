import { verifyAuth, getSessionData } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { Button } from "@/app/ui/button";
import Breadcrumbs from "@/app/ui/tutorials/breadcrumbs";
import React, { useState } from "react";
import { fetchAskedQuestions } from "@/app/lib/data";
import { unstable_noStore as noStore } from "next/cache";
import AskQuestionClient from "@/app/ui/chat/ask-question-client";

export default async function Page() {
  noStore();
  //verify if user is logged in
  const result = await verifyAuth();
  const userId = result.user;
  // if (!result.user) {
  //   return redirect("/login");
  // }

  // const sessionData = result.session;
  // console.log(sessionData);
  // console.log(sessionData.email);
  // const username = sessionData?.email?.split("@")[0];

  const askedQuestions = await fetchAskedQuestions();

  const date = new Date().toISOString().split("T")[0];

  // const [isModalOpen, setModalOpen] = useState(false);

  // const openModal = () => setModalOpen(true);
  // const closeModal = () => setModalOpen(false);

  return (
    

    <main className="flex w-max-7xl">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Discussion", href: "/chat", active: true },
        ]}
      />

      <div className="p-6">
        <h2 className="text-lg font-bold mb-4">Comments</h2>
        <div className="flex flex-col space-y-4">
          <div className="bg-gray-200 p-4 rounded-lg shadow-md">
            {askedQuestions.map((question) => (
              <div key={question.id}>
                {" "}
                <h3 className="text-lg font-bold">{question.username}</h3>
                <p className="text-gray-700 text-sm mb-2">
                  {new Date(question.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700">{question.subject}</p>
                <p className="text-gray-700">{question.content} </p>
              </div>
              
            ))}
          </div>
          <AskQuestionClient isAuthenticated={!!userId} buttonName="Reply"/>
        </div>
      </div>
    </main>
  );
}

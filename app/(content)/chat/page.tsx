
import { verifyAuth, getSessionData } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { Button } from "@/app/ui/button";
import Breadcrumbs from "@/app/ui/tutorials/breadcrumbs";
import AskQuestionsForm from "@/app/ui/chat/ask-question-form";
import Modal from "@/app/ui/modal/modal";
import styles from "@/app/ui/home.module.css";
import React, { useState } from "react";
export default async function Page() {
  //verify if user is logged in
  const result = await verifyAuth();
  if (!result.user) {
    return redirect("/login");
  }

  const sessionData = result.session;
  console.log(sessionData);
  console.log(sessionData.email);
  const username = sessionData?.email?.split("@")[0];

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

      <div className={styles.modal}>
       

          <AskQuestionsForm />
 
      </div>
      <div className="p-6">
        <h2 className="text-lg font-bold mb-4">Comments</h2>
        <div className="flex flex-col space-y-4">
          <div className="bg-gray-200 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">{username}</h3>
            <p className="text-gray-700 text-sm mb-2">Posted on {date}</p>
            <p className="text-gray-700">
              Can you tell me more about the nuclear force that holds the
              nucleus together?
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

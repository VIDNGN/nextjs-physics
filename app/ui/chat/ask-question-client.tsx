"use client";

import React, { useState } from "react";
import Modal from "@/app/ui/modal/modal";
import AskQuestionsForm from "./ask-question-form";
import { Button } from "@/app/ui/button";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/20/solid";
import styles from "@/app/ui/home.module.css";
import { useRouter } from "next/navigation";

const AskQuestionClient = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const router = useRouter();
  return (
    <div>
      <div className="mt-6 flex justify-end">
        <Button onClick={openModal}>
          {" "}
          Ask Questions <ChatBubbleOvalLeftIcon />{" "}
        </Button>
      </div>
      <div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>  
          {" "}
          <AskQuestionsForm />
        </Modal>
      </div>
    </div>
  );
};

export default AskQuestionClient;

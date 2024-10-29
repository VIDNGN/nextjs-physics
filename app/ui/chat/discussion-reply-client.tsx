"use client";

import React, { useState } from "react";
import Modal from "@/app/ui/modal/modal";
import DiscussionReplyForm from "./discussion-reply-form";
import Button  from "@/app/ui/button";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/20/solid";
import styles from "@/app/ui/home.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

type DiscussionReplyClientProps = {
    isAuthenticated: boolean;
    buttonName: string;
    discussionId: string;
    subject: string;
};

const DiscussionReplyClient: React.FC<DiscussionReplyClientProps> = ({ isAuthenticated, buttonName, discussionId, subject }) => {
  const pathname = usePathname();
  
 // console.log("pathname from ask question cliennt", pathname);

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
   
  if (!isAuthenticated) {
    return (
        // If not authenticated, show a sign-in message
        <div className="mt-6 flex justify-end">
          <Link
            className="flex h-10 items-center rounded-lg bg-[#FADFA1] px-4 text-sm font-medium text-black transition-colors hover:bg-[#FFDC7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-[#FADFA] active:bg-[#FFDC7F] aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}
          >
            Please sign in to ask questions or participate in discussions
          </Link>{" "}
        </div>
    )
  }

  return (
    <div>
      <div className="lg:mt-6 p-2 flex justify-end">
        <Button onClick={openModal}>
         {buttonName}  
        <ChatBubbleOvalLeftIcon />
        </Button>
      </div>
      <div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {" "}
          <DiscussionReplyForm discussionId={discussionId} subject={subject} />
        </Modal>
      </div>
    </div>
  );
};

export default DiscussionReplyClient;

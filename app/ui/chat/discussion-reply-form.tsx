"use client";
import React, { useState } from "react";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { answerQuestions, replyDiscussion } from "@/app/lib/actions";
import styles from "@/app/ui/home.module.css";
//import { verifyAuth, getSessionData } from "@/app/lib/session";
import { redirect } from "next/navigation";

export default function DiscussionReplyForm({
  discussionId,
  subject,
}: {
  discussionId: string;
  subject: string;
}) {
  //const [formState, setFormState] = useState({ content: "" });
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [submissionFeedback, setSubmissionFeedback] = useState<String | null>(
    null
  );

//   const replyDiscussionWithId = replyDiscussion.bind(
//     null,
//     discussionId,
//     subject
//   );

const [ formState, formAction ] = useFormState(replyDiscussion, undefined);

  return (
    <div>
      {isFormOpen ? (
        <form
          action={formAction}
          className="bg-white p-4 rounded-lg shadow-md"
        >
          <input type="hidden" name="discussionId" value={discussionId} />
          <div className="max-w-7xl">
            <div className="">
              <label
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 whitespace-pre-wrap text-justify leading-9"
                id="subject"
                htmlFor="subject"
              >
                <input type="hidden" name="subject" value={subject} />
                {subject}

              </label>
            </div>
            <div className="">
              <textarea
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 whitespace-pre-wrap text-justify leading-9 "
                name="content"
                id="content"
                rows={5}
                //value={formState.content}
                // onChange={(e) =>
                //   setFormState({ ...formState, content: e.target.value })
                // }
                placeholder="Write your reply here..."
                required
                autoFocus={true}
              />
            </div>
          </div>

          <div className="">
            <div className="flex justify-end py-2">
              <Button type="submit">Submit</Button>
            </div>
            {formState?.message && formState.message.length > 0 && (
           <div className="flex justify-end py-2">{formState.message} </div>
         )}
          </div>
        </form>
      ) : (
        <div className="p-2 bg-green-200 rounded">
          {/* {submissionFeedback && <p>{submissionFeedback}</p>} */}
        </div>
      )}
    </div>
  );
}

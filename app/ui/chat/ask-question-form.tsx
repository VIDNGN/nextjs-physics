"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import Button from "@/app/ui/button";
import Link from "next/link";
import { useFormState } from "react-dom";
import { answerQuestions } from "@/app/lib/actions";
import styles from "@/app/ui/home.module.css";
//import { verifyAuth, getSessionData } from "@/app/lib/session";
import { redirect } from "next/navigation";

export default function AskQuestionsForm({}: //username,
//date,
//picture,
{
  // username: string;
  //date: Date;
  // picture?: string;
}) {
  const [formState, formAction, isPending] = useFormState(
    answerQuestions,
    undefined
  );


  return (
    <div>
      <form action={formAction} className="bg-white p-4 rounded-lg shadow-md z-40">
        <div className="max-w-7xl">
          <div className="">
            <textarea
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 whitespace-pre-wrap text-justify leading-9 "
              name="subject"
              id="subject"
              rows={1}
              placeholder="in a brief sentence what is this discussion"
              required
              autoFocus={true}
            />
          </div>
          <div className="">
            <textarea
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 whitespace-pre-wrap text-justify leading-9 "
              name="content"
              id="content"
              rows={5}
              placeholder="Write your questions or thoughts here..."
              required
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
    </div>
  );
}

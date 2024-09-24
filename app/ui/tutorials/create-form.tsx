"use client";

import { useActionState } from "react";
import { useFormState, useFormStatus} from "react-dom";
import { createTutorial} from "@/app/lib/actions";
import { State } from '@/app/lib/definitions';
import {
  QuestionField,
  OptionField,
  CorrectAnswer,
} from "@/app/lib/definitions";
import { Button } from "@/app/ui/button";
import { fetchCorrectAnswerbyQuestionId } from "@/app/lib/data";

export default function Form({
  questions,
  options,
}: {
  questions: QuestionField[];
  options: OptionField[];
}) {
 
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === "Enter" || e.key === "NumpadEnter")
    ) {
      e.preventDefault();

      // Add an explicit check for e.currentTarget. e.currentTarget can be null under certain conditions, especially when the event is fired from something that doesn't have a form element as its target.
      const target = e.currentTarget as
        | HTMLInputElement
        | HTMLTextAreaElement
        | null; // This ensures that target is correctly typed as HTMLElement | null, and we can then safely check if target?.form exists.
      if (target?.form) {
        target.form.requestSubmit();
      }
    }
  };

  //useActionState takes two argument, action and initialState, and return values: formState and formAction, which is a function to be called when the form is submitted.
  //initialState can be anything. In this case, it is an object with two empty keys: message and errors. Import from actions.ts.
  const initialState: State = {
    errors: "",
    message: "Let's give it a shot!",
    correctAnswers: [],
  };

  const [formState, formAction] = useFormState(createTutorial, initialState);
  
  // const handleSubmit = async (formAction) => {
  //   event.preventDefault();

  //   if (formState.message === "Form submitted successfully!") {
  //     const questionIds = questions.map((q) => q.question_id);
  //     const correctAnswers = await fetchCorrectAnswerbyQuestionId(question_ids);

  //     formState.correctAnswers.push(correctAnswers);
  //   } else {
  //     formState.message = "there's no answers for these questions!";
  //   }
  // };

  return (
    // <form onSubmit={handleSubmit}>
    <form action={formAction}>
      <div className="text-justify leading-7 whitespace-pre-wrap text-wrap py-3 px-4">
        {questions.map((question) =>
          question.type === "short_answer" ? (
            <ul key={question.question_id}>
              <div className="px-2 py-12">
                <div>
                  <input
                    type="hidden"
                    name={`questionId_${question.question_id}`}
                    // value={question.question}
                  />
                </div>
                <div className="w-2/3">
                  <p>{question.question}</p>{" "}
                </div>
                <div className="w-2/3">
                  <textarea
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 whitespace-pre-wrap text-justify leading-9 "
                    name={`answer_${question.question_id}`}
                    id={`answer_${question.question_id}`}
                    rows={3}
                    onKeyDown={handleKeyDown}
                    placeholder="Write your thoughts here..."
                    required
                  />

                  {/* Display correct answer after submission */}
                  <div className="py-3">
                    {/* {console.log(formState.correctAnswers)} */}

                    {formState.correctAnswers.length > 0 && (
                      <p className="correct-answer text-lg text-[#0F4C75]">
                        Correct Answer:{" "}
                        {
                          formState.correctAnswers.find(
                            (ca) => ca.question_id === question.question_id
                          )?.correct_answer
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </ul>
          ) : (
            <ul key={question.question_id}>
              <div className="px-2 py-8">
                <div>
                  <input
                    type="hidden"
                    name={`questionId_${question.question_id}`}
                    // value={question.question}
                  />
                </div>
                <div>
                  <p>{question.question}</p>{" "}
                </div>
                <div className="w-2/5">
                  <select
                    id={`answerOptions_${question.question_id}`}
                    name={`answer_${question.question_id}`}
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                    defaultValue=""
                    aria-describedby={`answer-error_${question.question_id}`}
                  >
                    <option value="" disabled>
                      Select an answer
                    </option>
                    {options.map((option) => (
                      <option key={option.id} value={option.option_text}>
                        {option.option_text}
                      </option>
                    ))}
                  </select>
                  <div className="py-3">
                    {formState.correctAnswers.length > 0 && (
                      <p className="correct-answer text-md text-[#0F4C75]">
                        Correct Answer:{" "}
                        {
                          formState.correctAnswers.find(
                            (ca) => ca.question_id === question.question_id
                          )?.correct_answer
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </ul>
          )
        )}
        <div id="answer-success" aria-live="polite" aria-atomic="true"></div>
        <div className="flex justify-left space-x-4">
          <span>
            <Button type="submit">Submit</Button>
          </span>
          {/* Displaying success message */}
          {formState.message && (
            <span>
              <div id="answer-success" aria-live="polite" aria-atomic="true">
                <p className="mt-2 text-md text-blue-500">
                  {formState.message}
                </p>
              </div>
            </span>
          )}
        </div>
      </div>
    </form>
  );
}

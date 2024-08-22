'use client';

import { useActionState } from "react";
import { createTutorial } from "@/app/lib/actions";
import { QuestionField, OptionField } from "@/app/lib/definitions";

export default function Form({ questions, options }: { questions: QuestionField[], options: OptionField[] }) {

    const handleKeyDown = (e) => {
    if (
      (e.ctrlKey || e.metaKey) && 
      (e.key === "Enter" || e.key === 'NumpadEnter')
    ) {
      e.preventDefault()
      e.currentTarget.form?.requestSubmit()
    }
  }


    return (
        <form id="tutorial-form" action={createTutorial}>
        
            <div>
          
                {questions.map((question) =>   (question.type === "short_answer") ? <ul key={question.question_id}> 
                    
                    
                    <div>
                   
                        <div><input type='hidden' name={`questionId_${question.question_id}`} value={question.question} /></div>
                        <div><p>{question.question}</p> </div>
                        <div><textarea 
                              name={`answer_${question.question_id}`} 
                              id={`answer_${question.question_id}`}
                              rows={3} 
                              onKeyDown={handleKeyDown}
                              required />
                            
                        </div>

                   
                  </div>
                  </ul> 
                    :
                    <ul key={question.question_id}>
                    <div>
                        <div><p>{question.question}</p> </div>
                        <div> 
                        
                        <select   id={`answerOptions_${question.question_id}`} 
                                  name={`options_${question.question_id}`} 
                                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" 
                                  defaultValue="" 
                                  aria-describedby="answer-error"> 
                        
                        
                        {options.map((option) => (<option key={option.id} value={option.option_text}>{option.option_text}</option>
                                ))}  
                            </select>
                        </div>

                    </div>
                      </ul> )
                 
                }
               
            </div>

            {/* <div id="answer-error" aria-live="polite" aria-atomic="true">
                {formState.errors?.short_answer &&
                    formState.errors.amount.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div> */}
            <p>
                <button type="submit">
                    Submit
                </button>
            </p>
            <p>

            </p>
        </form>
    )
}
"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { fetchSurveyAnswersBySurveyId } from "@/app/lib/data";
import React, { useState, useEffect } from "react";
import claraImage from "@/app/assets/clara_agent.png";
import TimelineSVG from "@/app/ui/timeline-svg";

export default function Lessons() {
  const searchParams = useSearchParams();
  const survey_id = searchParams.get("survey_id");
  const [surveyAnswers, setSurveyAnswers] = useState([]);

  useEffect(() => {
    const fetchSurveyAnswers = async () => {
      try {
        const survey_answers = await fetchSurveyAnswersBySurveyId(survey_id);
        setSurveyAnswers(survey_answers);
      } catch (error) {
        console.error("Error fetching survey answers:", error);
      }
    };
    fetchSurveyAnswers();
  }, []);

  console.log("survey_answers in lessons:", surveyAnswers);

  return (
    <main className="flex min-h-screen flex-col items-center mt-8 lg:pt-38 lg:pt-24 pt-8 max-w-8xl">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:mx-20 mx-5 lg:gap-4 mt-12 bg-[#DBE2EF]"> */}
        <div className="lg:py-8 flex flex-col">
          <h1 className="lg:text-4xl text-3xl font-bold text-pretty">
            Based on what you shared with us
          </h1>
          <h2 className="lg:text-3xl text-2xl italic py-8 text-pretty">
            We created a tailored learning path for you!
          </h2>
{/* 
          <div className="text-lg items-center">
            {surveyAnswers
              .filter((answer) => answer.question_text.includes("studying"))
              .map((answer, indx) => (
                <div
                  key={answer.id}
                  className="grid grid-cols-1 md:grid-cols-2 lg:mx-10 mx-5 lg:gap-2 mt-2 bg-[#DBE2E}"
                >
                  <div>{answer.question_text}</div>
                  <div>{answer.answer}</div>
                </div>
              ))}
          </div> */}
        </div>
        {/* <div className="flex lg:mt-8 lg:pt-2 lg:pb-4 justify-center lg:mx-4 lg:px-4 lg:mx-20 lg:px-20 text-wrap text-pretty space-y-8">
          <Image
            className="rounded-md hidden md:block dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src={claraImage}
            alt="road map image"
            width={962}
            height={850}
            priority
          />

        </div> */}
      {/* </div> */}
      <div className="w-2/3">
      <TimelineSVG />
      </div>
    </main>
  );
}

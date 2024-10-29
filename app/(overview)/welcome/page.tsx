import React, { useState, useEffect, Suspense } from "react";
// import ProgressBar from "@/app/ui/ProgressBar";
// import Button from "@/app/ui/button";
import SurveyForm from "@/app/ui/survey/survey-form";

import { fetchSurveyQuestions } from "@/app/lib/data";

export default function Page() {
  //const data = fetchSurveyQuestions();
  //const data = await fetch(`https://nextjs-physics-survey-service-ed3eab6bd412.herokuapp.com/survey_questions`)
  //let questions = await data.json();

  //   const [currentQuestion, setCurrentQuestion] = useState(0);
  //   const [loading, setLoading] = useState(true); // State to manage loading status
  //   const [questions, setQuestions] = useState([]); //state to hold the survey questions

  //   const handleNext = () => {
  //     if (currentQuestion < questions.length - 1) {
  //       setCurrentQuestion(currentQuestion + 1);
  //     }
  //   };

  //   useEffect(() => {
  //     console.log('useEffect running');
  //     const fetchQuestions = async () => {
  //       try {
  //         const data = await fetchSurveyQuestions();
  //         console.log('Fetched questions:', data);
  //         setQuestions(data);
  //       } catch (error) {
  //         console.error('Error fetching survey questions:', error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchQuestions();
  //   }, []);

  //   const progress = (currentQuestion / (questions.length - 1)) % 100;

  //   if (loading) {
  //     return <div>Loading survey questions</div>;
  //   }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-8 lg:pt-38 pb-24 max-w-8xl">
      <div className="p-8 mt-24 flex-col bg-[#DBE2EF] flex items-center max-w-5xl">
        <h1 className="text-3xl font-bold pb-8"> Welcome!</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <SurveyForm />
        </Suspense>
      </div>
    </main>
  );
}

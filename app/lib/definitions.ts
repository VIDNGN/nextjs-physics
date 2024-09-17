// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };


  export type TutorialsTable = {
    tutorial_id: string;
    slug: string;
    title: string;
    image_url: string;
    image_url_2: string;
    date: string;
    description: string;
    qslug: string;
  };

  export type Tutorial ={
    tutorial_id: string;
    slug: string;
    title: string;
    image_url: string;
    date: string;
    description: string;

  }
  
  export type Customer = {
    id: string;
    name: string;
    email: string;
  }

export type Question = {
  question_id: string;
  tutorial_id: string;
  type: string;
  question: string;
}

export type QuestionField = {
  question_id: string;
  question: string;
  type: string;
}

export type shortAnswer = {
  id: string;
  tutorial_id: string;
  question_id: string;
  question_slug: string;
  question: string;
  correct_answer: string;
}

export type optionAnswer = {
  id: string;
  tutorial_id: string;
  question_id: string;
  question_slug: string;
  question: string;
  option_text: string;
  is_correct: boolean;
}


export type Equipment = {
  id: string;
  tutorial_id: string;
  tutorial_slug: string;
  question_slug: string;
  equipment: string;
}

export type studentAnswer = {
  id: string;
  tutorial_id: string;
  question_id: string;
  tutorial_slug: string;
  question_slug: string;
  question: string;
  answer: string;

}

export type Option ={
  id: string;
  tutorial_id: string;
  option_text: string;
}

export type OptionField = {
  id: string;
  tutorial_id: string;
  option_text: string;
}

export type TutorialForm = {
  question: string;
  short_answer: string;
  multiple_choice_answer: string;
}

export type CorrectAnswer = {
  question_id: string;
  correct_answer: string; 
};

export type TutorialImage = {
  image_name: string;
  image_url: string;
}
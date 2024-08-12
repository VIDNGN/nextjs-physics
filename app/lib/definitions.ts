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
    id: string;
    slug: string;
    title: string;
    image_url: string;
    date: string;
    description: string;
    formSlug: string;
  };

  export type Tutorial ={
    id: string;
    slug: string;
    title: string;
    image_url: string;
    date: string;
    description: string;
    formSlug: string;
  }
  
  export type Customer = {
    id: string;
    name: string;
    email: string;
  }




  

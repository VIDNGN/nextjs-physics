'use server';
import { z } from 'zod';

export async function createTutorial(formData: FormData){

    const rawFormData = Object.fromEntries(formData.entries());

    console.log(rawFormData);

    

}
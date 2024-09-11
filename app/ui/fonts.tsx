import { Inter, Lusitana, Montserrat} from "next/font/google";

//import { Inter } from "next/font/google";
//import {Architects_Daughter} from 'next/font/google';
export const inter = Inter({subsets: ['latin']});

export const lusitana = Lusitana({
    weight:['400', '700'], subsets: ['latin']
});

export const montserrat = Montserrat({ 
    weight:['400', '800'], subsets:['latin']});

// export const architects_daughter = Architects_Daughter({
//     weight: ['400'], subsets: ['latin']
// }) 
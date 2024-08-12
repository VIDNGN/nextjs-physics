import { fetchTutorialBySlug } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Breadcrumbs from "@/app/ui/tutorials/breadcrumbs";
import { lusitana } from "@/app/ui/fonts";
export const metadata: Metadata = {
    title: 'Tutorials'
}

export default async function Page({params}:{params: {slug: string}}){

    const slug = params.slug;

    const tutorial = await fetchTutorialBySlug(slug);
    //const title = tutorial.title; 

    if (!tutorial) {
        notFound();
    }
    return (

        <main>
                 <Breadcrumbs breadcrumbs={[
                { label: 'Home', href: '/' }, { label: 'Tutorials', href: '/tutorials' }, {label: `${slug}`, href: `/tutorials/${slug}`, active: true, },
            ]}

            />
            
            <h1 className={`${lusitana.className} text-2xl`}> {tutorial.title}</h1>
        </main>
    )
}

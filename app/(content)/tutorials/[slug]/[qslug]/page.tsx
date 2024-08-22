import Breadcrumbs from '@/app/ui/tutorials/breadcrumbs';
import {fetchQuestionsBySlug, fetchEquipmentBySlug, fetchOptionsAnswersBySlug} from '@/app/lib/data';
import Form from '@/app/ui/tutorials/create-form';

export default async function Page({params}: {params: {qslug: string}}) {
    
    const slug = params.qslug;

    console.log(slug);

   
    const [questions, demo_equipment, optionsAnswers] = await Promise.all([
         fetchQuestionsBySlug(slug),
         fetchEquipmentBySlug(slug),
         fetchOptionsAnswersBySlug(slug)
     ]);

    if (!questions) {
        notFound();
    }



    return (
        
        <main>
          <Breadcrumbs breadcrumbs={[
                { label: 'Home', href: '/' }, { label: 'Tutorials', href: '/tutorials' }, { label: `${slug}`, href: `/tutorials/${slug}`, active: true, },
            ]}
            
            />

        <h1>Question Page</h1>

        <div>
             
             <h3>List of Equipment</h3>
             
              {demo_equipment && demo_equipment.length > 0  ? ( <ul> { demo_equipment.map( (demoEquip) => <li key={demoEquip.id}>{demoEquip.equipment}</li>) }</ul> ) : (<p>Nothing is needed for this tutorial</p>)} 
                   
            </div> 

            <Form questions={questions} options={optionsAnswers} />

        </main>

    )
}
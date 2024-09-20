import { verifyAuth } from '@/app/lib/session';
import { redirect } from 'next/navigation';

export default async function Page(){
    
  //verify if user is logged in
  const result = await verifyAuth();
  if (!result.user) {
    return redirect("/login");
  }


    return (
        <h1>Ask A Question</h1>
    )
}
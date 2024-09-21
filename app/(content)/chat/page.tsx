import { verifyAuth, getSessionData } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { Button } from "@/app/ui/button";

export default async function Page() {
  //verify if user is logged in
  const result = await verifyAuth();
  if (!result.user) {
    return redirect("/login");
  }

  const sessionData = result.session;
  console.log(sessionData);
  console.log(sessionData.email)
  const username = sessionData?.email?.split("@")[0];

  const date = new Date().toISOString().split("T")[0];

  return (
    <main className="flex w-max-7xl">
      <div className="p-6">
        <h2 className="text-lg font-bold mb-4">Comments</h2>
        <div className="flex flex-col space-y-4">
          <div className="bg-gray-200 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">{username}</h3>
            <p className="text-gray-700 text-sm mb-2">
              Posted on {date}
            </p>
            <p className="text-gray-700">
              Can you tell me more about the nuclear force that holds the nucleus together? 
            </p>
            <div className="bg-gray-300 py-2">

            
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

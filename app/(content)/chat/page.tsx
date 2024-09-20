import { verifyAuth, getSessionData } from "@/app/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
  //verify if user is logged in
  const result = await verifyAuth();
  console.log(result);
  if (!result.user) {
    return redirect("/login");
  }

  const data = await getSessionData();
  console.log(data);

  const date = new Date().toISOString().split("T")[0];

  return (
    <main className="flex w-max-7xl">
      <div className="p-6">
        <h2 className="text-lg font-bold mb-4">Comments</h2>
        <div className="flex flex-col space-y-4">
          <div className="bg-gray-200 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">email</h3>
            <p className="text-gray-700 text-sm mb-2">
              Posted on {date}
            </p>
            <p className="text-gray-700">
              This is a sample comment. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
            <div className="bg-gray-300 py-2">
              <form className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-2">Add a comment</h3>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Comment
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="comment"
                    rows={3}
                    placeholder="Enter your comment"
                  ></textarea>
                </div>
                <button
                  className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

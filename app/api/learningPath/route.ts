import { NextResponse } from "next/server";
import { open, close, readFile, appendFile, access, writeFile } from "fs";
import { promisify } from "util";
import { constants } from "fs";


export async function fetchLearningPath(survey_id: str) {
  // Promisify fs methods for easier use
  const readFileAsync = promisify(readFile);
  const appendFileAsync = promisify(appendFile);
  const openAsync = promisify(open);
  const closeAsync = promisify(close);
  const writeFileAsync = promisify(writeFile);
  const accessAsync = promisify(access);

  const currDate = new Date()
  const month = currDate.getMonth() + 1
  const day = currDate.getDate()
  const year = currDate.getFullYear()

  const CACHE_FILE = "AI_api_cache.json"; //Cache file to store responses

  try {
    let cache = {};

    // Ensure the cache file exists
    try {
      await accessAsync(CACHE_FILE, constants.F_OK); // Check if the file exists
    } catch {
      console.log("Cache file does not exist. Creating a new one.");
      await writeFileAsync(CACHE_FILE, "{}", "utf8"); // Create an empty JSON file
    }

    try {
      const cacheContent = await readFileAsync(CACHE_FILE, "utf8");
      cache = JSON.parse(cacheContent || {});
      console.log("cache data: ", cache)
    } catch (error) {
      console.log("Cache file not found or empty, initializing a new one.");
    }
    // Return cached data if it exists
    if (cache[survey_id]) {
      console.log(`Cache hit for survey id: ${survey_id}`);
      console.log("cache data for survey_id: ", cache[survey_id])
      console.log("cache generated_learning_path_response: ", cache[survey_id]["generated_learning_path_response"])
      return cache[survey_id]
      //return res.status(200).json(cache[survey_id]);
    }

    // Otherwise, fetch from the AI service
    const fetchUrl =
      process.env.NODE_ENV === "production"
        ? `http://localhost:3003/generate_personalized_learning_path/${survey_id}`
        : `http://localhost:3003/generate_personalized_learning_path/${survey_id}`;

    console.log("fetchUrl: ", fetchUrl);

    const response = await fetch(fetchUrl, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });

    console.log(response.status);

    if (!response.ok) {
      throw new Error("Failed to fetch learning path from AI service");
    }

    const result = await response.json();
    cache[survey_id] = result;

    await appendFileAsync(CACHE_FILE, JSON.stringify(cache, null, 2), "utf8"); //Pretty-print JSON for readability

    console.log(`Cache updated for survey_id ${survey_id}`);
    return result
    //return res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching or caching learing path: ", err);
    //return res.status(500).json({ message: `Internal server error: ${err}` });
  }
}

export async function GET(request: Request) {
  console.log(request);
  const { searchParams } = new URL(request.url);
  console.log("searchparam: ", searchParams);
  const survey_id = searchParams.get("survey_id");
  console.log("survey id: ", survey_id);

  if (!survey_id) {
    return NextResponse.json(
      { message: "survey_id is missing" },
      { status: 400 }
    );
  }

  try {
    const learningPath = await fetchLearningPath(survey_id);
    return NextResponse.json(learningPath, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

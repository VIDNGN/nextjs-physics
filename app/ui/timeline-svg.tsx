import React, { useEffect, useState } from "react";
import { Milestone } from "@/app/lib/definitions";
import Link from "next/link";
//import { fetchLearningPath } from "@/app/lib/data"

function extractMilestones(content: string) {
  const milestones: Milestone[] = [];

  //Split the content into State using "---" separator
  const stages = content.split("---");

  //process each stage to extract title, goals, and topics
  stages.forEach((stage, index) => {
    const tiltleMatch = stage.match(/### (Stage \d+: .+)/);
    const goalsMatch = stage.match(/\*\*Goals\*\*: (.+)/);
    console.log("goalsMatch: ", goalsMatch);
    const topicsMatch = stage.match(/\*\*Topics\*\*:\n((?:- .+\n)+)/);
    console.log("topicsMatch: ", topicsMatch);

    if (tiltleMatch && goalsMatch && topicsMatch) {
      console.log("titleMatch: ", tiltleMatch)
      //Extract topis as an array
      const topics = topicsMatch[1]
        .split("\n") //split by newline
        .filter((line) => line.startsWith("- ")) //keep only lines that start with "- "
        .map((line, idx) => ({
          title: line.replace("- ", "").trim(), //remove '- ' and trim spaces
          status: (idx === 0 && index===1) ? "Ready" : "Locked", // First topic is "Ready", others are "Locked" by default
        }));

      milestones.push({
        title: tiltleMatch[1],
        description: goalsMatch[1],
        topics: topics,
        positionX: 10 + index * 15 - 15, //dynamically calcualte position on the timeline
        positionY: 1,
      });
    }
  });

  console.log("milestones: ", milestones);
  return milestones;
}

const TimelineSVG: React.FC<{ survey_id: string }> = ({
  survey_id,
}: {
  survey_id: string;
}) => {
  console.log("survey in timeline: ", survey_id);
  const [learningPath, setLearningPath] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLearningPath = async () => {
      try {
        const response = await fetch(
          `/api/learningPath?survey_id=${survey_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch learning path in Timeline");
        }
        const data = await response.json();
        setLearningPath(data);
      } catch (err) {
        console.error("Error fetching learning path:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLearningPath();
  }, [survey_id]);

  if (loading) return <p>Loading...</p>;
  if (!learningPath) return <p>No data available</p>;
  //console.log("learningPath returned in timeline: ", learningPath)

  const content = learningPath["generated_learning_path_response"]["content"];
  console.log("Type of cotent: ", typeof content);
  console.log("content returned from cache or API: ", content);

  const milestones = extractMilestones(content);

  // Assume userProgress is fetched from a database or API
  const userProgress = {
    completedTopics: [], //"Nature of electric fields"
  };

  return (
    <div className="flex justify-center items-center lg:p-2">
      <div className="overflow-auto md:h-[90vh] h-[80vh] lg:w-[70%] mx-auto border border-gray-300 rounded p-2 ">
        <svg
          viewBox="0 0 130 130" //define the coordinate system
          className="w-full h-full" // border-dashed border-2 border-indigo-600
          // preserveAspectRatio="xMidYMid meet" // Adjust scaling behavior
          preserveAspectRatio="none" //scale horizontally
        >
          {/* Define SVG markers for milestones*/}
          <defs>
            <marker
              id="circle"
              markerWidth="6"
              markerHeight="6"
              refX="3"
              refY="3"
              //   markerUnits="strokeWidth"
            >
              <circle cx="3" cy="3" r="2" fill="#4A90E2" />
            </marker>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              {/* The <path d="M 0 0 L 10 5 L 0 10 z" /> creates a triangular arrow shape.
    M 0 0 moves to the starting point of the triangle.
    L 10 5 draws a line to the point (10, 5).
    L 0 10 draws another line to (0, 10).
    z closes the shape to form a triangle.
    The fill attribute is set to #4A90E2 to match the color of your other markers. */}

              <path d="M 0 0 L 10 5 L 0 10 z" fill="black" />
            </marker>
          </defs>

          {/* Zigzag path with markers  */}
          {/* <polyline
              points="10,80 30,60 50,68 70,60 90,65"
              fill="none"
              stroke="grey"
              strokeWidth="2"
              markerStart="url(#circle)"
              markerMid="url(#circle)"
              markerEnd="url(#circle)"
            /> */}

          {/* <path
              d="M 10 10 L 90 10" // Draws a straight line from (10,10) to (90,10)
              stroke="grey"
              strokeWidth="2"
              markerStart="url(#circle)"
              markerMid="url(#circle)"
              markerEnd="url(#circle)"
            /> */}

          <polyline
            points="5,5 5,125"
            fill="none"
            stroke="grey"
            strokeWidth="1"
            markerStart="url(#circle)"
            markerMid="url(#circle)"
            markerEnd="url(#arrow)"
          />

          {/* Circles at Milestones */}
          {/* <circle cx="10" cy="10" r="2" fill="#3B82F6" />
        <circle cx="10" cy="25" r="2" fill="#3B82F6" />
        <circle cx="10" cy="40" r="2" fill="#3B82F6" />
        <circle cx="10" cy="55" r="2" fill="#3B82F6" />
        <circle cx="10" cy="70" r="2" fill="#3B82F6" /> */}

          {milestones.map((milestone, idx) => {
            const yOffset = 5 + idx * 30; // Adjust Y spacing between milestones

            return (
              <g key={idx} transform={`translate(5, ${yOffset})`}>
                <circle cx="0" cy="0" r="2" fill="#F28A21" />
                {/* Title */}

                <text
                  x="3"
                  y="1"
                  fill="#2A3663"
                  fontSize="3"
                  fontWeight="bold"
                  textAnchor="start"
                >
                  {milestone.title}
                </text>

                {/* Description */}
                <text x="5" y="5" fill="black" fontSize="2.5">
                  {milestone.description}
                </text>

                {milestone.topics.map((topic, topicIdx) => {
                  {
                    if (userProgress.completedTopics.includes(topic.title)) {
                      topic.status = "Completed";
                    } else if (
                      topic.status !== "Completed" &&
                      topic.status !== "Ready"
                    ) {
                      topic.status = "Locked";
                    }
                  }
                  return (
                    <g
                      key={topicIdx}
                      transform={`translate(0, ${(topicIdx + 0) * 5 + 10})`}
                    >
                      {/* Sub-circle for topics */}
                      <circle
                        cx="0"
                        cy="0"
                        r="1.5"
                        fill={
                          topic.status === "Completed"
                            ? "green"
                            : topic.status === "Ready"
                            ? "blue"
                            : "gray"
                        }
                      />

                      {topic.status === "Ready" ? (
                        <Link
                          href="/tutorials"
                          className=""
                        >
                          <text x="5" y="1" fill="#555" fontSize="2">
                            <tspan>{topic.title}</tspan>
                            <tspan x={topic.title.length + 5} dy="0" fontSize="2.5" fill="#F28A21" className="underline underline-offset-4 hover:opacity-70 hover:focus:outline-none focus:opacity-80">
                              Start lesson
                            </tspan>
                          </text>
                        </Link>
                      ) : topic.status === "Locked" ? (
                        <Link href="/Preview">
                          <text x="5" y="1" fill="#555" fontSize="2">
                            <tspan>{topic.title}</tspan>
                            <tspan x={topic.title.length +  10} dy="0" fontSize="2" fill="#3F72AF" className="underline underline-offset-4 hover:opacity-70 hover:focus:outline-none focus:opacity-80">
                            Preview lesson
                          </tspan>
                          </text>
                        </Link>
                      ) : (
                        // Completed lessons
                        <Link
                          href="/tutorials"
                          className="underline underline-offset-4 hover:opacity-80 hover:focus:outline-none focus:opacity-80"
                        >
                          <text x="5" y="0" fill="#555" fontSize="2">
                            {topic.title}
                          </text>
                        </Link>
                      )}

                      {/* Topic Title */}
                      {/* <Link
                      href="/"
                      className="underline underline-offset-4 hover:opacity-80 hover:focus:outline-none focus:opacity-80"
                    >
                      <text x="5" y="0" fill="#555" fontSize="2">
                        {topic.title}
                      </text>
                    </Link> */}
                      {/* Topic Description */}
                      <text x="5" y="3" fill="#888" fontSize="2">
                        {/* {topic.description} */}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
            // <text
            //   key={idx}
            //   x={10 + 3}
            //   y={milestone.positionX}
            //   fill="#3B82F6"
            //   fontSize="3"
            //   fontWeight="bold"
            // >
            //   {milestone.title}
            // </text>;
          })}
          {/* {milestones.map((milestone, idx) =>
              idx % 2 === 1 ? (
                <text
                  key={idx}
                  x={milestone.positionX - 2}
                  y={10 - 5}
                  fill="#3B82F6"
                  fontSize="3"
                >
                  {milestone.title}
                </text>
              ) : (
                <text
                  key={idx}
                  x={milestone.positionX - 5}
                  y={10 + 8}
                  fill="#3B82F6"
                  fontSize="3"
                >
                  {milestone.title}
                </text>
              )
            )} */}
        </svg>
      </div>
    </div>
  );
};

export default TimelineSVG;

// const milestones: Milestone[] = [
//   {
//     year: 1998,
//     title: "Project Launch",
//     description: "Initial launch...",
//     positionX: 10,
//     positionY: 80,
//   },
//   {
//     year: 2004,
//     title: "Growth Phase",
//     description: "Major expansion...",
//     positionX: 25,
//     positionY: 60,
//   },
//   {
//     year: 2009,
//     title: "Milestone 3",
//     description: "Another milestone...",
//     positionX: 40,
//     positionY: 68,
//   },
//   {
//     year: 2015,
//     title: "Milestone 4",
//     description: "Another milestone...",
//     positionX: 55,
//     positionY: 60,
//   },
//   {
//     year: 2020,
//     title: "Current Status",
//     description: "Present status...",
//     positionX: 70,
//     positionY: 65,
//   },
// ];

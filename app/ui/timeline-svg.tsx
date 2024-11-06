import React from "react";
import { Milestone } from "@/app/lib/definitions";

const TimelineSVG: React.FC = () => {
  const milestones: Milestone[] = [
    {
      year: 1998,
      title: "Project Launch",
      description: "Initial launch...",
      positionX: 10,
      positionY: 80,
    },
    {
      year: 2004,
      title: "Growth Phase",
      description: "Major expansion...",
      positionX: 25,
      positionY: 60,
    },
    {
      year: 2009,
      title: "Milestone 3",
      description: "Another milestone...",
      positionX: 40,
      positionY: 68,
    },
    {
      year: 2015,
      title: "Milestone 4",
      description: "Another milestone...",
      positionX: 55,
      positionY: 60,
    },
    {
      year: 2020,
      title: "Current Status",
      description: "Present status...",
      positionX: 70,
      positionY: 65,
    },
  ];

  return (
    <div className="flex justify-center items-center p-4">
      <svg
        viewBox="0 0 100 100" //define the coordinate system
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
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
          points="10,10 10,90"
          fill="none"
          stroke="grey"
          strokeWidth="2"
          markerStart="url(#circle)"
          markerMid="url(#circle)"
          markerEnd="url(#arrow)"
        />
        {/* Circles at Milestones */}
        <circle cx="10" cy="10" r="3" fill="#3B82F6" />
        <circle cx="10" cy="25" r="3" fill="#3B82F6" />
        <circle cx="10" cy="40" r="3" fill="#3B82F6" />
        <circle cx="10" cy="55" r="3" fill="#3B82F6" />
        <circle cx="10" cy="70" r="3" fill="#3B82F6" />

        {milestones.map((milestone, idx) => (
          <text
            key={idx}
            x={10 + 5}
            y={milestone.positionX}
            fill="#3B82F6"
            fontSize="3"
          >
            {milestone.title}
          </text>
        ))}
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
  );
};

export default TimelineSVG;

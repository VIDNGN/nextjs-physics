import TimelineSVG from "@/app/ui/timeline-svg";
import { Milestone } from "@/app/lib/definitions";

const Timeline = () => {
  const milestones: Milestone[] = [
    {
      year: 1998,
      title: "Project Launch",
      description: "Initial launch...",
      position: 10,
    },
    {
      year: 2004,
      title: "Growth Phase",
      description: "Major expansion...",
      position: 30,
    },
    {
      year: 2009,
      title: "Milestone 3",
      description: "Another milestone...",
      position: 50,
    },
    {
      year: 2015,
      title: "Milestone 4",
      description: "Another milestone...",
      position: 70,
    },
    {
      year: 2020,
      title: "Current Status",
      description: "Present status...",
      position: 90,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center space-y-6">
      <TimelineSVG />

      {milestones.map((milestone, idx) => (
        <div
          key={idx}
          className="abosolute flex flex-col items-center transform -translate-x-1/2 text-center"
          style={{
            left: `${milestone.position}%`,
            top: `${100 - milestone.position}%`,
          }}
        >
          <div className="p-2 bg-blue-500 round-full text-white text-sm">
            {milestone.year}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;

"use client";

import { useState } from "react";

type Subject = "Physics" | "Chemistry" | "Mathematics" | "All";

type TestItem = {
  name: string;
  subject: Exclude<Subject, "All">;
  retention: number;
};

const data: TestItem[] = [
  { name: "Advanced Calculus Quiz 4", subject: "Mathematics", retention: 95 },
  { name: "Quantum Mechanics Basics", subject: "Physics", retention: 78 },
  { name: "Organic Compounds Review", subject: "Chemistry", retention: 62 },
  { name: "Thermodynamics Mock Test", subject: "Physics", retention: 45 },
];

const subjects: Subject[] = ["All", "Physics", "Chemistry", "Mathematics"];

export default function TopicAnalysis() {
  const [active, setActive] = useState<Subject>("All");

  const getSubjectStyle = (subject: Exclude<Subject, "All">) => {
    switch (subject) {
      case "Mathematics":
        return "text-green-500 bg-green-500/10 border-green-500/30";
      case "Physics":
        return "text-blue-500 bg-blue-500/10 border-blue-500/30";
      case "Chemistry":
        return "text-red-500 bg-red-500/10 border-red-500/30";
      default:
        return "";
    }
  };

  const getBarColor = (value: number) => {
    if (value >= 80) return "bg-green-400";
    if (value >= 60) return "bg-orange-400";
    return "bg-red-400";
  };

  const filteredData =
    active === "All"
      ? data
      : data.filter((item) => item.subject === active);

  return (
    <div className="bg-foreground border border-text/30 rounded-xl py-5">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 md:px-6 mb-4">
        
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
          Very Weak Concepts (Critical Revision)
        </h2>

        <div className="flex gap-2 overflow-x-auto whitespace-nowrap">
          {subjects.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`px-3 sm:px-4 py-1 rounded-full text-sm sm:text-base ${
                active === item
                  ? "bg-primary text-black"
                  : "bg-background/30 text-text"
              }`}
            >
              {item === "Mathematics" ? "Math" : item}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-4 items-center font-semibold text-lg text-gray-400 bg-background/20 px-4 py-3 rounded-lg mb-6 text-center">
        <div>Test Name</div>
        <div>Subject</div>
        <div>Retention</div>
        <div>Action</div>
      </div>

      <div className="px-4 md:px-6 space-y-4">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:grid md:grid-cols-4 gap-3 md:gap-0 md:items-center text-left md:text-center p-4 rounded-lg"
          >
      
            <div>
              <span className="block text-xs text-gray-400 md:hidden">
                Test
              </span>
              <div className="text-sm sm:text-base">{item.name}</div>
            </div>

            <div>
              <span className="block text-xs text-gray-400 md:hidden">
                Subject
              </span>
              <span
                className={`inline-block mt-1 px-3 py-1 text-xs rounded-full border ${getSubjectStyle(
                  item.subject
                )}`}
              >
                {item.subject === "Mathematics" ? "Math" : item.subject}
              </span>
            </div>

            <div>
              <span className="block text-xs text-gray-400 md:hidden">
                Retention
              </span>
              <div className="flex items-center justify-center gap-3 mt-1">
                <div className="w-full max-w-xs h-2.5 bg-background/30 rounded-full">
                  <div
                    className={`h-2.5 rounded-full ${getBarColor(
                      item.retention
                    )}`}
                    style={{ width: `${item.retention}%` }}
                  />
                </div>
                <span className="text-sm sm:text-base">
                  {item.retention}%
                </span>
              </div>
            </div>
            <div>
              <span className="block text-xs text-gray-400 md:hidden">
                Action
              </span>
              <button className="mt-1 text-primary hover:underline text-sm sm:text-base">
                Revise →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
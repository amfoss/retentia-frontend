"use client";

import { useState } from "react";
import Sidebar from "../Sidebar";
import Card from "../ui/Card"

type Subject = "Physics" | "Chemistry" | "Math";
type FilterType = "All" | Subject;

type Test = {
  id: string;
  name: string;
  subject: Subject;
  date: string;
  score: number;
  questions: number;
  duration: number;
};

const dummyTests: Test[] = [
  {
    id: "1",
    name: "Advanced Calculus Quiz 4",
    subject: "Math",
    date: "Oct 12, 2023",
    score: 95,
    questions: 20,
    duration: 45,
  },
  {
    id: "2",
    name: "Quantum Mechanics Basics",
    subject: "Physics",
    date: "Oct 10, 2023",
    score: 78,
    questions: 15,
    duration: 30,
  },
  {
    id: "3",
    name: "Organic Compounds Review",
    subject: "Chemistry",
    date: "Oct 08, 2023",
    score: 62,
    questions: 25,
    duration: 60,
  },
  {
    id: "4",
    name: "Thermodynamics Mock Test",
    subject: "Physics",
    date: "Oct 05, 2023",
    score: 45,
    questions: 50,
    duration: 120,
  },
];

const filters: FilterType[] = ["All", "Physics", "Chemistry", "Math"];

export default function TestHistoryPage() {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<FilterType>("All");

  const filteredTests = dummyTests.filter((test) => {
    const matchesSearch = test.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || test.subject === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background flex text-text">
      
      <div >
        <Sidebar />
      </div>

      <div className="flex-1 p-10">
         
        <div className="w-full mb-10">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-3 rounded-xl bg-foreground text-2xl "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="w-full flex">

          <Card variant="primary" className=" w-full">

            <div className="flex justify-between items-center px-8 py-6">
              <h2 className="text-3xl font-semibold ">
                Recent Test Activity
              </h2>

              <div className="flex gap-2">
                {filters.map((subj) => (
                  <button
                    key={subj}
                    onClick={() => setFilter(subj)}
                    className={`px-4 py-1.5 rounded-full text-xl transition ${
                      filter === subj
                        ? "bg-yellow-500 text-black"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid items-center grid-cols-5 px-8 py-3 text-xl text-gray-500 uppercase">
              <span>Test Name</span>
              <span>Subject</span>
              <span>Date</span>
              <span>Score</span>
              <span>Action</span>
            </div>

            <div>
              {filteredTests.map((test) => {
                
                let scoreColor = "bg-green-400";
                if (test.score < 70) scoreColor = "bg-orange-400";
                if (test.score < 50) scoreColor = "bg-red-500";

                const badgeStyles: Record<Subject, string> = {
                  Physics:
                    "text-blue-400 border border-blue-400/30 bg-blue-400/10",
                  Chemistry:
                    "text-orange-400 border border-orange-400/30 bg-orange-400/10",
                  Math:
                    "text-green-400 border border-green-400/30 bg-green-400/10",
                };

                return (
                  <div
                    key={test.id}
                    className="grid grid-cols-5 items-center px-10 py-3 border-t border-[#2a2a2a]"
                  >
                    
                    <div>
                      <p className="text-xl text-test">
                        {test.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {test.questions} Questions • {test.duration} mins
                      </p>
                    </div>

                    <span
                      className={`text-xl px-3 py-1 rounded-full w-fit ${badgeStyles[test.subject]}`}
                    >
                      {test.subject}
                    </span>

                    <span className="text-xl text-gray-400">
                      {test.date}
                    </span>

                    <div className="w-40">
                      <div className="h-2 bg-background/20 rounded-full">
                        <div
                          className={`h-2 rounded-full ${scoreColor}`}
                          style={{ width: `${test.score}%` }}
                        />
                      </div>
                      <p className="text-xs mt-1 ">
                        {test.score}%
                      </p>
                    </div>

                   
               <div className="flex justify-start">
                <button className="text-primary text-sm md:text-lg hover:underline">
                  Analyze →
                </button>
              </div>
                 
                  </div>
                );
              })}
            </div>

          </Card>
        </div>
      </div>
    </div>
  );
}
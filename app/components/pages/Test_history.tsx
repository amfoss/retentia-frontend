"use client";

import { useState } from "react";
import Sidebar from "../Sidebar";
import SearchBar from "../ui/Searchbar";
import TestHistoryTable from "../ui/TestHistoryTable";

type Subject = "Physics" | "Chemistry" | "Math";
type FilterType = "All" | Subject;

export type Test = {
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

export default function TestHistoryPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("All");

  return (
    <div className="min-h-screen bg-background flex text-text">
      <Sidebar />

      <div className="flex-1 p-10">
        <SearchBar search={search} setSearch={setSearch} />

        <TestHistoryTable
          tests={dummyTests}
          search={search}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import SelectChapterCard from "../ui/SelectConcepts";
import { Search, Calculator, Zap, Beaker } from "lucide-react";
import Sidebar from "../Sidebar";
import Button from "../ui/Button";

type Chapter = {
  name: string;
  concepts: string[];
};

type Topic = {
  chapters: Chapter[];
};

export default function TakeTest() {
  const [search, setSearch] = useState("");
  const [mathSelected, setMathSelected] = useState<string[]>([]);
  const [physicsSelected, setPhysicsSelected] = useState<string[]>([]);
  const [chemSelected, setChemSelected] = useState<string[]>([]);

  function initQuiz() {
    console.log({
      Mathematics: mathSelected,
      Physics: physicsSelected,
      Chemistry: chemSelected,
    });
  }

  return (
    <div className="flex bg-surface text-text">
      <Sidebar />

      <main className="flex-1 flex flex-col px-4 py-6 overflow-hidden">
        <div className="w-full flex flex-col">
          <div className="mb-4 flex justify-center">
            <div className="w-full flex items-center gap-3 bg-foreground rounded-lg px-6 py-3.5">
              <Search className="w-5 h-5 text-border" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="bg-transparent outline-none text-sm flex-1 text-text placeholder:text-text"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 w-full mt-2">
            <SelectChapterCard
              subjectName="Mathematics"
              topics={mathematicsTopics}
              icon={<Calculator size={18} className="text-maths-icon" />}
              onSelectionChange={setMathSelected}
              search={search}
            />

            <SelectChapterCard
              subjectName="Physics"
              topics={physicsTopics}
              icon={<Zap size={18} className="text-physics-icon" />}
              onSelectionChange={setPhysicsSelected}
              search={search}
            />

            <SelectChapterCard
              subjectName="Chemistry"
              topics={chemistryTopics}
              icon={<Beaker size={18} className="text-chemistry-icon" />}
              onSelectionChange={setChemSelected}
              search={search}
            />
          </div>
        </div>

        <div className="absolute bottom-6 right-6">
          <Button variant="proceed_btn" onClick={initQuiz}>
            Proceed
          </Button>
        </div>
      </main>
    </div>
  );
}

const mathematicsTopics: Topic[] = [
  {
    chapters: [
      {
        name: "Calculus I",
        concepts: [
          "Limits and Continuity",
          "Derivatives of Functions",
          "Chain Rule Applications",
          "Mean Value Theorem",
        ],
      },
      {
        name: "Calculus II",
        concepts: [
          "Integration Techniques",
          "Series and Sequences",
          "Taylor Polynomials",
        ],
      },
      {
        name: "Probability",
        concepts: ["Random Variables", "Distributions", "Bayes Theorem"],
      },
      {
        name: "Geometry",
        concepts: ["Straight Lines", "Circle", "Parabola", "Ellipse"],
      },
      {
        name: "Linear Algebra",
        concepts: ["Matrices", "Determinants", "Eigenvalues"],
      },
      {
        name: "Permutation and Combination",
        concepts: ["Permutations", "Combinations", "Binomial Theorem"],
      },
    ],
  },
];

const physicsTopics: Topic[] = [
  {
    chapters: [
      {
        name: "Mechanics",
        concepts: [
          "Kinematics in 1D",
          "Newton's Laws of Motion",
          "Work, Energy & Power",
        ],
      },
      {
        name: "Thermodynamics",
        concepts: ["Laws of Thermodynamics", "Carnot Cycle", "Entropy"],
      },
      {
        name: "Modern Physics",
        concepts: [
          "Dual Nature of Radiation and Matter",
          "Atoms",
          "Semiconductor Electronics: Materials",
        ],
      },
      {
        name: "Electrostatics",
        concepts: ["Electric Field", "Gauss Law", "Potential"],
      },
      {
        name: "Magnetism",
        concepts: ["Magnetic Force", "Biot Savart Law", "Faraday's Law"],
      },
      {
        name: "Optics",
        concepts: ["Ray Optics", "Wave Optics", "Interference"],
      },
      {
        name: "Waves",
        concepts: ["Wave Motion", "Sound Waves", "Doppler Effect"],
      },
    ],
  },
];

const chemistryTopics: Topic[] = [
  {
    chapters: [
      {
        name: "Organic Chemistry",
        concepts: [
          "Alkanes and Alkenes",
          "Functional Groups",
          "Aromatic Compounds",
        ],
      },
      {
        name: "Chemical Bonding",
        concepts: ["Ionic Bonds", "Covalent Bonds", "VSEPR Theory"],
      },
      {
        name: "Biomolecules",
        concepts: ["Carbohydrates", "Proteins", "Nucleic Acids"],
      },
      {
        name: "Periodic Table",
        concepts: ["Periods and Groups", "Periodic Trends", "d-Block Elements"],
      },
      {
        name: "Physical Chemistry",
        concepts: ["Atomic Structure", "States of Matter", "Electrochemistry"],
      },
      {
        name: "Equilibrium",
        concepts: [
          "Chemical Equilibrium",
          "Le Chatelier's Principle",
          "Ionic Equilibrium",
        ],
      },
      {
        name: "Inorganic Chemistry",
        concepts: [
          "Coordination Compounds",
          "Metallurgy",
          "Qualitative Analysis",
        ],
      },
    ],
  },
];

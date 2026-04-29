"use client";

import { Beaker, Calculator, Search, Zap } from "lucide-react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Button from "../components/ui/Button";
import SelectChapterCard from "../components/ui/SelectConcepts";

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
    <div className="flex bg-background text-text h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col px-4 pt-5">
        <div className="mb-3 flex items-center gap-3 bg-foreground rounded-lg px-4 py-2.5">
          <Search className="w-4 h-4 text-border shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="bg-transparent outline-none text-sm flex-1 text-text placeholder:text-text"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 overflow-hidden">
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

        <div className="flex justify-end mt-4 mb-3">
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
      }
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

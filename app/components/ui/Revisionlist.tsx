"use client";

import { useState } from "react";
import ChapterCard from "./ChapterCard";
import type { Chapter, Topic } from "@/app/types";

type SelectedConcepts = Record<string, Record<string, boolean>>;

const topics: Topic[] = [
  {
    name: "Mathematics",
    chapters: [
      {
        name: "Calculus I",
        concepts: [
          { name: "Limits and Continuity" },
          { name: "Derivatives" },
          { name: "Chain Rule" },
          { name: "Mean Value Theorem" },
        ],
      },
      {
        name: "Calculus II",
        concepts: [
          { name: "Integration" },
          { name: "Definite Integrals" },
          { name: "Area Under Curve" },
        ],
      },
      {
        name: "Probability",
        concepts: [
          { name: "Basic Probability" },
          { name: "Conditional Probability" },
          { name: "Bayes Theorem" },
        ],
      },
    ],
  },
  {
    name: "Physics",
    chapters: [
      {
        name: "Mechanics",
        concepts: [
          { name: "Kinematics" },
          { name: "Newton's Laws of Motion" },
          { name: "Work, Energy and Power" },
        ],
      },
      {
        name: "Thermodynamics",
        concepts: [
          { name: "Heat Transfer" },
          { name: "Laws of Thermodynamics" },
          { name: "Entropy" },
        ],
      },
      {
        name: "Optics",
        concepts: [
          { name: "Reflection" },
          { name: "Refraction" },
          { name: "Lens Formula" },
        ],
      },
    ],
  },
  {
    name: "Chemistry",
    chapters: [
      {
        name: "Organic Chemistry",
        concepts: [
          { name: "Hydrocarbons" },
          { name: "Functional Groups" },
          { name: "Reaction Mechanisms" },
        ],
      },
      {
        name: "Chemical Bonding",
        concepts: [
          { name: "Ionic Bonding" },
          { name: "Covalent Bonding" },
          { name: "Hybridization" },
        ],
      },
      {
        name: "Equilibrium",
        concepts: [
          { name: "Chemical Equilibrium" },
          { name: "Le Chatelier's Principle" },
          { name: "Ionic Equilibrium" },
        ],
      },
    ],
  },
];

export default function RevisionList() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<SelectedConcepts>({});

  function isChapterSelected(chapter: Chapter) {
    const chapterData = selected[chapter.name] || {};

    return chapter.concepts.every((concept) => chapterData[concept.name]);
  }

  function updateSelectedConcepts(updatedSelected: SelectedConcepts) {
    const selectedList: string[] = [];

    for (const chapterName in updatedSelected) {
      const concepts = updatedSelected[chapterName];

      for (const conceptName in concepts) {
        if (concepts[conceptName]) {
          selectedList.push(conceptName);
        }
      }
    }

    console.log(selectedList);
  }

  function toggleChapter(chapter: Chapter) {
    const shouldCheck = !isChapterSelected(chapter);

    const chapterConcepts: Record<string, boolean> = {};

    for (const concept of chapter.concepts) {
      chapterConcepts[concept.name] = shouldCheck;
    }

    const updatedSelected: SelectedConcepts = {
      ...selected,
      [chapter.name]: chapterConcepts,
    };

    setSelected(updatedSelected);
    updateSelectedConcepts(updatedSelected);
  }

  function toggleConcept(chapterName: string, concept: string) {
    const updatedSelected: SelectedConcepts = {
      ...selected,
      [chapterName]: {
        ...(selected[chapterName] || {}),
        [concept]: !selected[chapterName]?.[concept],
      },
    };

    setSelected(updatedSelected);
    updateSelectedConcepts(updatedSelected);
  }

  return (
    <div className="flex min-w-0 flex-col gap-4">
      {topics.map((topic) => (
        <div
          key={topic.name}
          className="w-full rounded-2xl bg-foreground p-4 shadow-xl sm:p-5"
        >
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-sm font-semibold text-white sm:text-base">
              {topic.name}
            </h2>
          </div>

          <div className="flex flex-col gap-2">
            {topic.chapters.map((chapter) => (
              <ChapterCard
                key={chapter.name}
                chapter={chapter}
                isExpanded={!!expanded[chapter.name]}
                isChapterSelected={isChapterSelected}
                toggleChapter={toggleChapter}
                toggleConcept={toggleConcept}
                setExpanded={setExpanded}
                selected={selected}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
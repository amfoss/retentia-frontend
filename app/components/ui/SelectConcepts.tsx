"use client";

import { useState } from "react";
import Chapter from "./Chapter";

type Chapter = {
  name: string;
  concepts: string[];
};

type Topic = {
  chapters: Chapter[];
};

type Props = {
  subjectName: string;
  topics: Topic[];
  icon?: React.ReactNode;
  onSelectionChange?: (selected: string[]) => void;
  search?: string;
};

export default function SelectChapterCard({
  subjectName,
  topics,
  icon,
  onSelectionChange,
  search = "",
}: Props) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<
    Record<string, Record<string, boolean>>
  >({});

  const Chapters: Chapter[] = [];
  for (const topic of topics) {
    for (const chapter of topic.chapters) {
      Chapters.push(chapter);
    }
  }

  function isChapterSelected(chapter: Chapter) {
    const chapterData = selected[chapter.name] || {};

    for (const concept of chapter.concepts) {
      if (!chapterData[concept]) {
        return false;
      }
    }
    return true;
  }

  function updateSelectedConcepts(
    updatedSelected: Record<string, Record<string, boolean>>
  ) {
    const selectedList: string[] = [];

    for (const chapterName in updatedSelected) {
      const concepts = updatedSelected[chapterName];

      for (const conceptName in concepts) {
        if (concepts[conceptName]) {
          selectedList.push(conceptName);
        }
      }
    }

    onSelectionChange?.(selectedList);
  }

  function toggleChapter(chapter: Chapter) {
    const shouldCheck = !isChapterSelected(chapter);
    const updatedSelected = { ...selected };
    updatedSelected[chapter.name] = {};

    for (const concept of chapter.concepts) {
      updatedSelected[chapter.name][concept] = shouldCheck;
    }

    setSelected(updatedSelected);
    updateSelectedConcepts(updatedSelected);
  }

  function toggleConcept(chapterName: string, concept: string) {
    const updatedSelected = { ...selected };

    if (!updatedSelected[chapterName]) {
      updatedSelected[chapterName] = {};
    }

    updatedSelected[chapterName][concept] =
      !updatedSelected[chapterName][concept];
    setSelected(updatedSelected);
    updateSelectedConcepts(updatedSelected);
  }

  const filtered: Chapter[] = [];
  const searchInput = search.toLowerCase();

  for (const topic of topics) {
    for (const chapter of topic.chapters) {
      const chapterFound = chapter.name.toLowerCase().includes(searchInput);
      if (chapterFound) {
        filtered.push(chapter);
      } else {
        const conceptFound = chapter.concepts.filter((concept) =>
          concept.toLowerCase().includes(searchInput)
        );
        if (conceptFound.length > 0) {
          filtered.push({ ...chapter, concepts: conceptFound });
        }
      }
    }
  }

  const subjectCards = [];
  const isSearching = search.length > 0;
  for (const chapter of filtered) {
    const isExpanded = isSearching || expanded[chapter.name];

    subjectCards.push(
      <Chapter
        key={chapter.name}
        chapter={chapter}
        isExpanded={isExpanded}
        isChapterSelected={isChapterSelected}
        toggleChapter={toggleChapter}
        toggleConcept={toggleConcept}
        setExpanded={setExpanded}
        selected={selected}
      />
    );
  }

  return (
    <div className="w-full bg-foreground rounded-2xl p-4 flex flex-col shadow-xl overflow-y-auto">
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-foreground p-1.5 rounded-md">{icon}</div>
        <h2 className="text-sm font-semibold text-white">{subjectName}</h2>
      </div>

      <div className="flex-1 flex overflow-y-auto flex-col gap-2 pr-1">
        {subjectCards}
      </div>
    </div>
  );
}

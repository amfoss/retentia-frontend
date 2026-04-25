"use client";

import { ChevronRight } from "lucide-react";

type Chapter = {
  name: string;
  concepts: string[];
};

type Props = {
  chapter: Chapter;
  isExpanded: boolean;
  isChapterSelected: (chapter: Chapter) => boolean;
  toggleChapter: (chapter: Chapter) => void;
  toggleConcept: (chapterName: string, concept: string) => void;
  setExpanded: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  selected: Record<string, Record<string, boolean>>;
};

export default function Chapter({
  chapter,
  isExpanded,
  isChapterSelected,
  toggleChapter,
  toggleConcept,
  setExpanded,
  selected,
}: Props) {
  return (
    <div
      className={`rounded-2xl ${isExpanded ? "bg-light-background" : "bg-dark-foreground hover:bg-dark-surface"}`}
    >
      <div className="flex justify-between px-5 py-4 items-center">
        <button
          onClick={() =>
            setExpanded((chapters) => ({
              ...chapters,
              [chapter.name]: !chapters[chapter.name],
            }))
          }
          className="flex items-center gap-2"
        >
          <ChevronRight
            size={16}
            className={`${isExpanded ? "rotate-90" : "rotate-0"}`}
          />
          <span className="text-sm font-semibold text-white">
            {chapter.name}
          </span>
        </button>

        <input
          type="checkbox"
          checked={isChapterSelected(chapter)}
          onChange={() => toggleChapter(chapter)}
          className="secondary w-4 h-4 cursor-pointer"
        />
      </div>

      {isExpanded && (
        <div className="px-10 pb-5 pt-2 flex flex-col gap-4">
          <div className="mb-1" />

          {chapter.concepts.map((concept) => (
            <div
              key={concept}
              onClick={() => toggleConcept(chapter.name, concept)}
              className="flex items-center justify-between text-sm cursor-pointer"
            >
              <span className="text-dark-text hover:text-text">{concept}</span>
              <input
                type="checkbox"
                checked={selected[chapter.name]?.[concept]}
                readOnly
                className="secondary w-4 h-4 cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type QuestionNavigationProps = {
  currentQuestion: number;
  totalQuestions: number;
  onQuestionChange?: (q: number) => void;
  confirmedAnswers: Record<number, boolean>;
  markedReview: Record<number, boolean>;
  skipped: Record<number, boolean>;
};

export default function QuestionNavigation({
  currentQuestion,
  totalQuestions,
  onQuestionChange,
  confirmedAnswers,
  markedReview,
  skipped,
}: QuestionNavigationProps) {

  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(12);

  const shiftAmount = 5;

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) setVisibleCount(10);
      else if (window.innerWidth < 1024) setVisibleCount(15);
      else setVisibleCount(20);
    };

    updateVisibleCount();

    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const isPrevDisabled = startIndex === 0;
  const isNextDisabled = startIndex + visibleCount >= totalQuestions;

  const handleNext = () => {
    if (isNextDisabled) return;

    setStartIndex((prev) =>
      Math.min(prev + shiftAmount, totalQuestions - visibleCount)
    );
  };

  const handlePrev = () => {
    if (isPrevDisabled) return;

    setStartIndex((prev) =>
      Math.max(prev - shiftAmount, 0)
    );
  };

  const visibleQuestions = Array.from({ length: visibleCount })
    .map((_, index) => startIndex + index + 1)
    .filter((q) => q <= totalQuestions);

  return (
    <div className="flex items-center gap-2 sm:gap-4 mb-8 w-full">

      <button
        onClick={handlePrev}
        disabled={isPrevDisabled}
        className={`px-2 sm:px-3 md:px-4 py-1 sm:py-3 border-2 rounded-md flex items-center gap-1 text-sm sm:text-base
        ${isPrevDisabled ? "opacity-40 cursor-not-allowed" : "bg-background"}`}
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Prev</span>
      </button>

      <div className="flex-1">
        <div className="flex gap-2 sm:gap-3 md:gap-5 justify-center flex-wrap">

          {visibleQuestions.map((qNumber) => {

            const isAnswered = confirmedAnswers[qNumber];
            const isMarked = markedReview[qNumber];
            const isSkipped = skipped[qNumber];

            let colorClass = "border-border text-text/70";

            if (isMarked) {
              colorClass = "bg-marked-for-review text-white";
            }
            else if (isAnswered) {
              colorClass = "bg-answered text-white";
            }
            else if (isSkipped) {
              colorClass = "bg-not-answered text-white";
            }

            const isCurrent = qNumber === currentQuestion;

            return (
              <button
                key={qNumber}
                onClick={() => onQuestionChange?.(qNumber)}
                className={`w-9 h-9 sm:w-10 sm:h-10 md:w-15 md:h-15
                rounded-md border-2 transition-all text-sm sm:text-base
                ${colorClass}
                ${isCurrent ? "ring-2 ring-secondary" : ""}`}
              >
                {qNumber}
              </button>
            );
          })}

        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={isNextDisabled}
        className={`px-2 sm:px-3 md:px-4 py-1 sm:py-3 border-2 rounded-md flex items-center gap-1 text-sm sm:text-base
        ${isNextDisabled ? "opacity-40 cursor-not-allowed" : "bg-background"}`}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} />
      </button>

    </div>
  );
}
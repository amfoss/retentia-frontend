"use client";

import { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import ProgressBar from "../ui/Progressbar";
import Timer from "../ui/Timer";
import QuestionNavigation from "../ui/QuestionNavigation";
import { Flag, ChevronRight } from "lucide-react";

export default function Retentiaquiz() {

  const totalQuestions = 50;

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string | null>>({});
  const [confirmedAnswers, setConfirmedAnswers] = useState<Record<number, boolean>>({});
  const [markedReview, setMarkedReview] = useState<Record<number, boolean>>({});
  const [skipped, setSkipped] = useState<Record<number, boolean>>({});

  const answeredCount = Object.keys(confirmedAnswers).length;

  const options = [
    { id: "A", text: "Solarpx-2 sm:px-3 md:px-4 py-1 sm:py-3 border-2 rounded-md bg-background flex items-center gap-1 text-sm sm:text-basepx-2 sm:px-3 md:px-4 py-1 sm:py-3 border-2 rounded-md bg-background flex items-center gap-1 text-sm sm:text-basepx-2 sm:px-3 md:px-4 py-1 sm:py-3 border-2 rounded-md bg-background flex items-center gap-1 text-sm sm:text-basepx-2 sm:px-3 md:px-4 py-1 sm:py-3 border-2 rounded-md bg-background flex items-center gap-1 text-sm sm:text-base" },
    { id: "B", text: "Wind Power" },
    { id: "C", text: "Natural Gas" },
    { id: "D", text: "Hydroelectric Power" },
  ];

  const handleOptionClick = (optionId: string) => {

    setAnswers((prev) => {

      const current = prev[currentQuestion];

      return {
        ...prev,
        [currentQuestion]: current === optionId ? null : optionId,
      };

    });

    setSkipped((prev) => {
      const updated = { ...prev };
      delete updated[currentQuestion];
      return updated;
    });

  };

  const handleNext = () => {

    if (answers[currentQuestion]) {

      setConfirmedAnswers((prev) => ({
        ...prev,
        [currentQuestion]: true,
      }));

      setSkipped((prev) => {
        const updated = { ...prev };
        delete updated[currentQuestion];
        return updated;
      });

    } else {

      setSkipped((prev) => ({
        ...prev,
        [currentQuestion]: true,
      }));

      setConfirmedAnswers((prev) => {
        const updated = { ...prev };
        delete updated[currentQuestion];
        return updated;
      });

    }

    if (currentQuestion < totalQuestions) {
      setCurrentQuestion((prev) => prev + 1);
    }

  };

  const toggleReview = () => {

    setMarkedReview((prev) => ({
      ...prev,
      [currentQuestion]: !prev[currentQuestion],
    }));

    setSkipped((prev) => {
      const updated = { ...prev };
      delete updated[currentQuestion];
      return updated;
    });

  };


  const handleSubmit = () => {

    const confirmSubmit = window.confirm(
      "Are you sure you want to submit the quiz?"
    );

    if (confirmSubmit) {
      alert("Quiz submitted successfully!");
    }

  };

  return (

    <main className="min-h-screen flex flex-col justify-center bg-background py-10 px-80">

        <div className="grid grid-cols-3 items-center mt-3">

          <div></div>

          <div className="flex justify-center">
            <Timer totalQuestions={totalQuestions} />
          </div>

          <div className="flex justify-end">
            <Button
              variant="default"
              className="bg-answered px-6 py-2 text-white"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>

        </div>

        <div className="mb-10 mt-10">
          <ProgressBar
            answered={answeredCount}
            total={totalQuestions}
          />
        </div>

        <QuestionNavigation
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          onQuestionChange={setCurrentQuestion}
          confirmedAnswers={confirmedAnswers}
          markedReview={markedReview}
          skipped={skipped}
        />
      <Card
        variant="primary"
        className="w-full  max-h-212.5 px-10"
      >


        <Card
          variant="secondary"
          className="w-full mb-15 flex items-center justify-center "
        >
          <p className="text-3xl font-bold leading-relaxed p-15">
            Which of the following energy sources cannot be
            replenished naturally on a human timescale,
          </p>
        </Card>

        <div className="space-y-5 text-xl">

          {options.map((option) => {

            const isSelected = answers[currentQuestion] === option.id;
            const isAnswered = confirmedAnswers[currentQuestion];

            let colorClass = "";

            if (isAnswered && isSelected) colorClass = "border-secondary ";
            else if (isSelected) colorClass = "border-secondary";

            return (

              <Button
                key={option.id}
                variant="opt_btn"
                onClick={() => handleOptionClick(option.id)}
                className={`${colorClass}`}
              >

                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black font-semibold">
                  {option.id}
                </div>

                <span className="flex-1 text-left">
                  {option.text}
                </span>

              </Button>

            );
          })}

        </div>

       

      </Card>
       <div className="flex justify-end items-center gap-5 mt-20 mb-5">

          <Button
            variant="default"
            onClick={toggleReview}
            className="bg-purple-600 text-white px-6 py-2 flex items-center gap-2"
          >
            <Flag size={18} />
            Mark For Review
          </Button>

          <Button
            variant="default"
            onClick={handleNext}
            className="bg-secondary px-6 py-2 flex text-white items-center gap-2"
          >
            Next Question
            <ChevronRight size={18} />
          </Button>

        </div>

    </main>
  );
}
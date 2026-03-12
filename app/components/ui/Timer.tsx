"use client";

import { useEffect, useState, useRef } from "react";
import { Clock } from "lucide-react";

type TimerProps = {
  totalQuestions: number;
  onTimeUp?: () => void;
};

export default function Timer({ totalQuestions, onTimeUp }: TimerProps) {

  const totalSeconds = totalQuestions * 60;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {

    if (timeLeft <= 0) {
      onTimeUpRef.current?.();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const danger =
    timeLeft <= 60 ? "text-text animate-pulse" : "text-timer";

  return (
    <div
      className={`flex items-center gap-1 sm:gap-2 text-base sm:text-xl md:text-2xl font-semibold ${danger}`}
    >
      <Clock
        size={28}
        className="sm:w-8 sm:h-8 md:w-[50px] md:h-[50px]"
        strokeWidth={2}
      />

      <span className="whitespace-nowrap">
        <span className="hidden sm:inline">Time Remaining: </span>

        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
}
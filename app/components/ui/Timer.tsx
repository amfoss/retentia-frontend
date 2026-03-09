"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

type TimerProps = {
  totalQuestions: number;
  onTimeUp?: () => void;
};

export default function Timer({ totalQuestions, onTimeUp }: TimerProps) {

  const totalSeconds = totalQuestions * 60;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimeUp]);


  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const danger =
    timeLeft <= 60 ? "text-[#FF0000]/50 animate-pulse" : "text-timer";

  return (
    <div className={`flex items-center gap-2 text-2xl font-semibold ${danger}`}>
      <Clock size={50} strokeWidth={2} />
      <span>
        Time Remaining:{" "}
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
}
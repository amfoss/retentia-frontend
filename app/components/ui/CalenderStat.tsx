"use client";

import { ChevronLeft, ChevronRight, Flame } from "lucide-react";

const revisionData = {
  completedDays: [2, 3, 5, 7, 8, 10, 12, 15, 18, 20, 24, 25],
  currentStreak: 2,
  longestStreak: 12,
};

export default function CalendarStats() {
  const today = new Date();

  const month = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();
  const currentDay = today.getDate();

  const totalDays = new Date(year, today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(year, today.getMonth(), 1).getDay();

  const calendarCells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  return (
    <aside className="w-full max-w-full rounded-3xl bg-[#2f2f2f] p-4 text-white shadow-xl sm:p-5">
      <div>
        <h1 className="text-xl font-bold leading-tight sm:text-2xl">
          Revision Schedule
        </h1>
        <p className="mt-1 text-xs leading-relaxed text-white/80 sm:text-sm">
          Manage your spaced repetition and mastery goals.
        </p>
      </div>

      <div className="mt-5 rounded-[22px] bg-black p-3 sm:p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>

          <p className="text-center text-sm font-medium sm:text-base">
            {month} {year}
          </p>

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10"
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-7 text-center text-xs font-medium text-white/80">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <span key={`${day}-${index}`}>{day}</span>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-1.5 sm:gap-2">
          {calendarCells.map((day, index) => {
            const isToday = day === currentDay;
            const isRevisionDay =
              day !== null && revisionData.completedDays.includes(day);

            return (
              <div
                key={index}
                className={`flex aspect-square min-h-7 items-center justify-center rounded-full text-[11px] sm:text-xs ${
                  day === null
                    ? "invisible"
                    : isToday || isRevisionDay
                      ? "bg-green-500 font-semibold text-black"
                      : "border border-white/40 text-white"
                }`}>
                {day}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 space-y-3 sm:mt-6">
        <div className="flex flex-col gap-1 rounded-2xl bg-blue-500 px-4 py-3 shadow-lg sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-bold sm:text-base">
            Current Streak
          </span>

          <span className="text-base font-bold sm:text-lg">
            {revisionData.currentStreak} Days
          </span>
        </div>

        <div className="flex flex-col gap-2 rounded-2xl bg-blue-500 px-4 py-3 shadow-lg sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-300">
              <Flame size={18} className="text-orange-500" />
            </span>

            <span className="text-sm font-bold sm:text-base">
              Longest Streak
            </span>
          </div>

          <span className="text-base font-bold sm:text-lg">
            {revisionData.longestStreak} Days
          </span>
        </div>
      </div>

      <button
        type="button"
        className="mt-6 w-full rounded-full bg-green-600 py-3 text-sm font-bold text-black shadow-lg transition hover:bg-green-700 sm:text-base">
        Proceed for Revision →
      </button>
    </aside>
  );
}
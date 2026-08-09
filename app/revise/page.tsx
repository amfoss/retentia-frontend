"use client";

import Sidebar from "../components/Sidebar";
import RevisionList from "../components/ui/Revisionlist";
import CalendarStats from "../components/ui/CalenderStat";
export default function Revise() {
  return (
    <main className="min-h-screen bg-background text-white">
      <div className="flex min-h-screen">
        <Sidebar />
        <section className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_360px]">
            <RevisionList />
            <div className="xl:sticky xl:top-6 xl:self-start">
              <CalendarStats />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
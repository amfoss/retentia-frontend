"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Button from "@/app/components/ui/Button";
import SelectChapterCard from "@/app/components/ui/SelectConcepts";
import { Subject } from "@/app/types"
import { fetchSyllabus, subjectIconColors, subjectIcons } from "@/app/take-test/lib";
import { useRouter } from "next/navigation";

export default function TakeTest() {
  const [search, setSearch] = useState("");
  const [mathSelected, setMathSelected] = useState<string[]>([]);
  const [physicsSelected, setPhysicsSelected] = useState<string[]>([]);
  const [chemSelected, setChemSelected] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const router = useRouter();
  const selectionHandlers: Record<
    string,
    React.Dispatch<React.SetStateAction<string[]>>
  > = {
    Mathematics: setMathSelected,
    Physics: setPhysicsSelected,
    Chemistry: setChemSelected,
  };

  function initQuiz() {
    console.log({
      Mathematics: mathSelected,
      Physics: physicsSelected,
      Chemistry: chemSelected,
      
    });
    router.push("/Retentiaquiz")
  }

  useEffect(() => {
    async function loadSyllabus() {
      try {
        const data = await fetchSyllabus();
        setSubjects(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadSyllabus();
  }, []);

  return (
    <div className="flex bg-background text-text h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col min-h-0 px-4 pt-5">
        <div className="mb-3 flex items-center gap-3 bg-foreground rounded-lg px-4 py-2.5 shrink-0">
          <Search className="w-4 h-4 text-border shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="bg-transparent outline-none text-sm flex-1 text-text placeholder:text-text"
          />
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {subjects.map((subject) => {
              const Icon = subjectIcons[subject.name as keyof typeof subjectIcons];
              const iconColor = subjectIconColors[subject.name];
              return (
                <div key={subject.name} className="flex flex-col min-h-0">
                  <div className="flex items-center gap-3 mt-2 mb-4">
                    {Icon && <Icon className="w-6 h-6 text-primary" style={{ color: iconColor }}/>}
                    <h2 className="text-2xl font-bold">{subject.name}</h2>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-2">
                    <div className="flex flex-col gap-4">
                      {subject.topics.map((topic) => (
                        <SelectChapterCard
                          key={topic.name}
                          subjectName={topic.name}
                          topics={[topic]}
                          search={search}
                          onSelectionChange={selectionHandlers[subject.name]}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="shrink-0 flex justify-end py-4">
          <Button variant="proceed_btn" onClick={initQuiz}>
            Proceed
          </Button>
        </div>
      </main>
    </div>
  );
}
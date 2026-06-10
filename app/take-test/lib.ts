import { Subject  } from "@/app/types";
import { Beaker, Calculator, Zap } from "lucide-react";

export const subjectIcons = {
  Mathematics: Calculator,
  Physics: Zap,
  Chemistry: Beaker,
};

export const subjectIconColors: Record<string, string> = {
  Mathematics: "var(--maths-icon)",
  Physics: "var(--physics-icon)",
  Chemistry: "var(--chemistry-icon)",
};

export async function fetchSyllabus(): Promise<Subject[]> {
  const res = await fetch("http://localhost:8000/quiz/syllabus");

  if (!res.ok) {
    throw new Error("Failed to fetch syllabus");
  }

  return res.json();
}
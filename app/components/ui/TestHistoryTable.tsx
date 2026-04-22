import Card from "../ui/Card";
import { Test } from "../pages/Test_history";

type Subject = "Physics" | "Chemistry" | "Math";
type FilterType = "All" | Subject;

type Props = {
  tests: Test[];
  search: string;
  filter: FilterType;
  setFilter: (value: FilterType) => void;
};

const filters: FilterType[] = ["All", "Physics", "Chemistry", "Math"];

export default function TestHistoryTable({
  tests,
  search,
  filter,
  setFilter,
}: Props) {
  const filteredTests = tests.filter((test) => {
    const matchesSearch = test.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || test.subject === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full flex">
      <Card variant="primary" className="w-full">

        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6">
          <h2 className="text-3xl font-semibold">
            Recent Test Activity
          </h2>

          <div className="flex gap-2">
            {filters.map((subj) => (
              <button
                key={subj}
                onClick={() => setFilter(subj)}
                className={`px-4 py-1.5 rounded-full text-xl transition ${
                  filter === subj
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {subj}
              </button>
            ))}
          </div>
        </div>

        {/* Table Head */}
        <div className="grid grid-cols-5 px-8 py-3 text-xl text-gray-500 uppercase">
          <span>Test Name</span>
          <span>Subject</span>
          <span>Date</span>
          <span>Score</span>
          <span>Action</span>
        </div>

        {/* Rows */}
        <div>
          {filteredTests.map((test) => {
            let scoreColor = "bg-green-400";
            if (test.score < 70) scoreColor = "bg-orange-400";
            if (test.score < 50) scoreColor = "bg-red-500";

            const badgeStyles: Record<Subject, string> = {
              Physics:
                "text-blue-400 border border-blue-400/30 bg-blue-400/10",
              Chemistry:
                "text-orange-400 border border-orange-400/30 bg-orange-400/10",
              Math:
                "text-green-400 border border-green-400/30 bg-green-400/10",
            };

            return (
              <div
                key={test.id}
                className="grid grid-cols-5 items-center px-10 py-3 border-t border-[#2a2a2a]"
              >
                <div>
                  <p className="text-xl">{test.name}</p>
                  <p className="text-xs text-gray-500">
                    {test.questions} Questions • {test.duration} mins
                  </p>
                </div>

                <span
                  className={`text-xl px-3 py-1 rounded-full w-fit ${badgeStyles[test.subject]}`}
                >
                  {test.subject}
                </span>

                <span className="text-xl text-gray-400">
                  {test.date}
                </span>

                <div className="w-40">
                  <div className="h-2 bg-background/20 rounded-full">
                    <div
                      className={`h-2 rounded-full ${scoreColor}`}
                      style={{ width: `${test.score}%` }}
                    />
                  </div>
                  <p className="text-xs mt-1">
                    {test.score}%
                  </p>
                </div>

                <div>
                  <button className="text-primary hover:underline">
                    Analyze →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </Card>
    </div>
  );
}
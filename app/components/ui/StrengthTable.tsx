"use client";

type TopicGroup = {
  label: string;
  topics: string[];
};

const data: TopicGroup[] = [
  {
    label: "Very Weak",
    topics: ["Modern History", "Structural Eng.", "Linguistics"],
  },
  {
    label: "Weak",
    topics: ["Macroeconomics", "Thermodynamics", "Calculus III"],
  },
  {
    label: "Strong",
    topics: ["Organic Chemistry", "Genetics", "Geopolitics"],
  },
  {
    label: "Very Strong",
    topics: ["Quantum Physics", "Computer Logic", "Set Theory"],
  },
];

const getHeaderStyle = (label: string) => {
  switch (label) {
    case "Very Weak":
      return "text-red-400 bg-red-500/10";
    case "Weak":
      return "text-orange-400 bg-orange-500/10";
    case "Strong":
      return "text-green-400 bg-green-500/10";
    case "Very Strong":
      return "text-emerald-400 bg-emerald-500/10";
    default:
      return "";
  }
};

export default function StrengthTable() {
  return (
    <div className="w-full bg-foreground rounded-xl overflow-hidden border border-text/30">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((group, index) => (
          <div
            key={index}
            className="border-b sm:border-b-0 sm:border-r border-text/20 last:border-none"
          >

            <div
              className={`p-3 text-sm text-center sm:text-base lg:text-xl font-semibold ${getHeaderStyle(
                group.label
              )}`}
            >
              {group.label}
            </div>

           <div className="p-4 text-center space-y-2 text-sm sm:text-base lg:text-lg">
              {group.topics.map((topic, i) => (
                <div key={i} className="text-text">
                  {topic}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
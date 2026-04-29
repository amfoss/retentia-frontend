import Sidebar from "../Sidebar";
import StrengthTable from "../ui/StrengthTable";
import TopicAnalysis from "../ui/TopicAnalysis";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 px-8 py-6">
        <h1 className="text-4xl text-text font-semibold mb-10 mt-10">
          Topic Analysis
        </h1>

        <div className="space-y-6">
          <StrengthTable />
          <TopicAnalysis />
        </div>
      </main>
    </div>
  );
}
import Sidebar from "../components/Sidebar";
import StrengthTable from "../components/ui/StrengthTable";
import VeryWeakConcepts from "../components/ui/VeryWeakConcepts";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

    <main className="flex-1">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-10">
        Topic Analysis
    </h1>
    
        <div className="space-y-6 sm:space-y-10">
          <StrengthTable />
          <VeryWeakConcepts />
        </div>
        </div>
      </main>
    </div>
  );
}
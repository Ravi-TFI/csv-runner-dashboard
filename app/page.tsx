import { Dashboard } from "@/components/dashboard";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 px-4 sm:px-8 border-b">
        <h1 className="text-xl font-semibold">CSV Runner</h1>
      </header>

      <main className="flex-grow container mx-auto py-8 px-4 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight">Runner Dashboard</h2>
          <p className="text-lg text-muted-foreground mt-2">
            Upload a CSV to instantly visualize your running data.
          </p>
        </div>
        <Dashboard />
      </main>
    </div>
  );
}
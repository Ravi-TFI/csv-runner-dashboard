'use client';
import { useState, useMemo } from 'react';
import { RunData } from '@/lib/types';
import { parseCsvFile } from '@/lib/csvParser';
import { calculateMetrics } from '@/lib/metrics';
import { FileUploader } from './file-uploader';
import { StatCard } from './stat-card';
import { RunnerChart } from './runner-chart';
import { DataTable } from './data-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Terminal } from 'lucide-react';

export function Dashboard() {
  const [runData, setRunData] = useState<RunData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<string>('overall');

  const handleFileProcess = async (file: File) => {
    setError(null);
    const { data, error } = await parseCsvFile(file);
    if (error) {
      setError(error);
      setRunData([]);
    } else if (data.length === 0) {
        setError("CSV file is empty or contains no valid data rows.");
        setRunData([]);
    } else {
      setRunData(data);
      setSelectedPerson('overall');
    }
  };

  const uniqueRunners = useMemo(() => ['overall', ...new Set(runData.map(d => d.person))], [runData]);
  const filteredData = useMemo(() => {
    if (selectedPerson === 'overall') return runData;
    return runData.filter(d => d.person === selectedPerson);
  }, [runData, selectedPerson]);

  const metrics = useMemo(() => calculateMetrics(filteredData), [filteredData]);

  if (runData.length === 0) {
    return (
      <div className="w-full max-w-lg mx-auto">
        <FileUploader onProcess={handleFileProcess} error={error} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FileUploader onProcess={handleFileProcess} error={error} />
      {runData.length > 0 && (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
            <Select value={selectedPerson} onValueChange={setSelectedPerson}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select a view" />
              </SelectTrigger>
              <SelectContent>
                {uniqueRunners.map(runner => (
                  <SelectItem key={runner} value={runner}>
                    {runner === 'overall' ? 'Overall View' : runner}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Miles" value={metrics.totalMiles} />
            <StatCard title="Average Miles" value={metrics.average} />
            <StatCard title="Max Miles (Single Run)" value={metrics.max} />
            <StatCard title="Total Runs" value={metrics.totalRuns} />
          </div>
          <Card>
            <CardHeader><CardTitle>Miles Run Over Time</CardTitle></CardHeader>
            <CardContent className="pl-2">
              <RunnerChart data={filteredData} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Raw Data</CardTitle></CardHeader>
            <CardContent>
              <DataTable data={filteredData} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
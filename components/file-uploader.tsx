'use client';
import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from './ui/input';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { UploadCloud, Terminal } from 'lucide-react';

interface FileUploaderProps {
  onProcess: (file: File) => void;
  error: string | null;
}

export function FileUploader({ onProcess, error }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement| null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      onProcess(files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      onProcess(files[0]);
      if (fileInputRef.current) {
        const dt = new DataTransfer();
        for (let i = 0; i < files.length; i++) dt.items.add(files[i]);
        fileInputRef.current.files = dt.files;
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Your CSV</CardTitle>
        <CardDescription>Select a CSV file with columns: date, person, miles run.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-sm text-gray-600">
            {file ? file.name : 'Drag & drop your file here, or click to select a file'}
          </p>
          <Input 
            ref={fileInputRef}
            type="file" 
            accept=".csv"
            className="hidden" 
            onChange={handleFileChange} 
          />
        </div>
        {error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Processing Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
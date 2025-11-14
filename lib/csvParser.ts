import Papa from 'papaparse';
import { RunData } from './types';

const REQUIRED_HEADERS = ['date', 'person', 'miles run'];

export const parseCsvFile = (file: File): Promise<{ data: RunData[]; error: string | null }> => {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: header => header.toLowerCase().trim(),
      complete: (results) => {
        const headers = results.meta.fields;

        if (!headers || !REQUIRED_HEADERS.every(h => headers.includes(h))) {
          resolve({ data: [], error: `Invalid headers. Required: ${REQUIRED_HEADERS.join(', ')}` });
          return;
        }

        const parsedData: RunData[] = [];
        const validationErrors: string[] = [];

        results.data.forEach((row: any, index: number) => {
          const date = new Date(row['date']);
          const miles = parseFloat(row['miles run']);

          if (isNaN(date.getTime())) {
            validationErrors.push(`Row ${index + 2}: Invalid date format.`);
            return;
          }
          if (isNaN(miles) || miles < 0) {
            validationErrors.push(`Row ${index + 2}: 'miles run' must be a positive number.`);
            return;
          }
          if (!row['person'] || row['person'].trim() === '') {
            validationErrors.push(`Row ${index + 2}: 'person' cannot be empty.`);
            return;
          }
          
          parsedData.push({ date, miles, person: row['person'].trim() });
        });

        if (validationErrors.length > 0) {
            resolve({ data: [], error: validationErrors.join(' ') });
            return;
        }
        
        parsedData.sort((a, b) => a.date.getTime() - b.date.getTime());

        resolve({ data: parsedData, error: null });
      },
      error: (error: Error) => {
        resolve({ data: [], error: `Parsing error: ${error.message}` });
      },
    });
  });
};
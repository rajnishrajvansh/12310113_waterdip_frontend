// src/utils/fetchdata.ts
import { parse } from 'papaparse'; // Ensure you have this library installed
import { BookingData } from '../types/BookingData'; // Corrected to import the type

export const fetchData = async (): Promise<BookingData[]> => {
  try {
    // Fetch CSV file from the public folder (adjust the path as needed)
    const response = await fetch(`${process.env.PUBLIC_URL}/hotel.csv`);
    const text = await response.text();

    // Log the raw text data fetched from the CSV file
    console.log('Raw CSV Data:', text);

    // Parse CSV data
    const { data } = parse(text, {
      header: true, // Use the first row as headers
      skipEmptyLines: true,
    });

    // Log parsed results
    console.log('Parsed Results:', data);

    // Map parsed data to BookingData format
    return data.map((row: any) => ({
      adults: Number(row.adults) || 0, // Ensure proper number parsing
      children: Number(row.children) || 0,
      babies: Number(row.babies) || 0,
      arrival_date_year: Number(row.arrival_date_year) || 0,
      arrival_date_month: row.arrival_date_month || '', // Ensure string
      arrival_date_day_of_month: Number(row.arrival_date_day_of_month) || 0,
      country: row.country || '', // Ensure string
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

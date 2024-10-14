
import React from 'react';
import { render, screen } from '@testing-library/react';
import AdultVisitorsSparkline from '../components/AdultVisitorsSparkline';

test('renders Adult Visitors Sparkline with data', () => {
  const mockData = [
    { date: '2024-01-01', adults: 5 },
    { date: '2024-01-02', adults: 7 },
    { date: '2024-01-03', adults: 10 },
  ];
  const totalAdults = 22; 

  render(<AdultVisitorsSparkline data={mockData} totalAdults={totalAdults} />);

  
  const titleElement = screen.getByText(/Adult Visitors/i);
  expect(titleElement).toBeInTheDocument();


  const totalAdultsElement = screen.getByText(/22/i);
  expect(totalAdultsElement).toBeInTheDocument();
});

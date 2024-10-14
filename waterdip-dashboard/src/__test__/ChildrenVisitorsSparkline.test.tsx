
import React from 'react';
import { render, screen } from '@testing-library/react';
import ChildrenVisitorsSparkline from '../components/ChildrenVisitorsSparkline';

test('renders Children Visitors Sparkline with data', () => {
  const mockData = [
    { date: '2024-01-01', children: 3 },
    { date: '2024-01-02', children: 6 },
    { date: '2024-01-03', children: 4 },
  ];
  const totalChildren = 13; 

  render(<ChildrenVisitorsSparkline data={mockData} totalChildren={totalChildren} />);

  
  const titleElement = screen.getByText(/Children Visitors/i);
  expect(titleElement).toBeInTheDocument();

 
  const totalChildrenElement = screen.getByText(/13/i);
  expect(totalChildrenElement).toBeInTheDocument();
});

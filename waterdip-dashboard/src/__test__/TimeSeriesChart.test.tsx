import React from 'react';
import { render, screen } from '@testing-library/react';
import TimeSeriesChart from '../components/TimeSeriesChart';

test('renders time series chart title', () => {
  render(<TimeSeriesChart data={[]} />);

  const chartTitle = screen.getByText('Time Series: Number of Visitors per Day');
  expect(chartTitle).toBeInTheDocument();
});

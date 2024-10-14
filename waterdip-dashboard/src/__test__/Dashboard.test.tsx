
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';

test('renders Dashboard and date pickers', () => {
  render(<Dashboard />);

  const startDatePicker = screen.getByLabelText(/Start Date/i);
  const endDatePicker = screen.getByLabelText(/End Date/i);

  expect(startDatePicker).toBeInTheDocument();
  expect(endDatePicker).toBeInTheDocument();

  // Simulate changing dates
  fireEvent.change(startDatePicker, { target: { value: '2015-07-01' } });
  fireEvent.change(endDatePicker, { target: { value: '2015-08-09' } });

 
});

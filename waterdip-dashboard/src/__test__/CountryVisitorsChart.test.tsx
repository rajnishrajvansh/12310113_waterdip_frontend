
import React from 'react';
import { render } from '@testing-library/react';
import CountryVisitorsChart from '../components/CountryVisitorsChart';

const countryData = [
  { country: 'USA', visitors: 100 },
  { country: 'UK', visitors: 50 },
];

test('matches snapshot for CountryVisitorsChart', () => {
  const { asFragment } = render(<CountryVisitorsChart data={countryData} />);
 
  expect(asFragment()).toMatchSnapshot();
});

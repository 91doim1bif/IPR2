// __test__/Favorite.test.tsx

import React from 'react';
import { render } from '@testing-library/react';
import Favorite from '../components/Home/Favorite';

describe('Favorite component', () => {
  it('renders without crashing', () => {
    render(<Favorite />);
  });

  // Add more test cases as needed
});

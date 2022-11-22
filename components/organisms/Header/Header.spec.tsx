import React from 'react';
import { render } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('should render Header', () => {
    const { getByText, getByAltText } = render(<Header />);

    expect(getByAltText('Fund that Flip logo')).toBeVisible();
    expect(getByText(/Home/)).toBeVisible();
    expect(getByText(/Add/)).toBeVisible();
  });
});

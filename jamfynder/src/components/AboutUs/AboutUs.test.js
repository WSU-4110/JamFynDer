import { render, screen } from '@testing-library/react';
import AboutUs from './AboutUs.js';

describe('About Us', () => {

  test('greeting appears on page', () => {
    render(<AboutUs/>);
    const description = screen.getByText("Hello,Welcome to JamFynDer!");
    expect(description).toBeInTheDocument();
  });
  
  
  
})
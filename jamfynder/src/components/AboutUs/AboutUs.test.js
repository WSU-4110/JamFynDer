import { render, screen } from '@testing-library/react';
import AboutUs from './AboutUs.js';

describe('AboutUs', () => {
  
  test('should verify that first part of description is on page', () => {
    render(<AboutUs/>);
    const description = screen.getByText("Hello,Welcome to JamFynDer!");
    expect(description).toBeInTheDocument();
  });
  
  test('should verify that second part of description is on page', () => {
    render(<AboutUs/>);
    const description = screen.getByText("Want to discover new music and update your playlists to the latest music trends? Then you have come to the right place!");
    expect(description).toBeInTheDocument();
  });

  test('should verify that third part of description is on page', () => {
    render(<AboutUs/>);
    const description = screen.getByText("Our mission is to ensure that our listners are given the best jamming experience possible all the while being exposed to the latest hits based on their musical taste!");
    expect(description).toBeInTheDocument();
  });
  
})
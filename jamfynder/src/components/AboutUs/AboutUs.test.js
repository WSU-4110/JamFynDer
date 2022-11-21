import { render, screen } from '@testing-library/react';
import AboutUs from './AboutUs.js';

describe('About Us', () => {

  test('greeting appears on page', () => {
    render(<AboutUs/>);
    const description = screen.getByText("Hello,Welcome to JamFynDer!");
    expect(description).toBeInTheDocument();
  });

  test('Attention getter in description appears on page', () => {
    render(<AboutUs/>);
    const description = screen.getByText("Want to discover new music and update your playlists to the latest music trends? Then you have come to the right place!");
    expect(description).toBeInTheDocument();
  });

  test('mission statement in description appears on page', () => {
    render(<AboutUs/>);
    const description = screen.getByText("Our mission is to ensure that our listners are given the best jamming experience possible all the while being exposed to the latest hits based on their musical taste!");
    expect(description).toBeInTheDocument();
  });
  
  
})
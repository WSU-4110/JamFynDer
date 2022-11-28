import { render, screen } from '@testing-library/react';
import React from "react";
import AboutUs from './AboutUs.js';

describe('About Us', () => {

  test('Title shows up on page', () => {
    render(<AboutUs/>);
    const description = screen.getByText("About Us");
    expect(description).toBeInTheDocument();
  });

  test('App greeting shows on page', () => {
    render(<AboutUs/>);
    const description = screen.getByText("Hello,Welcome to JamFynDer!");
    expect(description).toBeInTheDocument();
  });

  test('Description of website appears', () => {
    render(<AboutUs/>);
    const description = screen.getByText("Want to discover new music and update your playlists to the latest music trends? Then you have come to the right place!");
    expect(description).toBeInTheDocument();
  });

  })

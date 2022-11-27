import { render, screen } from '@testing-library/react';
import React from 'react';
import Player from './Player.js';

describe('Player page', () => {

  test('User account name appears on page', () => {
    render(<Player/>)
    const description = screen.getByText("Optimus Prime");
    expect(description).toBeInTheDocument();
  });


  





})
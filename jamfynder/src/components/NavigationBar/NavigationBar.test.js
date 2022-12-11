import { render, screen } from '@testing-library/react';
import React from 'react';
import NavigationBar from './NavigationBar.js';

describe('Navigation Page', () => {

  test('About us appears on page', () => {
    render(<NavigationBar/>)
    const description = screen.getByText("About Us");
    expect(description).toBeInTheDocument();
  });

  test('Login appears on page', () => {
    render(<NavigationBar/>)
    const description = screen.getByText("Login");
    expect(description).toBeInTheDocument();
  });

  test('Test button appears on page', () => {
    render(<NavigationBar/>)
    const description = screen.getByText("Test");
    expect(description).toBeInTheDocument();
  });

 


  





})
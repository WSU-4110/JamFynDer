import { render, screen } from '@testing-library/react';
import React from 'react';
import SettingsPage from './SettingsPage.js';
import NavigationBar from './SettingsPage.js';

describe('Settings Page', () => {

 

  test('manage account appears on page', () => {
    render(<SettingsPage/>)
    const description = screen.getByText("Manage Account");
    expect(description).toBeInTheDocument();
  });

  test('sign out appears on page', () => {
    render(<SettingsPage/>)
    const description = screen.getByText("Sign Out");
    expect(description).toBeInTheDocument();
  });

  test('delete account button appears on page', () => {
    render(<SettingsPage/>)
    const description = screen.getByText("Delete Account");
    expect(description).toBeInTheDocument();
  });

 


  





})
import { render, screen, fireEvent } from '@testing-library/react';
import NavigationBar from './NavigationBar.js';
import { MemoryRouter, Route, Routes, BrowserRouter as Router } from "react-router-dom";

// test for nav bar
describe('Nav Bar', () => {
  describe('Buttons appear', () => {
    test('should verify that Home button on the navigation bar appears', () => {
      render(
        <Router>
          <NavigationBar />
        </Router>
      );
      const HomeButton = screen.getByText("Home");
      expect(HomeButton).toBeInTheDocument();
    });
  })
})
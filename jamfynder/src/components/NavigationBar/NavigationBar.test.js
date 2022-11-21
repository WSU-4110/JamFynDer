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
  
  describe('Buttons Work', () => {
    test("Home link", () => {
      render(
        <Router>
          <NavigationBar />
      </Router>
      );
      const homeLink = screen.getAllByRole("link");

      expect(homeLink[0].textContent).toEqual("Home");
      expect(homeLink[0].href).toContain("/welcome");
    });
  })
})
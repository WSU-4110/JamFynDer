import { render, screen, fireEvent } from '@testing-library/react';
import NavigationBar from './NavigationBar.js';
import { MemoryRouter, Route, Routes, BrowserRouter as Router } from "react-router-dom";


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
    
    test('should verify that Login button on the navigation bar appears', () => {
      render(
        <Router>
          <NavigationBar />
        </Router>
      );
      const LoginButton = screen.getByText("Login");
      expect(LoginButton).toBeInTheDocument();
    });
  
    test('should verify that About Us button on the navigation bar appears', () => {
      render(
        <Router>
          <NavigationBar />
        </Router>
      );
      const AboutUsButton = screen.getByText("About Us");
      expect(AboutUsButton).toBeInTheDocument();
    });
  
    test('should verify that Settings button on the navigation bar appears', () => {
      render(
        <Router>
          <NavigationBar />
        </Router>
      );
      const SettingsButton = screen.getByText("Settings");
      expect(SettingsButton).toBeInTheDocument();
    });
  
    test('should verify that Tutorial button on the navigation bar appears', () => {
      render(
        <Router>
          <NavigationBar />
        </Router>
      );
      const TutorialButton = screen.getByText("Settings");
      expect(TutorialButton).toBeInTheDocument();
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

    test("Login link", () => {
      render(
        <Router>
          <NavigationBar />
      </Router>
      );
      const homeLink = screen.getAllByRole("link");

      expect(homeLink[1].textContent).toEqual("Login");
      expect(homeLink[1].href).toContain("/");
    });

    test("About link", () => {
      render(
        <Router>
          <NavigationBar />
      </Router>
      );
      const homeLink = screen.getAllByRole("link");

      expect(homeLink[2].textContent).toEqual("About Us");
      expect(homeLink[2].href).toContain("/about_us");
    });

    test("Settings link", () => {
      render(
        <Router>
          <NavigationBar />
      </Router>
      );
      const homeLink = screen.getAllByRole("link");

      expect(homeLink[3].textContent).toEqual("Settings");
      expect(homeLink[3].href).toContain("/SettingsPage");
    });

    test("Tutorial link", () => {
      render(
        <Router>
          <NavigationBar />
      </Router>
      );
      const homeLink = screen.getAllByRole("link");

      expect(homeLink[4].textContent).toEqual("Tutorial");
      expect(homeLink[4].href).toContain("/tutorial");
    });
  })
})
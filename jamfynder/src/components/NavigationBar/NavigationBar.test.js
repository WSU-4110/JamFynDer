import { render, screen, fireEvent } from '@testing-library/react';
import NavigationBar from './NavigationBar.js';
import { BrowserRouter as Router } from 'react-router-dom';


describe('AboutUs', () => {
  
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
    

  })
})
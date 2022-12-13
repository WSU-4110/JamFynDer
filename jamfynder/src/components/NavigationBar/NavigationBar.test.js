import { render, screen } from "@testing-library/react";
import React from "react";
import NavigationBar from "./NavigationBar.js";

describe("Navigation Page", () => {
  test("About us appears on page", () => {
    render(<NavigationBar />);
    const description = screen.getByText("About Us");
    expect(description).toBeInTheDocument();
  });

  test("Login appears on page", () => {
    render(<NavigationBar />);
    const description = screen.getByText("Login");
    expect(description).toBeInTheDocument();
  });

  test("Test button appears on page", () => {
    render(<NavigationBar />);
    const description = screen.getByText("Test");
    expect(description).toBeInTheDocument();
  });

  // test for nav bar
  describe("Nav Bar", () => {
    describe("Buttons appear", () => {
      test("should verify that Home button on the navigation bar appears", () => {
        render(
          <Router>
            <NavigationBar />
          </Router>
        );
        const HomeButton = screen.getByText("Home");
        expect(HomeButton).toBeInTheDocument();
      });
    });

    describe("Buttons Work", () => {
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
    });
  });
});

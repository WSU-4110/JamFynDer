import { render, screen } from "@testing-library/react";
import React from "react";
import TEST from "./TEST.js";

describe("TEST page", () => {
  test("Title appears on the page", () => {
    render(<TEST />);
    const description = screen.getByText("Spotify React");
    expect(description).toBeInTheDocument();
  });

  test("Login button appears on page", () => {
    render(<TEST />);
    const description = screen.getByText("Login to Spotify");
    expect(description).toBeInTheDocument();
  });

  test("Login prompt appears on page", () => {
    render(<TEST />);
    const description = screen.getByText("Please login");
    expect(description).toBeInTheDocument();
  });
});

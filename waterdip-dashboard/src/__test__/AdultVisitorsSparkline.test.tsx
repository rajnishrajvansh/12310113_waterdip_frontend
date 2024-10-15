import React from "react";
import { render, screen } from "@testing-library/react";
import AdultVisitorsSparkline from "../components/AdultVisitorsSparkline";

describe("AdultVisitorsSparkline", () => {
  it("renders the sparkline chart with the correct title", () => {
    // Mock data for testing
    const mockData = [
      { date: "2024-01-01", adults: 5 },
      { date: "2024-01-02", adults: 10 },
      { date: "2024-01-03", adults: 7 },
    ];

    // Render the component without the totalAdults prop
    render(<AdultVisitorsSparkline data={mockData} />);

    // Check if the title contains the total adults value
    const titleElement = screen.getByText(/Total Adults/i);
    expect(titleElement).toBeInTheDocument();

    // Optionally, you can check for the total adults displayed in the title
    const totalAdults = mockData.reduce((acc, item) => acc + item.adults, 0);
    expect(screen.getByText(totalAdults.toString())).toBeInTheDocument();
  });
});

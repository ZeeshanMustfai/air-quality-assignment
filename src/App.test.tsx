/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent } from "@testing-library/react";
import axios from "axios";
import AirQualityAssessment from "./components/AirQualityAssessment";
jest.mock("axios");

describe("AirQualityAssessment", () => {
  it("should display the air quality data for the two cities", async () => {
    // Mock the API response
    // axios.get.mockResolvedValueOnce({
    //   data: {
    //     results: [
    //       {
    //         measurements: [
    //           {
    //             value: "10",
    //             unit: "µg/m³",
    //             aqi: "50",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // });
    // axios.get.mockResolvedValueOnce({
    //   data: {
    //     results: [
    //       {
    //         measurements: [
    //           {
    //             value: "20",
    //             unit: "µg/m³",
    //             aqi: "70",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // });

    // Render the component
    const { getByPlaceholderText, getByText } = render(
      <AirQualityAssessment />
    );

    // Fill in the form fields and submit the form
    const city1Input = getByPlaceholderText("Enter city name");
    fireEvent.change(city1Input, { target: { value: "New York" } });
    const city2Input = getByPlaceholderText("Enter city name");
    fireEvent.change(city2Input, { target: { value: "Los Angeles" } });
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);

    expect(getByText("Air Quality: 10 µg/m³")).toBeInTheDocument();
    expect(getByText("AQI: 50")).toBeInTheDocument();
    expect(getByText("Air Quality: 20 µg/m³")).toBeInTheDocument();
    expect(getByText("AQI: 70")).toBeInTheDocument();
  });

  it("should display an error message if the API call fails", async () => {
    // axios.get.mockRejectedValueOnce(new Error("Failed to fetch data"));
    const { getByPlaceholderText, getByText } = render(
      <AirQualityAssessment />
    );

    // Fill in the form fields and submit the form
    const city1Input = getByPlaceholderText("Enter city name");
    fireEvent.change(city1Input, { target: { value: "New York" } });
    const city2Input = getByPlaceholderText("Enter city name");
    fireEvent.change(city2Input, { target: { value: "Los Angeles" } });
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import { AuthProvider } from "../components/Authentifcation/AuthProvider";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

jest.mock("axios");

describe("AuthProvider", () => {
  test("renders without crashing", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <div>Test Child</div>
        </AuthProvider>
      </BrowserRouter>
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  test("logs in user on successful login", async () => {
    const userData = {
      _id: "1",
      name: "Test User",
      email: "test@example.com",
      image: "test.jpg",
    };
    const token = "test-token";

    axios.post.mockResolvedValueOnce({
      data: { token, user: userData },
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <div>Test Child</div>
        </AuthProvider>
      </BrowserRouter>
    );

    userEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith("/api/signin", {
        email: "test@example.com",
        password: "password",
      });
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Test Child")).toBeInTheDocument();
    });
  });

  // Add more test cases for register, logout, etc.
});

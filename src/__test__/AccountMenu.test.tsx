import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import { useAuth } from "../Authentifcation/AuthProvider";
import { createMemoryHistory } from "history";

// Mock the AuthProvider
jest.mock("../Authentifcation/AuthProvider");

const mockLogout = jest.fn();
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
mockUseAuth.mockReturnValue({
  user: { name: "Test User" },
  logout: mockLogout,
});

describe("AccountMenu", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when visible", () => {
    render(
      <MemoryRouter>
        <AccountMenu visible={true} />
      </MemoryRouter>
    );

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("Switch Profiles")).toBeInTheDocument();
    expect(screen.getByText("Log out")).toBeInTheDocument();
  });

  it("does not render when not visible", () => {
    const { container } = render(
      <MemoryRouter>
        <AccountMenu visible={false} />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeNull();
  });

  it("calls logout and navigates to /auth on logout button click", async () => {
    const history = createMemoryHistory();
    render(
      <MemoryRouter history={history}>
        <AccountMenu visible={true} />
      </MemoryRouter>
    );

    const logoutButton = screen.getByText("Log out");
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
    expect(history.location.pathname).toBe("/auth");
  });

  it("navigates to /profiles on switch profiles button click", () => {
    const history = createMemoryHistory();
    render(
      <MemoryRouter history={history}>
        <AccountMenu visible={true} />
      </MemoryRouter>
    );

    const switchProfilesButton = screen.getByText("Switch Profiles");
    fireEvent.click(switchProfilesButton);

    expect(history.location.pathname).toBe("/profiles");
  });
});

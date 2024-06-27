// Input.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../components/Authentifcation/Input";

describe("Input component", () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    id: "test-input",
    onChange: mockOnChange,
    value: "",
    label: "Test Label",
    type: "text"
  };

  beforeEach(() => {
    render(<Input {...defaultProps} />);
  });

  it("renders the input element correctly", () => {
    const inputElement = screen.getByPlaceholderText(defaultProps.label);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass("block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer");
  });

  it("renders the label element correctly", () => {
    const inputElement = screen.getByPlaceholderText(defaultProps.label);
    const inputWrapper = inputElement.closest('div');
    expect(inputWrapper).not.toBeNull();
    const labelElement = inputWrapper?.querySelector('label');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute('for', defaultProps.id);
    expect(labelElement).toHaveClass("absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3");
  });

  it("sets the correct initial value", () => {
    const inputElement = screen.getByPlaceholderText(defaultProps.label);
    expect(inputElement).toHaveValue(defaultProps.value);
  });

  it("calls onChange handler when the input value changes", () => {
    const inputElement = screen.getByPlaceholderText(defaultProps.label);
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("handles focus and blur correctly", () => {
    const inputElement = screen.getByPlaceholderText(defaultProps.label);
    fireEvent.focus(inputElement);
    expect(document.activeElement).toBe(inputElement);
    fireEvent.blur(inputElement);
    expect(document.activeElement).not.toBe(inputElement);
  });

  it("applies correct classes on focus", () => {
    const inputElement = screen.getByPlaceholderText(defaultProps.label);
    fireEvent.focus(inputElement);
    const inputWrapper = inputElement.closest('div');
    expect(inputWrapper).not.toBeNull();
    const labelElement = inputWrapper?.querySelector('label');
    expect(labelElement).toHaveClass("peer-focus:-translate-y-3");
  });
});

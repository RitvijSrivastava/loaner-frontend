import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateNewLoan from "./CreateNewLoan";

const mockData = {
  loading: false,
  user: { _id: 1 },
  loans: null,
  status: "",
  error: "",
};

describe("Create new loan form", () => {
  it("should render the basic fields", () => {
    render(<CreateNewLoan data={mockData} />);

    expect(
      screen.getByRole("heading", { name: "Create New Loan" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Loan Applicant Name" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Address" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "E-mail" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Contact Number" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Loan Amount (in INR)" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "EMI (in INR)" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Start Date" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Expiry Date" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Type of Loan" })
    ).toBeInTheDocument();

    expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /address/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /e-mail/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /contact number/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("spinbutton", { name: /loan amount/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: /emi/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /^create new loan$/i })
    ).toBeInTheDocument();
  });
});

it("should validate form fields and fail due to incomplete form", () => {
  const mockCreateNewLoan = jest.fn(); // Mock function
  render(<CreateNewLoan data={mockData} createNewLoan={mockCreateNewLoan} />);

  fireEvent.input(screen.getByRole("textbox", { name: /name/i }), {
    target: {
      value: "Johnny",
    },
  });

  fireEvent.submit(screen.getByRole("button", { name: /^create new loan$/i }));
  expect(mockCreateNewLoan).not.toBeCalled();
});

it("should validate form fields and fail due to incorrect information", () => {
  const mockCreateNewLoan = jest.fn();
  render(<CreateNewLoan data={mockData} createNewLoan={mockCreateNewLoan} />);

  fireEvent.input(screen.getByRole("textbox", { name: /name/i }), {
    target: {
      value: "John Doe",
    },
  });

  fireEvent.input(screen.getByRole("textbox", { name: /address/i }), {
    target: {
      value: "Random Address",
    },
  });

  fireEvent.input(screen.getByRole("textbox", { name: /e-mail/i }), {
    target: {
      value: "test", // Invalid Email address
    },
  });

  fireEvent.input(screen.getByRole("textbox", { name: /contact number/i }), {
    target: {
      value: 9876543210,
    },
  });

  fireEvent.input(screen.getByRole("spinbutton", { name: /loan amount/i }), {
    target: {
      value: 98765,
    },
  });

  fireEvent.input(screen.getByRole("spinbutton", { name: /emi/i }), {
    target: {
      value: 123,
    },
  });

  fireEvent.input(screen.getByPlaceholderText("Select start date"), {
    target: {
      value: new Date(),
    },
  });

  fireEvent.input(screen.getByPlaceholderText("Select expiry date"), {
    target: {
      value: new Date(),
    },
  });

  fireEvent.click(screen.getByText("FIXED"));

  fireEvent.submit(screen.getByRole("button", { name: /^create new loan$/i }));
  expect(mockCreateNewLoan).not.toBeCalled();
});

it("should validate form fields and pass", async () => {
  const mockCreateNewLoan = jest.fn();
  render(<CreateNewLoan data={mockData} createNewLoan={mockCreateNewLoan} />);

  fireEvent.input(screen.getByRole("textbox", { name: /name/i }), {
    target: {
      value: "John",
    },
  });

  fireEvent.input(screen.getByRole("textbox", { name: /address/i }), {
    target: {
      value: "Random Address",
    },
  });

  fireEvent.input(screen.getByRole("textbox", { name: /e-mail/i }), {
    target: {
      value: "test@test.com", // Invalid Email address
    },
  });

  fireEvent.input(screen.getByRole("textbox", { name: /contact number/i }), {
    target: {
      value: 9876543210,
    },
  });

  fireEvent.input(screen.getByRole("spinbutton", { name: /loan amount/i }), {
    target: {
      value: 98765,
    },
  });

  fireEvent.input(screen.getByRole("spinbutton", { name: /emi/i }), {
    target: {
      value: 123,
    },
  });

  fireEvent.input(screen.getByPlaceholderText("Select start date"), {
    target: {
      value: "2017/05/26",
    },
  });

  fireEvent.input(screen.getByPlaceholderText("Select expiry date"), {
    target: {
      value: "2017/05/26",
    },
  });

  fireEvent.click(screen.getByRole("radio", { name: /FIXED/i }));

  fireEvent.submit(screen.getByRole("button", { name: /^create new loan$/i }));

  await waitFor(() =>
    expect(mockCreateNewLoan).toHaveBeenCalledWith({
      user: 1,
      name: "John",
      address: "Random Address",
      email: "test@test.com",
      contactNumber: "9876543210",
      loanAmount: "98765",
      emi: "123",
      startDate: "2017-05-26",
      expiryDate: "2017-05-26",
      type: "FIXED",
    })
  );
});

import { render } from "@testing-library/react";
import { screen } from '@testing-library/dom';
import App from "./app/App.js";

describe("The App.js home page", () => {
  beforeEach(() => {
    render(<App />);
  });
  it("renders a 'Topics' link", () => {
    const topicLink = screen.getByText(/Topics/i);
    expect(topicLink).toBeInTheDocument();
  });
  it("renders a 'Quizzes' link", () => {
    const quizLink = screen.getByText(/Quizzes/i);
    expect(quizLink).toBeInTheDocument();
  });
  it("renders a 'New Quiz' link", () => {
    const newQuizLink = screen.getByText(/New Quiz/i);
    expect(newQuizLink).toBeInTheDocument();
  });
});



import { useState } from "react";

const LessonPage = () => {
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);

  const checkAnswer = () => {
    setChecked(true);
  };

  const options = [
    { letter: "A", text: "HyperText Markup Language" },
    { letter: "B", text: "HighText Machine Language" },
    { letter: "C", text: "HyperTool Making Language" },
    { letter: "D", text: "Home Tool Markup Language" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFAF3] p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold text-pink-600">
          FAIDAT CODE ACADEMY / HTML FUNDAMENTALS
        </p>

        <h1 className="mt-4 text-3xl font-bold text-[#42213D]">
          Lesson 1: Introduction to HTML 🌐
        </h1>

        <p className="mt-4 text-lg text-[#65545F]">
          Welcome to your first HTML lesson! Today, you will discover what HTML
          is and why it is important in building websites.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-[#42213D]">
          What is HTML?
        </h2>

        <p className="mt-3 text-[#65545F]">
          HTML stands for HyperText Markup Language. It defines the structure
          and content of a webpage, such as headings, paragraphs, images, and
          links.
        </p>

        <h3 className="mt-6 text-xl font-bold text-[#42213D]">
          Your First HTML Example
        </h3>

        <div className="mt-4 rounded-xl bg-[#42213D] p-5">
          <p className="text-sm text-pink-300">HTML</p>
          <pre className="mt-3 overflow-x-auto text-white">
            <code>{"<h1>Welcome to my website!</h1>"}</code>
          </pre>
        </div>

        <h4 className="mt-4 font-bold text-[#42213D]">
          Understanding the code
        </h4>

        <p className="mt-3 text-[#65545F]">
          The opening tag,{" "}
          <code className="font-semibold text-pink-600">
            {"<h1>"}
          </code>
          , tells the browser that a main heading begins here.
        </p>

        <p className="mt-3 text-[#65545F]">
          The content is the text between the tags. In our example,{" "}
          <span className="font-semibold text-pink-600">
            Welcome to my website!
          </span>{" "}
          is the content displayed as the heading.
        </p>

        <p className="mt-3 text-[#65545F]">
          The closing tag,{" "}
          <code className="font-semibold text-pink-600">
            {"</h1>"}
          </code>
          , tells the browser that the heading element has ended.
        </p>

        {/* Practice Question */}
        <div className="mt-10 rounded-2xl border border-pink-200 bg-white p-6">
          <p className="text-sm font-semibold text-pink-600">
            LESSON 1 · PRACTICE
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#42213D]">
            Test Your Knowledge 🌱
          </h2>

          <p className="mt-4 text-[#65545F]">
            What does HTML stand for?
          </p>

          <div className="mt-4 flex flex-col gap-3">
            {options.map((option) => (
              <button
                key={option.letter}
                type="button"
                onClick={() => {
                  setAnswer(option.letter);
                  setChecked(false);
                }}
                className={`rounded-xl border p-3 text-left transition-colors ${
                  answer === option.letter
                    ? "border-pink-600 bg-pink-100 text-pink-900"
                    : "border-pink-200 bg-white text-[#65545F] hover:bg-pink-50"
                }`}
              >
                {option.letter}. {option.text}
                {answer === option.letter && " ✓"}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={checkAnswer}
            disabled={!answer}
            className="mt-5 rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Check Answer
          </button>

          {checked && (
            <div
              className={`mt-4 rounded-xl p-4 ${
                answer === "A"
                  ? "bg-green-50 text-green-800"
                  : "bg-pink-50 text-pink-800"
              }`}
              role="status"
            >
              {answer === "A" ? (
                <>
                  <p className="font-bold">Correct! 🎉</p>
                  <p className="mt-1">
                    HTML stands for HyperText Markup Language. It helps
                    structure the content of webpages.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-bold">Not quite! 💗</p>
                  <p className="mt-1">
                    Remember the meaning of HTML from the lesson. Try another
                    option!
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPage;

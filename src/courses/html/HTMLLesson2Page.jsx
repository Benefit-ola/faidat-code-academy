
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const COMPLETED_KEY = "faidat-html-completed-lessons";

const HTMLLesson2Page = () => {
  const navigate = useNavigate();

  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const [completed, setCompleted] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(COMPLETED_KEY) || "[]"
      );

      return Array.isArray(saved) && saved.includes(2);
    } catch {
      return false;
    }
  });

  const question1Options = [
    { value: "A", label: "<p>" },
    { value: "B", label: "Hello, world!" },
    { value: "C", label: "<p>Hello, world!</p>" },
    { value: "D", label: "</p>" },
  ];

  const question2Options = [
    {
      value: "A",
      label: "It starts a new paragraph.",
    },
    {
      value: "B",
      label: "It marks the end of a paragraph element.",
    },
    {
      value: "C",
      label: "It creates an image.",
    },
    {
      value: "D",
      label: "It makes text bold.",
    },
  ];

  const bothCorrect = answer1 === "C" && answer2 === "B";

  const handleComplete = () => {
    if (!bothCorrect || completed) return;

    try {
      const saved = JSON.parse(
        localStorage.getItem(COMPLETED_KEY) || "[]"
      );

      const existing = Array.isArray(saved) ? saved : [];

      const updated = [
        ...new Set([
          ...existing.filter(
            (id) =>
              Number.isInteger(id) &&
              id >= 1 &&
              id <= 8
          ),
          2,
        ]),
      ];

      localStorage.setItem(
        COMPLETED_KEY,
        JSON.stringify(updated)
      );

      setCompleted(true);
    } catch {
      window.alert(
        "Unable to save progress. Please check your browser storage settings and try again."
      );
    }
  };

  const renderQuestion = ({
    number,
    question,
    options,
    answer,
    setAnswer,
    checked,
    setChecked,
    correctAnswer,
    explanation,
    wrongExplanation,
    name,
  }) => (
    <div className="mt-6">
      <h3 className="font-bold text-[#42213D]">
        Question {number} of 2
      </h3>

      <p className="mt-2 font-semibold leading-7 text-[#65545F]">
        {question}
      </p>

      <div className="mt-4 flex flex-col gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
              answer === option.value
                ? "border-pink-500 bg-pink-50"
                : "border-[#F0E3ED] hover:bg-pink-50"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={answer === option.value}
              onChange={(event) => {
                setAnswer(event.target.value);
                setChecked(false);
              }}
              className="mt-1 accent-pink-600"
            />

            <span className="text-[#42213D]">
              <strong>{option.value}.</strong>{" "}
              {option.label}
            </span>
          </label>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setChecked(true)}
        disabled={!answer}
        className="mt-4 rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Check Answer {number}
      </button>

      {checked && (
        <div
          className={`mt-4 rounded-xl p-4 ${
            answer === correctAnswer
              ? "bg-[#D9F3E7] text-[#287D61]"
              : "bg-[#F3E8F0] text-[#42213D]"
          }`}
          role="status"
          aria-live="polite"
        >
          {answer === correctAnswer ? (
            <>
              <p className="font-bold">Correct! 🎉</p>
              <p className="mt-2 leading-6">{explanation}</p>
            </>
          ) : (
            <>
              <p className="font-bold">Not quite! 💗</p>
              <p className="mt-2 leading-6">{wrongExplanation}</p>

              <button
                type="button"
                onClick={() => {
                  setAnswer("");
                  setChecked(false);
                }}
                className="mt-3 rounded-xl border border-pink-300 px-4 py-2 font-semibold text-pink-700 hover:bg-white"
              >
                Try Again
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFFAF3] p-5 pt-20 md:p-10">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={() => navigate("/courses/html/lessons")}
          className="mb-6 font-semibold text-pink-600 hover:text-pink-700"
        >
          ← Back to HTML lessons
        </button>

        <p className="text-sm font-semibold text-pink-600">
          FAIDAT CODE ACADEMY / HTML FUNDAMENTALS
        </p>

        <h1 className="mt-4 text-3xl font-bold text-[#42213D] md:text-4xl">
          Lesson 2: HTML Elements and Tags
        </h1>

        <p className="mt-3 leading-7 text-[#65545F]">
          Learn how HTML tags and elements work together to create
          the content you see on a webpage.
        </p>

        {/* SECTION 1: HTML TAGS */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <h2 className="text-2xl font-bold text-[#42213D]">
            1. What Are HTML Tags?
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            HTML tags are special keywords written inside angle
            brackets. They tell the browser how to structure content
            on a webpage.
          </p>

          <div className="mt-5 rounded-xl bg-[#42213D] p-5">
            <p className="text-sm font-semibold text-pink-200">
              EXAMPLE
            </p>
            <pre className="mt-3 overflow-x-auto text-white">
              <code>{"<p>Hello, world!</p>"}</code>
            </pre>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <h3 className="font-bold text-[#42213D]">
                Opening tag: {"<p>"}
              </h3>
              <p className="mt-1 leading-6 text-[#65545F]">
                This tells the browser that a paragraph is beginning.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#42213D]">
                Content: Hello, world!
              </h3>
              <p className="mt-1 leading-6 text-[#65545F]">
                This is the text that appears on the webpage.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#42213D]">
                Closing tag: {"</p>"}
              </h3>
              <p className="mt-1 leading-6 text-[#65545F]">
                The forward slash indicates the end of the paragraph
                element.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: HTML ELEMENTS */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <h2 className="text-2xl font-bold text-[#42213D]">
            2. What Is an HTML Element?
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            An HTML element is the complete structure made up of an
            opening tag, content, and usually a closing tag.
          </p>

          <div className="mt-5 rounded-xl bg-[#42213D] p-5">
            <p className="text-sm font-semibold text-pink-200">
              EXAMPLE
            </p>
            <pre className="mt-3 overflow-x-auto text-white">
              <code>
                {"<h1>Welcome to my website</h1>"}
              </code>
            </pre>
          </div>

          <div className="mt-5 rounded-xl bg-[#D9F3E7] p-4">
            <h3 className="font-bold text-[#287D61]">
              Remember the difference
            </h3>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-[#285D4D]">
              <li>
                <strong>Tag:</strong> The opening or closing markup,
                such as <code>{"<h1>"}</code>.
              </li>
              <li>
                <strong>Element:</strong> The complete structure,
                such as{" "}
                <code>
                  {"<h1>Welcome to my website</h1>"}
                </code>.
              </li>
            </ul>
          </div>

          <p className="mt-5 leading-7 text-[#65545F]">
            Some HTML elements are empty elements. For example,{" "}
            <code className="rounded bg-[#F3E8F0] px-2 py-1">
              {"<img>"}
            </code>{" "}
            displays an image and does not require a closing tag.
          </p>
        </section>

        {/* KNOWLEDGE CHECK */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <p className="text-sm font-semibold text-pink-600">
            LESSON 2 · PRACTICE
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#42213D]">
            Test Your Knowledge 🧠
          </h2>

          <p className="mt-2 leading-6 text-[#65545F]">
            Answer both questions correctly to complete this lesson.
          </p>

          {renderQuestion({
            number: 1,
            name: "element-question-1",
            question: "Which option is a complete HTML element?",
            options: question1Options,
            answer: answer1,
            setAnswer: setAnswer1,
            checked: checked1,
            setChecked: setChecked1,
            correctAnswer: "C",
            explanation:
              "A complete paragraph element contains an opening tag, its content, and a closing tag: <p>Hello, world!</p>.",
            wrongExplanation:
              "Look for the option that contains an opening tag, some content, and a closing tag.",
          })}

          {renderQuestion({
            number: 2,
            name: "element-question-2",
            question: "What does the closing tag </p> do?",
            options: question2Options,
            answer: answer2,
            setAnswer: setAnswer2,
            checked: checked2,
            setChecked: setChecked2,
            correctAnswer: "B",
            explanation:
              "The </p> tag marks the end of a paragraph element. The forward slash identifies it as a closing tag.",
            wrongExplanation:
              "Remember that the forward slash in </p> indicates the end of the paragraph element.",
          })}

          {/* COMPLETION */}
          <div className="mt-8 border-t border-pink-100 pt-6">
            {bothCorrect ? (
              <>
                <p className="font-bold text-[#287D61]">
                  Excellent! Both answers are correct. 🎉
                </p>

                {completed ? (
                  <p className="mt-3 rounded-xl bg-[#D9F3E7] p-4 text-[#287D61]">
                    Lesson 2 Completed! ✓ Your progress is saved.
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleComplete}
                    className="mt-4 rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white hover:bg-pink-700"
                  >
                    Mark Lesson as Complete
                  </button>
                )}
              </>
            ) : (
              <p className="text-sm text-[#65545F]">
                Answer both questions correctly to unlock lesson
                completion.
              </p>
            )}
          </div>
        </section>

        {/* LESSON SUMMARY */}
        <section className="mt-8 rounded-2xl bg-[#F3E8F0] p-6">
          <h2 className="text-xl font-bold text-[#42213D]">
            Remember 🌱
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            Tags are the markup used to define HTML elements. An
            element usually includes an opening tag, content, and a
            closing tag. Understanding this difference will help you
            write clearer HTML.
          </p>

          <button
            type="button"
            onClick={() => navigate("/courses/html/lessons")}
            className="mt-5 rounded-xl border border-pink-300 px-5 py-3 font-semibold text-pink-700 transition hover:bg-white"
          >
            Return to Lesson List →
          </button>
        </section>

        {/* LESSON NAVIGATION */}
        <div className="mt-8 flex justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/courses/html/lesson-1")}
            className="rounded-xl border border-[#42213D] px-5 py-3 font-semibold text-[#42213D] hover:bg-[#F3E8F0]"
          >
            ← Previous Lesson
          </button>

          <button
            type="button"
            onClick={() => navigate("/courses/html/lesson-3")}
            className="rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white hover:bg-pink-700"
          >
            Next Lesson →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HTMLLesson2Page;

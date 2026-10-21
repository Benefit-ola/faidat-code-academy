
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const COMPLETED_KEY = "faidat-html-completed-lessons";

const HTMLLesson3Page = () => {
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

      return Array.isArray(saved) && saved.includes(3);
    } catch {
      return false;
    }
  });

  const question1Options = [
    { value: "A", label: "<h1>" },
    { value: "B", label: "<p>" },
    { value: "C", label: "<h6>" },
    { value: "D", label: "<paragraph>" },
  ];

  const question2Options = [
    { value: "A", label: "<heading>" },
    { value: "B", label: "<text>" },
    { value: "C", label: "<p>" },
    { value: "D", label: "<bodytext>" },
  ];

  const bothCorrect = answer1 === "A" && answer2 === "C";

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
          3,
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

      <p className="mt-2 font-semibold leading-7 text-[#42213D]">
        {question}
      </p>

      <div className="mt-4 space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${
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
              className="accent-pink-600"
            />

            <span className="font-semibold text-[#42213D]">
              {option.value}.{" "}
              <code>{option.label}</code>
            </span>
          </label>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setChecked(true)}
        disabled={!answer}
        className="mt-5 rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
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
              <p className="mt-2 leading-6">
                {explanation}
              </p>
            </>
          ) : (
            <>
              <p className="font-bold">Not quite! 💗</p>
              <p className="mt-2 leading-6">
                {wrongExplanation}
              </p>

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
    <div className="min-h-screen bg-[#FFFAF3] p-6 pt-20 md:p-10">
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
          Lesson 3: Headings and Paragraphs 🌱
        </h1>

        <p className="mt-3 leading-7 text-[#65545F]">
          Learn how to organise webpage content using headings
          and paragraphs.
        </p>

        {/* SECTION 1: HEADINGS */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <h2 className="text-2xl font-bold text-[#42213D]">
            1. What Are HTML Headings?
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            Headings describe the topic or purpose of a section.
            HTML provides six heading levels, from h1 to h6.
            The h1 heading is generally the main heading of a page.
          </p>

          <div className="mt-5 rounded-xl bg-[#42213D] p-5">
            <p className="text-sm font-semibold text-pink-200">
              EXAMPLE
            </p>

            <pre className="mt-3 overflow-x-auto text-white">
              <code>{`<h1>My First Website</h1>
<h2>About Me</h2>
<h3>My Hobbies</h3>`}</code>
            </pre>
          </div>

          <div className="mt-5 rounded-xl bg-[#D9F3E7] p-4">
            <h3 className="font-bold text-[#287D61]">
              Remember these rules
            </h3>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-[#285D4D]">
              <li>
                <code>{"<h1>"}</code> is generally the main heading.
              </li>
              <li>
                <code>{"<h2>"}</code> can introduce a major section
                under the main heading.
              </li>
              <li>
                <code>{"<h3>"}</code> can introduce a subsection.
              </li>
              <li>
                Use headings to organise content logically,
                not just to make text look bigger.
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 2: PARAGRAPHS */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <h2 className="text-2xl font-bold text-[#42213D]">
            2. What Are HTML Paragraphs?
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            The paragraph element uses the p tag to group
            sentences into a block of text.
          </p>

          <div className="mt-5 rounded-xl bg-[#42213D] p-5">
            <p className="text-sm font-semibold text-pink-200">
              EXAMPLE
            </p>

            <pre className="mt-3 overflow-x-auto text-white">
              <code>{`<p>My name is Faidat.</p>
<p>I am learning web development.</p>`}</code>
            </pre>
          </div>

          <h3 className="mt-5 font-bold text-[#42213D]">
            What does this code do?
          </h3>

          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-[#65545F]">
            <li>
              <code>{"<p>"}</code> starts a paragraph.
            </li>
            <li>
              The text between the tags is the paragraph content.
            </li>
            <li>
              <code>{"</p>"}</code> ends the paragraph.
            </li>
            <li>
              Each paragraph is displayed as a separate block
              by default.
            </li>
          </ul>
        </section>

        {/* SECTION 3: TWO-QUESTION QUIZ */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <p className="text-sm font-semibold text-pink-600">
            LESSON 3 · PRACTICE
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#42213D]">
            Test Your Knowledge 🧠
          </h2>

          <p className="mt-2 leading-6 text-[#65545F]">
            Answer both questions correctly to complete this lesson.
          </p>

          {renderQuestion({
            number: 1,
            name: "headings-question-1",
            question:
              "Which HTML tag is generally used for the main heading of a webpage?",
            options: question1Options,
            answer: answer1,
            setAnswer: setAnswer1,
            checked: checked1,
            setChecked: setChecked1,
            correctAnswer: "A",
            explanation:
              "Correct! The <h1> element represents a top-level heading and is generally used for the page's main heading.",
            wrongExplanation:
              "Review the heading examples. The heading levels range from <h1> to <h6>.",
          })}

          {renderQuestion({
            number: 2,
            name: "headings-question-2",
            question:
              "Which HTML tag is used to create a paragraph?",
            options: question2Options,
            answer: answer2,
            setAnswer: setAnswer2,
            checked: checked2,
            setChecked: setChecked2,
            correctAnswer: "C",
            explanation:
              "Correct! The <p> element groups text into a paragraph. The closing tag </p> marks its end.",
            wrongExplanation:
              "Look at the paragraph example again. Which tag appears at the beginning of each paragraph?",
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
                    Lesson 3 Completed! ✓ Your progress is saved.
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
            Headings organise your content into a clear hierarchy,
            while paragraphs group sentences into readable blocks.
            These elements help make webpages easier to understand.
          </p>

          <button
            type="button"
            onClick={() => navigate("/courses/html/lessons")}
            className="mt-5 rounded-xl border border-pink-300 px-5 py-3 font-semibold text-pink-700 hover:bg-white"
          >
            Return to Lesson List →
          </button>
        </section>

        {/* NAVIGATION */}
        <div className="mt-8 flex flex-wrap justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/courses/html/lesson-2")}
            className="rounded-xl border border-[#42213D] px-5 py-3 font-semibold text-[#42213D] hover:bg-[#F3E8F0]"
          >
            ← Previous Lesson
          </button>

          <button
            type="button"
            onClick={() => navigate("/courses/html/lesson-4")}
            className="rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white hover:bg-pink-700"
          >
            Next Lesson →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HTMLLesson3Page;

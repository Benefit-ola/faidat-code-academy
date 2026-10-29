
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const COMPLETED_KEY = "faidat-html-completed-lessons";

const HTMLLesson7Page = () => {
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

      return Array.isArray(saved) && saved.includes(7);
    } catch {
      return false;
    }
  });

  const bothCorrect = answer1 === "B" && answer2 === "C";

  const handleComplete = () => {
    if (!bothCorrect || !checked1 || !checked2 || completed) {
      return;
    }

    try {
      const saved = JSON.parse(
        localStorage.getItem(COMPLETED_KEY) || "[]"
      );

      const existing = Array.isArray(saved) ? saved : [];

      const validLessons = existing.filter(
        (id) =>
          Number.isInteger(id) &&
          id >= 1 &&
          id <= 8
      );

      const updated = [...new Set([...validLessons, 7])];

      localStorage.setItem(
        COMPLETED_KEY,
        JSON.stringify(updated)
      );

      setCompleted(true);
    } catch {
      window.alert("Unable to save progress. Please try again.");
    }
  };

  const renderQuestion = ({
    number,
    name,
    question,
    options,
    answer,
    setAnswer,
    checked,
    setChecked,
    correctAnswer,
    explanation,
    wrongExplanation,
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
              {option.value}. {option.label}
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
          Lesson 7: Forms in HTML 🌱
        </h1>

        <p className="mt-3 leading-7 text-[#65545F]">
          Learn how to collect information from users with HTML
          forms, labels, inputs, and buttons.
        </p>

        {/* SECTION 1: INTRODUCTION */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <h2 className="text-2xl font-bold text-[#42213D]">
            1. What Is an HTML Form?
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            A form provides controls that let users enter
            information. Websites use forms for registration,
            login, searches, surveys, and contact messages.
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-[#65545F]">
            <li><code>{"<form>"}</code> groups form controls.</li>
            <li><code>{"<label>"}</code> describes a form field.</li>
            <li><code>{"<input>"}</code> accepts different kinds of data.</li>
            <li><code>{"<textarea>"}</code> accepts longer text.</li>
            <li><code>{"<button>"}</code> creates a clickable button.</li>
          </ul>
        </section>

        {/* SECTION 2: CODE EXAMPLE */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <h2 className="text-2xl font-bold text-[#42213D]">
            2. Writing a Simple Form
          </h2>

          <div className="mt-5 rounded-xl bg-[#42213D] p-5">
            <p className="text-sm font-semibold text-pink-200">
              HTML CODE
            </p>

            <pre className="mt-3 overflow-x-auto text-white">
              <code>{`<form>
  <label for="name">Your name:</label>
  <input
    type="text"
    id="name"
    name="name"
    required
  />

  <label for="email">Your email:</label>
  <input
    type="email"
    id="email"
    name="email"
    required
  />

  <button type="submit">Submit</button>
</form>`}</code>
            </pre>
          </div>

          {/* INTERACTIVE FORM PREVIEW */}
          <div className="mt-5 rounded-xl border border-[#D9F3E7] bg-[#F4FBF7] p-5">
            <p className="mb-4 text-sm font-semibold text-[#287D61]">
              BROWSER OUTPUT PREVIEW
            </p>

            <form
              className="space-y-4"
              onSubmit={(event) => event.preventDefault()}
            >
              <div>
                <label
                  htmlFor="demo-name"
                  className="mb-1 block font-medium text-[#42213D]"
                >
                  Your name:
                </label>

                <input
                  id="demo-name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-[#D8C8D5] bg-white p-3 text-[#42213D]"
                />
              </div>

              <div>
                <label
                  htmlFor="demo-email"
                  className="mb-1 block font-medium text-[#42213D]"
                >
                  Your email:
                </label>

                <input
                  id="demo-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-[#D8C8D5] bg-white p-3 text-[#42213D]"
                />
              </div>

              <button
                type="submit"
                className="rounded-lg bg-pink-600 px-5 py-3 font-semibold text-white hover:bg-pink-700"
              >
                Submit
              </button>

              <p className="text-sm text-[#65545F]">
                This is a demonstration. It validates the fields
                but does not send or store your information.
              </p>
            </form>
          </div>

          {/* ATTRIBUTE EXPLANATION */}
          <div className="mt-5 rounded-xl bg-[#D9F3E7] p-4 text-[#285D4D]">
            <h3 className="font-bold">
              Understanding the attributes
            </h3>

            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li><code>type="text"</code> accepts text.</li>
              <li>
                <code>type="email"</code> checks for a valid email format.
              </li>
              <li><code>id</code> connects the input to its label.</li>
              <li>
                <code>name</code> identifies the field when form data
                is submitted.
              </li>
              <li>
                <code>required</code> prevents submission while the
                field is empty.
              </li>
            </ul>
          </div>

          <p className="mt-4 leading-7 text-[#65545F]">
            Note: In HTML, labels use the <code>for</code> attribute.
            In JSX, use <code>htmlFor</code> instead.
          </p>
        </section>

        {/* SECTION 3: TWO-QUESTION QUIZ */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <p className="text-sm font-semibold text-pink-600">
            LESSON 7 · PRACTICE
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#42213D]">
            Test Your Knowledge 🧠
          </h2>

          <p className="mt-2 leading-6 text-[#65545F]">
            Answer both questions correctly to complete this lesson.
          </p>

          {renderQuestion({
            number: 1,
            name: "lesson7-question-1",
            question:
              "Which HTML attribute makes a form field mandatory?",
            options: [
              { value: "A", label: "placeholder" },
              { value: "B", label: "required" },
              { value: "C", label: "type" },
              { value: "D", label: "class" },
            ],
            answer: answer1,
            setAnswer: setAnswer1,
            checked: checked1,
            setChecked: setChecked1,
            correctAnswer: "B",
            explanation:
              "Correct! The required attribute tells the browser that the user must fill in that field before submitting the form.",
            wrongExplanation:
              "Think about the attribute used in the name and email examples. Which attribute tells the browser that a field must be completed?",
          })}

          {renderQuestion({
            number: 2,
            name: "lesson7-question-2",
            question:
              "Which HTML element allows users to enter longer, multi-line text?",
            options: [
              { value: "A", label: "<input>" },
              { value: "B", label: "<label>" },
              { value: "C", label: "<textarea>" },
              { value: "D", label: "<button>" },
            ],
            answer: answer2,
            setAnswer: setAnswer2,
            checked: checked2,
            setChecked: setChecked2,
            correctAnswer: "C",
            explanation:
              "Well done! The <textarea> element provides a text area for longer, multi-line input, such as a message or comment.",
            wrongExplanation:
              "An <input> is often used for shorter entries like names and email addresses. Which element is designed for longer text across multiple lines?",
          })}

          {/* LESSON COMPLETION */}
          <div className="mt-8 border-t border-pink-100 pt-6">
            {bothCorrect && checked1 && checked2 ? (
              <>
                <p className="font-bold text-[#287D61]">
                  Excellent! Both answers are correct. 🎉
                </p>

                {completed ? (
                  <div className="mt-4 rounded-xl bg-[#D9F3E7] p-4 text-[#287D61]">
                    <p className="font-bold">
                      Lesson 7 Completed! ✓
                    </p>
                    <p className="mt-1 text-sm">
                      Your progress has been saved.
                    </p>
                  </div>
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

          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-[#65545F]">
            <li><code>{"<form>"}</code> groups form controls.</li>
            <li><code>{"<label>"}</code> describes a field.</li>
            <li><code>{"<input>"}</code> accepts different types of data.</li>
            <li>
              <code>{"<textarea>"}</code> accepts longer, multi-line text.
            </li>
            <li>
              <code>required</code> makes a field mandatory.
            </li>
          </ul>

          <button
            type="button"
            onClick={() => navigate("/courses/html/lessons")}
            className="mt-5 rounded-xl border border-pink-300 px-5 py-3 font-semibold text-pink-700 hover:bg-white"
          >
            All HTML Lessons →
          </button>
        </section>

        {/* NAVIGATION */}
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => navigate("/courses/html/lesson-6")}
            className="rounded-xl border border-[#42213D] px-5 py-3 font-semibold text-[#42213D] hover:bg-[#F3E8F0]"
          >
            ← Previous Lesson
          </button>

          <button
            type="button"
            onClick={() => navigate("/courses/html/lesson-8")}
            className="rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white hover:bg-pink-700"
          >
            Next Lesson →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HTMLLesson7Page;


import { useState } from "react";
import { useNavigate } from "react-router-dom";

const COMPLETED_KEY = "faidat-html-completed-lessons";

const HTMLLesson6Page = () => {
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

      return Array.isArray(saved) && saved.includes(6);
    } catch {
      return false;
    }
  });

  const bothCorrect = answer1 === "A" && answer2 === "C";

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

      const updated = [...new Set([...validLessons, 6])];

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
          Lesson 6: Tables in HTML 🌱
        </h1>

        <p className="mt-3 leading-7 text-[#65545F]">
          Learn how to organise information into rows and columns
          using HTML tables.
        </p>

        {/* SECTION 1: TABLE ELEMENTS */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <h2 className="text-2xl font-bold text-[#42213D]">
            1. Understanding Table Elements
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            HTML tables display related information in rows and
            columns. Different tags define the table, its rows,
            headings, and data.
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-[#65545F]">
            <li><code>{"<table>"}</code> creates the table.</li>
            <li><code>{"<tr>"}</code> creates a table row.</li>
            <li><code>{"<th>"}</code> creates a header cell.</li>
            <li><code>{"<td>"}</code> creates a regular data cell.</li>
            <li><code>{"<thead>"}</code> groups header rows.</li>
            <li><code>{"<tbody>"}</code> groups the main data rows.</li>
          </ul>
        </section>

        {/* SECTION 2: EXAMPLE AND BROWSER OUTPUT */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <h2 className="text-2xl font-bold text-[#42213D]">
            2. Create Your First Table
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            This example displays three students and their scores.
          </p>

          <div className="mt-5 rounded-xl bg-[#42213D] p-5">
            <p className="text-sm font-semibold text-pink-200">
              HTML CODE
            </p>

            <pre className="mt-3 overflow-x-auto text-white">
              <code>{`<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Subject</th>
      <th>Score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ada</td>
      <td>HTML</td>
      <td>85</td>
    </tr>
    <tr>
      <td>Tunde</td>
      <td>CSS</td>
      <td>90</td>
    </tr>
    <tr>
      <td>Amara</td>
      <td>JavaScript</td>
      <td>78</td>
    </tr>
  </tbody>
</table>`}</code>
            </pre>
          </div>

          <div className="mt-5 rounded-xl border border-[#D9F3E7] bg-[#F4FBF7] p-5">
            <p className="mb-3 text-sm font-semibold text-[#287D61]">
              BROWSER OUTPUT
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-[#285D4D]">
                <thead>
                  <tr className="bg-[#D9F3E7]">
                    <th className="border border-[#A9D9C4] p-3">Name</th>
                    <th className="border border-[#A9D9C4] p-3">Subject</th>
                    <th className="border border-[#A9D9C4] p-3">Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#A9D9C4] p-3">Ada</td>
                    <td className="border border-[#A9D9C4] p-3">HTML</td>
                    <td className="border border-[#A9D9C4] p-3">85</td>
                  </tr>
                  <tr>
                    <td className="border border-[#A9D9C4] p-3">Tunde</td>
                    <td className="border border-[#A9D9C4] p-3">CSS</td>
                    <td className="border border-[#A9D9C4] p-3">90</td>
                  </tr>
                  <tr>
                    <td className="border border-[#A9D9C4] p-3">Amara</td>
                    <td className="border border-[#A9D9C4] p-3">JavaScript</td>
                    <td className="border border-[#A9D9C4] p-3">78</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-[#D9F3E7] p-4 text-[#285D4D]">
            <h3 className="font-bold">How to read this table</h3>

            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>The first row contains the column headings.</li>
              <li>Each following row represents one student.</li>
              <li>
                Each <code>{"<td>"}</code> provides a value in a row.
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 3: TWO-QUESTION QUIZ */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <p className="text-sm font-semibold text-pink-600">
            LESSON 6 · PRACTICE
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#42213D]">
            Test Your Knowledge 🧠
          </h2>

          <p className="mt-2 leading-6 text-[#65545F]">
            Answer both questions correctly to complete this lesson.
          </p>

          {renderQuestion({
            number: 1,
            name: "lesson6-question-1",
            question: "Which HTML tag creates a table row?",
            options: [
              { value: "A", label: "<tr>" },
              { value: "B", label: "<th>" },
              { value: "C", label: "<td>" },
              { value: "D", label: "<table>" },
            ],
            answer: answer1,
            setAnswer: setAnswer1,
            checked: checked1,
            setChecked: setChecked1,
            correctAnswer: "A",
            explanation:
              "Correct! The <tr> element creates a table row. Table rows contain header cells or data cells.",
            wrongExplanation:
              "Remember: <table> creates the table, <th> creates a header cell, and <td> creates a regular data cell. Which tag represents a row?",
          })}

          {renderQuestion({
            number: 2,
            name: "lesson6-question-2",
            question:
              "Which HTML tag creates a regular data cell in a table?",
            options: [
              { value: "A", label: "<tr>" },
              { value: "B", label: "<th>" },
              { value: "C", label: "<td>" },
              { value: "D", label: "<table-row>" },
            ],
            answer: answer2,
            setAnswer: setAnswer2,
            checked: checked2,
            setChecked: setChecked2,
            correctAnswer: "C",
            explanation:
              "Well done! The <td> element creates a regular data cell. The <th> element is used for a header cell.",
            wrongExplanation:
              "A <tr> represents a row, and <th> represents a header cell. Look for the tag used for ordinary table data.",
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
                      Lesson 6 Completed! ✓
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
            <li><code>{"<table>"}</code> creates the table.</li>
            <li><code>{"<tr>"}</code> creates a row.</li>
            <li><code>{"<th>"}</code> creates a header cell.</li>
            <li><code>{"<td>"}</code> creates a regular data cell.</li>
            <li>
              <code>{"<thead>"}</code> and <code>{"<tbody>"}</code>
              help organise table content.
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
            onClick={() => navigate("/courses/html/lesson-5")}
            className="rounded-xl border border-[#42213D] px-5 py-3 font-semibold text-[#42213D] hover:bg-[#F3E8F0]"
          >
            ← Previous Lesson
          </button>

          <button
            type="button"
            onClick={() => navigate("/courses/html/lesson-7")}
            className="rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white hover:bg-pink-700"
          >
            Next Lesson →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HTMLLesson6Page;

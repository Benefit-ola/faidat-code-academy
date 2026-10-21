
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const COMPLETED_KEY = "faidat-html-completed-lessons";

const HTMLLesson5Page = () => {
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

      return Array.isArray(saved) && saved.includes(5);
    } catch {
      return false;
    }
  });

  const bothCorrect = answer1 === "B" && answer2 === "A";

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

      const updated = [...new Set([...validLessons, 5])];

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
          Lesson 5: Lists in HTML 🌱
        </h1>

        <p className="mt-3 leading-7 text-[#65545F]">
          Learn how to organise information into clear,
          readable lists on a webpage.
        </p>

        {/* SECTION 1: UNORDERED LISTS */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <h2 className="text-2xl font-bold text-[#42213D]">
            1. Unordered Lists
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            The ul element creates an unordered list. Browsers
            usually display its items with bullets.
          </p>

          <div className="mt-5 rounded-xl bg-[#42213D] p-5">
            <p className="text-sm font-semibold text-pink-200">
              EXAMPLE
            </p>

            <pre className="mt-3 overflow-x-auto text-white">
              <code>{`<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>`}</code>
            </pre>
          </div>

          <h3 className="mt-5 font-bold text-[#42213D]">
            What does each tag do?
          </h3>

          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-[#65545F]">
            <li><code>{"<ul>"}</code> starts the unordered list.</li>
            <li><code>{"<li>"}</code> defines each list item.</li>
            <li><code>{"</ul>"}</code> closes the list.</li>
          </ul>

          <div className="mt-5 rounded-xl bg-[#D9F3E7] p-4 text-[#285D4D]">
            <p className="font-bold">What the browser displays</p>

            <ul className="mt-2 list-disc pl-6">
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
            </ul>
          </div>
        </section>

        {/* SECTION 2: ORDERED LISTS */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <h2 className="text-2xl font-bold text-[#42213D]">
            2. Ordered Lists
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            The ol element creates an ordered list. Browsers
            usually number the items, making it useful for steps
            or instructions that have an order.
          </p>

          <div className="mt-5 rounded-xl bg-[#42213D] p-5">
            <p className="text-sm font-semibold text-pink-200">
              EXAMPLE
            </p>

            <pre className="mt-3 overflow-x-auto text-white">
              <code>{`<ol>
  <li>Open your editor</li>
  <li>Write HTML</li>
  <li>Save your file</li>
</ol>`}</code>
            </pre>
          </div>

          <div className="mt-5 rounded-xl bg-[#D9F3E7] p-4 text-[#285D4D]">
            <p className="font-bold">What the browser displays</p>

            <ol className="mt-2 list-decimal pl-6">
              <li>Open your editor</li>
              <li>Write HTML</li>
              <li>Save your file</li>
            </ol>
          </div>
        </section>

        {/* SECTION 3: NESTED LISTS */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <h2 className="text-2xl font-bold text-[#42213D]">
            3. Nested Lists
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            A nested list is a list placed inside a list item of
            another list. It helps group related information.
          </p>

          <div className="mt-5 rounded-xl bg-[#42213D] p-5">
            <p className="text-sm font-semibold text-pink-200">
              HTML CODE
            </p>

            <pre className="mt-3 overflow-x-auto text-white">
              <code>{`<ul>
  <li>Frontend
    <ul>
      <li>HTML</li>
      <li>CSS</li>
    </ul>
  </li>
  <li>Backend</li>
</ul>`}</code>
            </pre>
          </div>

          <div className="mt-5 rounded-xl border border-[#D9F3E7] bg-[#F4FBF7] p-5">
            <p className="text-sm font-semibold text-[#287D61]">
              BROWSER OUTPUT
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 text-[#285D4D]">
              <li>
                Frontend
                <ul className="mt-2 list-circle space-y-2 pl-6">
                  <li>HTML</li>
                  <li>CSS</li>
                </ul>
              </li>
              <li>Backend</li>
            </ul>
          </div>

          <div className="mt-5 rounded-xl bg-[#D9F3E7] p-4 text-[#285D4D]">
            <h3 className="font-bold">What should you notice?</h3>

            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Frontend and Backend are the main list items.</li>
              <li>HTML and CSS appear underneath Frontend.</li>
              <li>
                The inner list is placed inside the Frontend
                list item.
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 4: TWO-QUESTION QUIZ */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <p className="text-sm font-semibold text-pink-600">
            LESSON 5 · PRACTICE
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#42213D]">
            Test Your Knowledge 🧠
          </h2>

          <p className="mt-2 leading-6 text-[#65545F]">
            Answer both questions correctly to complete this lesson.
          </p>

          {renderQuestion({
            number: 1,
            name: "lesson5-question-1",
            question:
              "Which HTML tag creates a numbered list by default?",
            options: [
              { value: "A", label: "<ul>" },
              { value: "B", label: "<ol>" },
              { value: "C", label: "<li>" },
              { value: "D", label: "<list>" },
            ],
            answer: answer1,
            setAnswer: setAnswer1,
            checked: checked1,
            setChecked: setChecked1,
            correctAnswer: "B",
            explanation:
              "Correct! The <ol> element creates an ordered list, which is numbered by default. It is useful for steps or instructions that follow a particular order.",
            wrongExplanation:
              "Remember: <ul> creates an unordered list, <ol> creates an ordered list, and <li> defines an individual list item.",
          })}

          {renderQuestion({
            number: 2,
            name: "lesson5-question-2",
            question:
              "Which HTML tag defines an individual item inside a list?",
            options: [
              { value: "A", label: "<li>" },
              { value: "B", label: "<item>" },
              { value: "C", label: "<ul>" },
              { value: "D", label: "<ol>" },
            ],
            answer: answer2,
            setAnswer: setAnswer2,
            checked: checked2,
            setChecked: setChecked2,
            correctAnswer: "A",
            explanation:
              "Well done! The <li> element defines a list item. You place it inside a <ul> or <ol> element.",
            wrongExplanation:
              "Look at the HTML examples above. Which tag appears around each individual item, such as HTML or CSS?",
          })}

          {/* COMPLETION */}
          <div className="mt-8 border-t border-pink-100 pt-6">
            {bothCorrect && checked1 && checked2 ? (
              <>
                <p className="font-bold text-[#287D61]">
                  Excellent! Both answers are correct. 🎉
                </p>

                {completed ? (
                  <div className="mt-4 rounded-xl bg-[#D9F3E7] p-4 text-[#287D61]">
                    <p className="font-bold">
                      Lesson 5 Completed! ✓
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
            <li>
              <code>{"<ul>"}</code> creates an unordered list.
            </li>
            <li>
              <code>{"<ol>"}</code> creates an ordered list.
            </li>
            <li>
              <code>{"<li>"}</code> defines a list item.
            </li>
            <li>
              Nested lists help organise related information.
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
            onClick={() => navigate("/courses/html/lesson-4")}
            className="rounded-xl border border-[#42213D] px-5 py-3 font-semibold text-[#42213D] hover:bg-[#F3E8F0]"
          >
            ← Previous Lesson
          </button>

          <button
            type="button"
            onClick={() => navigate("/courses/html/lesson-6")}
            className="rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white hover:bg-pink-700"
          >
            Next Lesson →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HTMLLesson5Page;

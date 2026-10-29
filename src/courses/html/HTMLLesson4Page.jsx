
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const COMPLETED_KEY = "faidat-html-completed-lessons";

const HTMLLesson4Page = () => {
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

      return Array.isArray(saved) && saved.includes(4);
    } catch {
      return false;
    }
  });

  const question1Options = [
    { value: "A", label: "href" },
    { value: "B", label: "src" },
    { value: "C", label: "alt" },
    { value: "D", label: "title" },
  ];

  const question2Options = [
    { value: "A", label: "href" },
    { value: "B", label: "src" },
    { value: "C", label: "alt" },
    { value: "D", label: "width" },
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
          4,
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
          Lesson 4: Links and Images 🌱
        </h1>

        <p className="mt-3 leading-7 text-[#65545F]">
          Learn how to connect webpages with links and add images
          to make your website more useful and attractive.
        </p>

        {/* SECTION 1: LINKS */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <h2 className="text-2xl font-bold text-[#42213D]">
            1. Creating Links
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            The anchor element, written as {"<a>"}, creates a
            clickable link. Its href attribute specifies the
            destination.
          </p>

          <div className="mt-5 rounded-xl bg-[#42213D] p-5">
            <p className="text-sm font-semibold text-pink-200">
              EXAMPLE
            </p>

            <pre className="mt-3 overflow-x-auto text-white">
              <code>{`<a href="https://www.example.com">
  Visit Example
</a>`}</code>
            </pre>
          </div>

          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-[#65545F]">
            <li>
              <code>{"<a>"}</code> creates the link.
            </li>
            <li>
              <code>href</code> specifies the destination.
            </li>
            <li>
              <code>Visit Example</code> is the clickable text.
            </li>
            <li>
              <code>{"</a>"}</code> closes the link.
            </li>
          </ul>
        </section>

        {/* SECTION 2: IMAGES */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <h2 className="text-2xl font-bold text-[#42213D]">
            2. Adding Images
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            The img element displays an image. The src attribute
            identifies the image file, while alt provides a text
            description for people who cannot see the image.
          </p>

          <div className="mt-5 rounded-xl bg-[#42213D] p-5">
            <p className="text-sm font-semibold text-pink-200">
              EXAMPLE
            </p>

            <pre className="mt-3 overflow-x-auto text-white">
              <code>{`<img
  src="flower.jpg"
  alt="A beautiful flower"
/>`}</code>
            </pre>
          </div>

          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-[#65545F]">
            <li>
              <code>src</code> tells the browser where the image is.
            </li>
            <li>
              <code>alt</code> describes the image.
            </li>
            <li>
              <code>{"<img>"}</code> does not need a closing tag.
            </li>
            <li>Make sure the image file path is correct.</li>
          </ul>

          <div className="mt-5 rounded-xl bg-[#D9F3E7] p-4 text-[#285D4D]">
            <h3 className="font-bold">Accessibility tip 💡</h3>

            <p className="mt-2 leading-7">
              Write meaningful alt text for informative images.
              If an image is purely decorative, an empty alt
              attribute (alt="") is often appropriate.
            </p>
          </div>
        </section>

        {/* SECTION 3: TWO-QUESTION QUIZ */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <p className="text-sm font-semibold text-pink-600">
            LESSON 4 · PRACTICE
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#42213D]">
            Test Your Knowledge 🧠
          </h2>

          <p className="mt-2 leading-6 text-[#65545F]">
            Answer both questions correctly to complete this lesson.
          </p>

          {renderQuestion({
            number: 1,
            name: "lesson4-question-1",
            question:
              "Which HTML attribute specifies the destination of a link?",
            options: question1Options,
            answer: answer1,
            setAnswer: setAnswer1,
            checked: checked1,
            setChecked: setChecked1,
            correctAnswer: "A",
            explanation:
              "The href attribute specifies where a link leads. For example, href=\"https://www.example.com\" points to that destination.",
            wrongExplanation:
              "Look at the anchor example. Which attribute appears inside the opening <a> tag to specify the link destination?",
          })}

          {renderQuestion({
            number: 2,
            name: "lesson4-question-2",
            question:
              "Which HTML attribute provides alternative text for an image?",
            options: question2Options,
            answer: answer2,
            setAnswer: setAnswer2,
            checked: checked2,
            setChecked: setChecked2,
            correctAnswer: "C",
            explanation:
              "The alt attribute provides a text alternative for an image. It helps people using screen readers and can be displayed if the image cannot load.",
            wrongExplanation:
              "Review the image example. The src attribute identifies the image file; another attribute describes the image for people who cannot see it.",
          })}

          {/* LESSON COMPLETION */}
          <div className="mt-8 border-t border-pink-100 pt-6">
            {bothCorrect ? (
              <>
                <p className="font-bold text-[#287D61]">
                  Excellent! Both answers are correct. 🎉
                </p>

                {completed ? (
                  <p className="mt-3 rounded-xl bg-[#D9F3E7] p-4 text-[#287D61]">
                    Lesson 4 Completed! ✓ Your progress is saved.
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
            Links use the href attribute to specify their
            destinations. Images use src to identify the image
            file and alt to provide a text alternative.
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
            onClick={() => navigate("/courses/html/lesson-3")}
            className="rounded-xl border border-[#42213D] px-5 py-3 font-semibold text-[#42213D] hover:bg-[#F3E8F0]"
          >
            ← Previous Lesson
          </button>

          <button
            type="button"
            onClick={() => navigate("/courses/html/lesson-5")}
            className="rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white hover:bg-pink-700"
          >
            Next Lesson →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HTMLLesson4Page;


import { useState } from "react";
import { useNavigate } from "react-router-dom";

const COMPLETED_KEY = "faidat-html-completed-lessons";

const HTMLLesson8Page = () => {
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
      return Array.isArray(saved) && saved.includes(8);
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

      const updated = [...new Set([...validLessons, 8])];

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
          Lesson 8: Semantic HTML 🌱
        </h1>

        <p className="mt-3 leading-7 text-[#65545F]">
          Learn how to structure webpages with meaningful HTML
          elements that describe the purpose of each section.
        </p>

        {/* SECTION 1: SEMANTIC HTML */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <h2 className="text-2xl font-bold text-[#42213D]">
            1. What Is Semantic HTML?
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            Semantic HTML uses elements that describe what their
            content means. For example, header represents introductory
            content, nav represents navigation, and main represents
            the main content of a page.
          </p>

          <div className="mt-5 rounded-xl bg-[#42213D] p-5">
            <p className="text-sm font-semibold text-pink-200">
              COMMON SEMANTIC ELEMENTS
            </p>

            <ul className="mt-3 space-y-3 text-white">
              <li><code>{"<header>"}</code> — introductory content or a page header.</li>
              <li><code>{"<nav>"}</code> — a group of navigation links.</li>
              <li><code>{"<main>"}</code> — the main content of the page.</li>
              <li><code>{"<section>"}</code> — a thematic section of content.</li>
              <li><code>{"<article>"}</code> — self-contained content, such as a post.</li>
              <li><code>{"<footer>"}</code> — footer information.</li>
            </ul>
          </div>

          <div className="mt-5 rounded-xl bg-[#D9F3E7] p-4 text-[#285D4D]">
            <h3 className="font-bold">Why does semantic HTML matter?</h3>

            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>It makes code easier to understand and maintain.</li>
              <li>It helps assistive technologies interpret page structure.</li>
              <li>It gives browsers and search engines useful structural meaning.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 2: CODE AND BROWSER OUTPUT */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <h2 className="text-2xl font-bold text-[#42213D]">
            2. Build a Semantic Webpage
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            Look at how semantic elements organise a simple webpage.
          </p>

          <div className="mt-5 rounded-xl bg-[#42213D] p-5">
            <p className="text-sm font-semibold text-pink-200">
              HTML CODE
            </p>

            <pre className="mt-3 overflow-x-auto text-white">
              <code>{`<header>
  <h1>My Learning Website</h1>
</header>

<nav>
  <a href="#about">About</a>
  <a href="#contact">Contact</a>
</nav>

<main>
  <section id="about">
    <h2>About Me</h2>
    <p>I am learning web development.</p>
  </section>

  <article>
    <h2>My First Post</h2>
    <p>Today I learned semantic HTML.</p>
  </article>
</main>

<footer id="contact">
  <p>Created by a beginner developer.</p>
</footer>`}</code>
            </pre>
          </div>

          <div className="mt-5 rounded-xl border border-[#D9F3E7] bg-white p-5">
            <p className="mb-4 text-sm font-semibold text-[#287D61]">
              BROWSER OUTPUT
            </p>

            <header className="rounded-lg bg-[#42213D] p-4 text-white">
              <h3 className="text-xl font-bold">My Learning Website</h3>
            </header>

            <nav className="mt-3 flex flex-wrap gap-4 rounded-lg bg-[#F3E8F0] p-3">
              <a
                href="#lesson8-about"
                className="font-semibold text-pink-700 underline"
              >
                About
              </a>
              <a
                href="#lesson8-contact"
                className="font-semibold text-pink-700 underline"
              >
                Contact
              </a>
            </nav>

            <main className="mt-4 space-y-4">
              <section
                id="lesson8-about"
                className="rounded-lg border border-[#F0E3ED] p-4"
              >
                <h3 className="text-lg font-bold text-[#42213D]">
                  About Me
                </h3>
                <p className="mt-2 text-[#65545F]">
                  I am learning web development.
                </p>
              </section>

              <article className="rounded-lg border border-[#F0E3ED] p-4">
                <h3 className="text-lg font-bold text-[#42213D]">
                  My First Post
                </h3>
                <p className="mt-2 text-[#65545F]">
                  Today I learned semantic HTML.
                </p>
              </article>
            </main>

            <footer
              id="lesson8-contact"
              className="mt-4 rounded-lg bg-[#D9F3E7] p-4 text-[#285D4D]"
            >
              <p>Created by a beginner developer.</p>
            </footer>
          </div>

          <p className="mt-4 leading-7 text-[#65545F]">
            Semantic elements describe the role of the content.
            They don't automatically create a complete design;
            CSS controls colours, spacing, and visual presentation.
          </p>
        </section>

        {/* SECTION 3: SEMANTIC VS NON-SEMANTIC */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <h2 className="text-2xl font-bold text-[#42213D]">
            3. Semantic vs Non-Semantic Elements
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            Elements such as div and span are useful containers,
            but they don't describe the purpose of their content
            by themselves.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-[#F3E8F0] p-4">
              <h3 className="font-bold text-[#42213D]">
                Non-semantic
              </h3>

              <pre className="mt-3 overflow-x-auto text-sm text-[#42213D]">
                <code>{`<div>
  <h2>News</h2>
  <p>Latest updates.</p>
</div>`}</code>
              </pre>

              <p className="mt-3 text-sm leading-6 text-[#65545F]">
                The div is a general-purpose container.
              </p>
            </div>

            <div className="rounded-xl bg-[#D9F3E7] p-4">
              <h3 className="font-bold text-[#285D4D]">
                Semantic
              </h3>

              <pre className="mt-3 overflow-x-auto text-sm text-[#285D4D]">
                <code>{`<section>
  <h2>News</h2>
  <p>Latest updates.</p>
</section>`}</code>
              </pre>

              <p className="mt-3 text-sm leading-6 text-[#285D4D]">
                The section communicates that this is a thematic section.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: TWO-QUESTION QUIZ */}
        <section className="mt-8 rounded-2xl border border-[#F0E3ED] bg-white p-6">
          <p className="text-sm font-semibold text-pink-600">
            LESSON 8 · FINAL HTML QUIZ
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#42213D]">
            Test Your Knowledge 🧠
          </h2>

          <p className="mt-2 leading-6 text-[#65545F]">
            Answer both questions correctly to complete this lesson.
          </p>

          {renderQuestion({
            number: 1,
            name: "lesson8-question-1",
            question:
              "Which semantic HTML element represents the main content of a webpage?",
            options: [
              { value: "A", label: "<footer>" },
              { value: "B", label: "<main>" },
              { value: "C", label: "<nav>" },
              { value: "D", label: "<span>" },
            ],
            answer: answer1,
            setAnswer: setAnswer1,
            checked: checked1,
            setChecked: setChecked1,
            correctAnswer: "B",
            explanation:
              "Correct! The <main> element identifies the primary content of the page.",
            wrongExplanation:
              "The footer contains footer information, and nav groups navigation links. Which element represents the primary content?",
          })}

          {renderQuestion({
            number: 2,
            name: "lesson8-question-2",
            question:
              "Which semantic HTML element groups navigation links?",
            options: [
              { value: "A", label: "<article>" },
              { value: "B", label: "<section>" },
              { value: "C", label: "<nav>" },
              { value: "D", label: "<footer>" },
            ],
            answer: answer2,
            setAnswer: setAnswer2,
            checked: checked2,
            setChecked: setChecked2,
            correctAnswer: "C",
            explanation:
              "Well done! The <nav> element identifies a section containing navigation links.",
            wrongExplanation:
              "An article represents self-contained content, while a section groups related content. Which element is specifically for navigation?",
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
                      Lesson 8 Completed! ✓
                    </p>
                    <p className="mt-1 text-sm">
                      Congratulations! You've completed all eight HTML lessons.
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
                Answer both questions correctly to unlock lesson completion.
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
            <li><code>{"<header>"}</code> introduces page or section content.</li>
            <li><code>{"<nav>"}</code> groups navigation links.</li>
            <li><code>{"<main>"}</code> represents the main page content.</li>
            <li><code>{"<section>"}</code> groups related content.</li>
            <li><code>{"<article>"}</code> represents self-contained content.</li>
            <li><code>{"<footer>"}</code> contains footer information.</li>
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
            onClick={() => navigate("/courses/html/lesson-7")}
            className="rounded-xl border border-[#42213D] px-5 py-3 font-semibold text-[#42213D] hover:bg-[#F3E8F0]"
          >
            ← Previous Lesson
          </button>

          <button
            type="button"
            onClick={() => navigate("/courses/html/lessons")}
            className="rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white hover:bg-pink-700"
          >
            All HTML Lessons
          </button>
        </div>
      </div>
    </div>
  );
};

export default HTMLLesson8Page;

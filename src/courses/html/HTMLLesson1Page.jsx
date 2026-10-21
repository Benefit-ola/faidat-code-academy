
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TOTAL_LESSONS = 8;
const COMPLETED_KEY = "faidat-html-completed-lessons";

const HTMLLesson1Page = () => {
  const navigate = useNavigate();

  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(COMPLETED_KEY) || "[]"
      );

      if (!Array.isArray(saved)) return [];

      return [
        ...new Set(
          saved.filter(
            (id) =>
              Number.isInteger(id) &&
              id >= 1 &&
              id <= TOTAL_LESSONS
          )
        ),
      ];
    } catch {
      return [];
    }
  });

  const isCompleted = completedLessons.includes(1);

  const progress = Math.round(
    (completedLessons.length / TOTAL_LESSONS) * 100
  );

  const question1Options = [
    { letter: "A", text: "HyperText Markup Language" },
    { letter: "B", text: "HighText Machine Language" },
    { letter: "C", text: "HyperTool Making Language" },
    { letter: "D", text: "Home Tool Markup Language" },
  ];

  const question2Options = [
    { letter: "A", text: "<p>" },
    { letter: "B", text: "<h1>" },
    { letter: "C", text: "<img>" },
    { letter: "D", text: "<a>" },
  ];

  const bothCorrect = answer1 === "A" && answer2 === "B";

  const completeLesson = () => {
    if (!bothCorrect || isCompleted) return;

    const updated = [
      ...new Set([...completedLessons, 1]),
    ];

    try {
      localStorage.setItem(
        COMPLETED_KEY,
        JSON.stringify(updated)
      );

      setCompletedLessons(updated);
    } catch {
      window.alert(
        "Your lesson could not be saved. Please check your browser storage settings and try again."
      );
    }
  };

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
          Lesson 1: Introduction to HTML 🌐
        </h1>

        {/* COURSE PROGRESS */}
        <div className="mt-8 rounded-2xl border border-pink-200 bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-bold text-[#42213D]">
              Your learning journey 🌱
            </h2>

            <span className="font-bold text-pink-600">
              {progress}%
            </span>
          </div>

          <div
            className="mt-3 h-3 overflow-hidden rounded-full bg-pink-100"
            role="progressbar"
            aria-label="HTML course progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="h-full rounded-full bg-pink-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-2 text-sm text-[#65545F]">
            {completedLessons.length} of {TOTAL_LESSONS} lessons completed
          </p>
        </div>

        {/* INTRODUCTION */}
        <p className="mt-6 text-lg leading-8 text-[#65545F]">
          Welcome to your first HTML lesson! Today, you will discover
          what HTML is and why it is important in building websites.
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-[#42213D]">
            What is HTML?
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            HTML stands for HyperText Markup Language. It defines the
            structure and content of a webpage, such as headings,
            paragraphs, images, and links.
          </p>

          <div className="mt-5 rounded-xl bg-[#42213D] p-5">
            <p className="text-sm font-semibold text-pink-300">
              YOUR FIRST HTML EXAMPLE
            </p>

            <pre className="mt-3 overflow-x-auto text-white">
              <code>{"<h1>Welcome to my website!</h1>"}</code>
            </pre>
          </div>

          <h3 className="mt-6 text-xl font-bold text-[#42213D]">
            Understanding the code
          </h3>

          <p className="mt-3 leading-7 text-[#65545F]">
            The opening tag{" "}
            <code className="font-semibold text-pink-600">
              {"<h1>"}
            </code>{" "}
            tells the browser that a main heading begins here.
          </p>

          <p className="mt-3 leading-7 text-[#65545F]">
            The content is the text between the tags. In this example,{" "}
            <strong className="text-pink-600">
              Welcome to my website!
            </strong>{" "}
            is displayed as the heading.
          </p>

          <p className="mt-3 leading-7 text-[#65545F]">
            The closing tag{" "}
            <code className="font-semibold text-pink-600">
              {"</h1>"}
            </code>{" "}
            marks the end of the heading element.
          </p>
        </section>

        {/* TWO-QUESTION QUIZ */}
        <section className="mt-10 rounded-2xl border border-pink-200 bg-white p-6">
          <p className="text-sm font-semibold text-pink-600">
            LESSON 1 · PRACTICE
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#42213D]">
            Test Your Knowledge 🌱
          </h2>

          <p className="mt-2 text-[#65545F]">
            Answer both questions correctly to complete this lesson.
          </p>

          {/* QUESTION 1 */}
          <div className="mt-6">
            <h3 className="font-bold text-[#42213D]">
              Question 1 of 2
            </h3>

            <p className="mt-2 text-[#65545F]">
              What does HTML stand for?
            </p>

            <div className="mt-3 flex flex-col gap-3">
              {question1Options.map((option) => (
                <button
                  key={option.letter}
                  type="button"
                  onClick={() => {
                    setAnswer1(option.letter);
                    setChecked1(false);
                  }}
                  aria-pressed={answer1 === option.letter}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    answer1 === option.letter
                      ? "border-pink-600 bg-pink-100 text-pink-900"
                      : "border-pink-200 bg-white text-[#65545F] hover:bg-pink-50"
                  }`}
                >
                  {option.letter}. {option.text}
                  {answer1 === option.letter && " ✓"}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setChecked1(true)}
              disabled={!answer1}
              className="mt-4 rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Check Answer 1
            </button>

            {checked1 && (
              <div
                className={`mt-3 rounded-xl p-4 ${
                  answer1 === "A"
                    ? "bg-green-50 text-green-800"
                    : "bg-pink-50 text-pink-800"
                }`}
                role="status"
                aria-live="polite"
              >
                {answer1 === "A" ? (
                  <>
                    <p className="font-bold">Correct! 🎉</p>
                    <p className="mt-1 leading-6">
                      HTML means HyperText Markup Language. It structures
                      webpage content so browsers can display it.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-bold">Not quite! 💗</p>
                    <p className="mt-1 leading-6">
                      HTML stands for HyperText Markup Language.
                      Review the lesson and try again.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setAnswer1("");
                        setChecked1(false);
                      }}
                      className="mt-3 rounded-xl border border-pink-300 px-4 py-2 font-semibold text-pink-700 hover:bg-pink-50"
                    >
                      Try Again
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* QUESTION 2 */}
          <div className="mt-8 border-t border-pink-100 pt-6">
            <h3 className="font-bold text-[#42213D]">
              Question 2 of 2
            </h3>

            <p className="mt-2 text-[#65545F]">
              Which HTML tag creates a heading?
            </p>

            <div className="mt-3 flex flex-col gap-3">
              {question2Options.map((option) => (
                <button
                  key={option.letter}
                  type="button"
                  onClick={() => {
                    setAnswer2(option.letter);
                    setChecked2(false);
                  }}
                  aria-pressed={answer2 === option.letter}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    answer2 === option.letter
                      ? "border-pink-600 bg-pink-100 text-pink-900"
                      : "border-pink-200 bg-white text-[#65545F] hover:bg-pink-50"
                  }`}
                >
                  {option.letter}.{" "}
                  <code>{option.text}</code>
                  {answer2 === option.letter && " ✓"}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setChecked2(true)}
              disabled={!answer2}
              className="mt-4 rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Check Answer 2
            </button>

            {checked2 && (
              <div
                className={`mt-3 rounded-xl p-4 ${
                  answer2 === "B"
                    ? "bg-green-50 text-green-800"
                    : "bg-pink-50 text-pink-800"
                }`}
                role="status"
                aria-live="polite"
              >
                {answer2 === "B" ? (
                  <>
                    <p className="font-bold">Correct! 🎉</p>
                    <p className="mt-1 leading-6">
                      The {"<h1>"} tag creates a top-level heading.
                      HTML also provides {"<h2>"} through {"<h6>"}.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-bold">Not quite! 💗</p>
                    <p className="mt-1 leading-6">
                      The {"<h1>"} tag creates a top-level heading.
                      Review the options and try again.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setAnswer2("");
                        setChecked2(false);
                      }}
                      className="mt-3 rounded-xl border border-pink-300 px-4 py-2 font-semibold text-pink-700 hover:bg-pink-50"
                    >
                      Try Again
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* LESSON COMPLETION */}
          <div className="mt-8 border-t border-pink-100 pt-6">
            {bothCorrect ? (
              <>
                <p className="font-bold text-green-800">
                  Excellent! You answered both questions correctly. 🎉
                </p>

                <button
                  type="button"
                  onClick={completeLesson}
                  disabled={isCompleted}
                  className="mt-4 rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isCompleted
                    ? "Lesson Completed ✓"
                    : "Mark Lesson as Complete"}
                </button>

                {isCompleted && (
                  <p className="mt-3 text-[#65545F]">
                    Your lesson progress is saved in this browser.
                    Keep growing! 🌱
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-[#65545F]">
                Complete both questions correctly to unlock lesson
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
            HTML gives a webpage its structure. CSS styles it, and
            JavaScript adds interactive behaviour. You are learning
            the first building block of web development!
          </p>

          <button
            type="button"
            onClick={() => navigate("/courses/html/lessons")}
            className="mt-5 rounded-xl border border-pink-300 px-5 py-3 font-semibold text-pink-700 transition hover:bg-white"
          >
            Return to Lesson List →
          </button>
        </section>
      </div>
    </div>
  );
};

export default HTMLLesson1Page;

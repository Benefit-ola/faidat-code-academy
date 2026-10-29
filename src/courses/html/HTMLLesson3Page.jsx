
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const STORAGE_KEY = "faidat-html-completed-lessons";

const STARTER_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Learning Page</title>
</head>
<body>
  <h1>My Learning Journey</h1>

  <p>I am learning how to build websites with HTML.</p>

  <h2>What I Am Learning</h2>

  <p>HTML helps me organize the content of a webpage.</p>

  <h3>My Next Step</h3>

  <p>I will keep practising and improving my skills.</p>
</body>
</html>`;

const QUESTIONS = [
  {
    id: 1,
    question: "Which heading tag is the most important heading on a page?",
    options: [
      { value: "A", label: "<h1>" },
      { value: "B", label: "<p>" },
      { value: "C", label: "<h6>" },
      { value: "D", label: "<heading>" },
    ],
    correctAnswer: "A",
    explanation:
      "The <h1> element represents the main heading. It usually describes the main topic of the page.",
  },
  {
    id: 2,
    question: "Which HTML element is used to create a paragraph?",
    options: [
      { value: "A", label: "<heading>" },
      { value: "B", label: "<text>" },
      { value: "C", label: "<p>" },
      { value: "D", label: "<bodytext>" },
    ],
    correctAnswer: "C",
    explanation:
      "The <p> element represents a paragraph of text. It is used for sentences and blocks of written content.",
  },
  {
    id: 3,
    question: "Which heading normally comes directly after <h1> in a logical heading structure?",
    options: [
      { value: "A", label: "<h6>" },
      { value: "B", label: "<h2>" },
      { value: "C", label: "<p>" },
      { value: "D", label: "<h1>" },
    ],
    correctAnswer: "B",
    explanation:
      "An <h2> is commonly used for a main section beneath an <h1>. Use headings to organize content by importance, not simply to change text size.",
  },
];

function readCompletedLessons() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    return Array.isArray(saved)
      ? saved.filter((id) => Number.isInteger(id))
      : [];
  } catch {
    return [];
  }
}

function checkChallenge(code) {
  const hasH1 = /<h1(?:\s[^>]*)?>[\s\S]*?\S[\s\S]*?<\/h1>/i.test(code);
  const hasH2 = /<h2(?:\s[^>]*)?>[\s\S]*?\S[\s\S]*?<\/h2>/i.test(code);
  const hasH3 = /<h3(?:\s[^>]*)?>[\s\S]*?\S[\s\S]*?<\/h3>/i.test(code);

  const paragraphs = [
    ...code.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/gi),
  ];

  const hasTwoParagraphs =
    paragraphs.filter((match) => match[1].trim().length > 0).length >= 2;

  return {
    hasH1,
    hasH2,
    hasH3,
    hasTwoParagraphs,
    passed: hasH1 && hasH2 && hasH3 && hasTwoParagraphs,
  };
}

export default function HTMLLesson3Page() {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [code, setCode] = useState(STARTER_CODE);
  const [challengeChecked, setChallengeChecked] = useState(false);
  const [completed, setCompleted] = useState(() =>
    readCompletedLessons().includes(3)
  );

  const challengeResult = checkChallenge(code);

  const allQuestionsCorrect = QUESTIONS.every(
    (question) =>
      checkedQuestions[question.id] === true &&
      answers[question.id] === question.correctAnswer
  );

  const canCompleteLesson =
    allQuestionsCorrect &&
    challengeChecked &&
    challengeResult.passed;

  function checkAnswer(questionId) {
    const question = QUESTIONS.find((item) => item.id === questionId);

    if (!question || !answers[questionId]) return;

    setCheckedQuestions((previous) => ({
      ...previous,
      [questionId]: answers[questionId] === question.correctAnswer,
    }));
  }

  function handleAnswerChange(questionId, value) {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: value,
    }));

    setCheckedQuestions((previous) => ({
      ...previous,
      [questionId]: false,
    }));
  }

  function handleCheckChallenge() {
    setChallengeChecked(true);
  }

  function handleComplete() {
    if (!canCompleteLesson) return;

    try {
      const existingLessons = readCompletedLessons();

      const updatedLessons = [...new Set([...existingLessons, 3])];

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedLessons)
      );

      setCompleted(true);
    } catch {
      window.alert(
        "Your browser could not save your progress. Please check your browser storage settings and try again."
      );
      return;
    }
  }

  function renderQuestion(question) {
    const selectedAnswer = answers[question.id];
    const hasChecked = checkedQuestions[question.id] !== undefined;
    const isCorrect = checkedQuestions[question.id] === true;

    return (
      <section
        key={question.id}
        className="rounded-2xl border border-[#F0DFEB] bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 font-bold text-pink-700">
            {question.id}
          </span>

          <h3 className="font-semibold leading-relaxed text-[#42213D]">
            {question.question}
          </h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {question.options.map((option) => {
            const isSelected = selectedAnswer === option.value;

            return (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                  isSelected
                    ? "border-pink-500 bg-pink-50"
                    : "border-[#F0DFEB] hover:border-pink-300 hover:bg-pink-50/50"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.value}
                  checked={isSelected}
                  onChange={() =>
                    handleAnswerChange(question.id, option.value)
                  }
                  className="accent-pink-600"
                />

                <span className="font-medium text-[#42213D]">
                  <span className="mr-2 text-[#65545F]">
                    {option.value}.
                  </span>
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => checkAnswer(question.id)}
            disabled={!selectedAnswer}
            className="rounded-xl bg-[#42213D] px-5 py-2.5 font-semibold text-white transition hover:bg-[#603153] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Check Answer
          </button>
        </div>

        {hasChecked && (
          <div
            aria-live="polite"
            className={`mt-4 rounded-xl p-4 ${
              isCorrect
                ? "bg-emerald-50 text-emerald-800"
                : "bg-rose-50 text-rose-800"
            }`}
          >
            <p className="font-semibold">
              {isCorrect ? "Correct! 🎉" : "Not quite yet."}
            </p>

            <p className="mt-1 text-sm leading-relaxed">
              {isCorrect
                ? question.explanation
                : "Review the lesson, select another answer, and try again."}
            </p>
          </div>
        )}
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFAF3] px-4 py-8 text-[#42213D] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Navigation */}
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/courses/html/lessons"
            className="font-semibold text-[#65545F] transition hover:text-pink-700"
          >
            ← All HTML lessons
          </Link>

          <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-700">
            HTML Fundamentals · Lesson 3
          </span>
        </nav>

        {/* Lesson heading */}
        <header className="mb-8 rounded-3xl bg-gradient-to-br from-[#42213D] to-[#70405F] p-6 text-white shadow-md sm:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-pink-200">
            Your learning journey
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Headings and Paragraphs
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-white/85">
            Give your webpages structure and make your content easy to read.
            Today, you will practise organizing information using headings
            and paragraphs.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
              📚 Learn
            </span>
            <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
              🧠 Quiz
            </span>
            <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
              💻 Practise
            </span>
          </div>
        </header>

        {/* Learning objectives */}
        <section className="mb-8 rounded-2xl border border-[#F0DFEB] bg-white p-6">
          <h2 className="text-xl font-bold">What you will learn</h2>

          <ul className="mt-4 space-y-3 text-[#65545F]">
            <li className="flex gap-3">
              <span className="text-emerald-600">✓</span>
              Understand HTML heading elements from h1 to h6.
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-600">✓</span>
              Organize headings in a logical hierarchy.
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-600">✓</span>
              Use paragraphs to display written content.
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-600">✓</span>
              Build and preview a small HTML page.
            </li>
          </ul>
        </section>

        {/* Part 1 */}
        <section className="mb-8 rounded-2xl border border-[#F0DFEB] bg-white p-6 sm:p-8">
          <span className="text-sm font-bold uppercase tracking-wider text-pink-600">
            Part 1
          </span>

          <h2 className="mt-2 text-2xl font-bold">
            Understanding HTML headings
          </h2>

          <p className="mt-4 leading-7 text-[#65545F]">
            Headings describe the topics and sections of a webpage. HTML
            provides six heading elements: <code>{"<h1>"}</code> through{" "}
            <code>{"<h6>"}</code>. The number represents the heading level.
          </p>

          <div className="mt-6 space-y-3 rounded-2xl bg-[#FFFAF3] p-5">
            <div>
              <h3 className="text-3xl font-bold">h1 — Main heading</h3>
              <p className="mt-1 text-sm text-[#65545F]">
                Use it for the main topic of the page.
              </p>
            </div>

            <div className="border-t border-[#EBDDE7] pt-3">
              <h4 className="text-2xl font-bold">h2 — Section heading</h4>
              <p className="mt-1 text-sm text-[#65545F]">
                Use it for a major section beneath the main heading.
              </p>
            </div>

            <div className="border-t border-[#EBDDE7] pt-3">
              <h5 className="text-xl font-bold">h3 — Subsection heading</h5>
              <p className="mt-1 text-sm text-[#65545F]">
                Use it for a subsection within a section.
              </p>
            </div>

            <div className="border-t border-[#EBDDE7] pt-3">
              <p className="font-semibold">h4, h5 and h6</p>
              <p className="mt-1 text-sm leading-6 text-[#65545F]">
                These provide deeper heading levels when your content needs
                more sections and subsections.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border-l-4 border-pink-400 bg-pink-50 p-4">
            <p className="font-semibold">Remember this!</p>
            <p className="mt-1 text-sm leading-6 text-[#65545F]">
              Choose headings based on the structure of your content, not
              just their appearance. A heading is not the same thing as
              simply making text large or bold.
            </p>
          </div>

          <details className="mt-5 rounded-xl border border-[#F0DFEB] p-4">
            <summary className="cursor-pointer font-semibold">
              See a heading example
            </summary>

            <pre className="mt-4 overflow-x-auto rounded-xl bg-[#2B1A29] p-4 text-sm leading-7 text-pink-100">
              <code>{`<h1>My Website</h1>
<h2>About Me</h2>
<h3>My Hobbies</h3>`}</code>
            </pre>
          </details>
        </section>

        {/* Part 2 */}
        <section className="mb-8 rounded-2xl border border-[#F0DFEB] bg-white p-6 sm:p-8">
          <span className="text-sm font-bold uppercase tracking-wider text-pink-600">
            Part 2
          </span>

          <h2 className="mt-2 text-2xl font-bold">
            Understanding paragraphs
          </h2>

          <p className="mt-4 leading-7 text-[#65545F]">
            The <code>{"<p>"}</code> element represents a paragraph. Use it
            to group related sentences into readable blocks of text.
          </p>

          <div className="mt-5 rounded-2xl bg-[#FFFAF3] p-5">
            <pre className="overflow-x-auto rounded-xl bg-[#2B1A29] p-4 text-sm leading-7 text-pink-100">
              <code>{`<h1>About Me</h1>
<p>My name is Faidat.</p>
<p>I am learning web development.</p>`}</code>
            </pre>

            <div className="mt-5 rounded-xl border border-[#F0DFEB] bg-white p-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#65545F]">
                What the browser displays
              </p>

              <h3 className="text-2xl font-bold">About Me</h3>
              <p className="mt-3">My name is Faidat.</p>
              <p className="mt-3">I am learning web development.</p>
            </div>
          </div>

          <p className="mt-5 leading-7 text-[#65545F]">
            Notice that each paragraph begins on a new line with space
            around it by default. Later, you will learn how CSS can change
            the appearance and spacing of these elements.
          </p>
        </section>

        {/* Quiz */}
        <section className="mb-8 space-y-5">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-pink-600">
              Knowledge check
            </span>

            <h2 className="mt-2 text-2xl font-bold">
              Test what you have learned
            </h2>

            <p className="mt-2 text-[#65545F]">
              Choose an answer and check it before moving to the next
              question.
            </p>
          </div>

          {QUESTIONS.map(renderQuestion)}

          <div
            aria-live="polite"
            className="rounded-xl bg-pink-50 p-4 text-sm text-[#42213D]"
          >
            <p className="font-semibold">
              Quiz progress:{" "}
              {
                QUESTIONS.filter(
                  (question) =>
                    checkedQuestions[question.id] === true &&
                    answers[question.id] === question.correctAnswer
                ).length
              }{" "}
              of {QUESTIONS.length} correct
            </p>

            <p className="mt-1 text-[#65545F]">
              {allQuestionsCorrect
                ? "Excellent! You have answered every question correctly."
                : "You need to answer all three questions correctly to pass."}
            </p>
          </div>
        </section>

        {/* Coding challenge */}
        <section className="mb-8 rounded-2xl border border-[#F0DFEB] bg-white p-6 sm:p-8">
          <span className="text-sm font-bold uppercase tracking-wider text-pink-600">
            Your practical challenge
          </span>

          <h2 className="mt-2 text-2xl font-bold">
            Build your own learning page
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            Edit the starter code below. You can keep the existing content
            or change it to your own. Make sure your page contains:
          </p>

          <ul className="mt-4 space-y-2 text-[#65545F]">
            <li>• One non-empty main heading: h1.</li>
            <li>• One non-empty section heading: h2.</li>
            <li>• One non-empty subsection heading: h3.</li>
            <li>• At least two non-empty paragraphs.</li>
          </ul>

          <label
            htmlFor="html-challenge-editor"
            className="mt-6 block font-semibold"
          >
            Your HTML code
          </label>

          <textarea
            id="html-challenge-editor"
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
              setChallengeChecked(false);
            }}
            spellCheck={false}
            rows={18}
            className="mt-3 w-full resize-y rounded-xl border border-[#4C3548] bg-[#2B1A29] p-4 font-mono text-sm leading-6 text-pink-100 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
          />

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCheckChallenge}
              className="rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white transition hover:bg-pink-700"
            >
              Check My Code
            </button>

            <button
              type="button"
              onClick={() => {
                setCode(STARTER_CODE);
                setChallengeChecked(false);
              }}
              className="rounded-xl border border-[#EBDDE7] px-5 py-3 font-semibold text-[#42213D] transition hover:bg-pink-50"
            >
              Reset Code
            </button>
          </div>

          {challengeChecked && (
            <div
              aria-live="polite"
              className={`mt-5 rounded-xl p-4 ${
                challengeResult.passed
                  ? "bg-emerald-50 text-emerald-800"
                  : "bg-amber-50 text-amber-900"
              }`}
            >
              <p className="font-bold">
                {challengeResult.passed
                  ? "Challenge completed! 🎉"
                  : "Keep practising — you are getting there!"}
              </p>

              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  {challengeResult.hasH1 ? "✓" : "○"} Main h1 heading
                </li>
                <li>
                  {challengeResult.hasH2 ? "✓" : "○"} Section h2 heading
                </li>
                <li>
                  {challengeResult.hasH3 ? "✓" : "○"} Subsection h3 heading
                </li>
                <li>
                  {challengeResult.hasTwoParagraphs ? "✓" : "○"} At least
                  two non-empty paragraphs
                </li>
              </ul>

              {!challengeResult.passed && (
                <p className="mt-3 text-sm">
                  Make the missing changes in your code, then check it
                  again.
                </p>
              )}
            </div>
          )}

          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold">Live preview</h3>

              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                Updates as you type
              </span>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#EBDDE7] bg-white">
              <iframe
                title="HTML lesson 3 live preview"
                srcDoc={code}
                sandbox=""
                className="h-80 w-full bg-white"
              />
            </div>

            <p className="mt-3 text-sm leading-6 text-[#65545F]">
              The preview shows how your HTML appears in a browser. The
              challenge checker looks for the required tags; it is a
              beginner-friendly check, not a complete HTML validator.
            </p>
          </div>
        </section>

        {/* Completion */}
        <section className="mb-8 rounded-2xl border border-[#F0DFEB] bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Ready to complete Lesson 3?</h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            Make sure you have passed the quiz and checked a successful
            coding challenge. Your completed lesson will be saved in your
            browser.
          </p>

          <div className="mt-5 space-y-3">
            <p className="flex items-center gap-3">
              <span>{allQuestionsCorrect ? "✅" : "⬜"}</span>
              All quiz questions answered correctly
            </p>

            <p className="flex items-center gap-3">
              <span>
                {challengeChecked && challengeResult.passed ? "✅" : "⬜"}
              </span>
              Coding challenge checked and passed
            </p>
          </div>

          {completed && (
            <div
              aria-live="polite"
              className="mt-5 rounded-xl bg-emerald-50 p-4 text-emerald-800"
            >
              <p className="font-bold">Lesson 3 completed! 🎉</p>
              <p className="mt-1 text-sm">
                Great work. You can review this lesson or continue learning.
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleComplete}
              disabled={!canCompleteLesson || completed}
              className="rounded-xl bg-[#42213D] px-6 py-3 font-semibold text-white transition hover:bg-[#603153] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {completed ? "Lesson Completed ✓" : "Complete Lesson"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/courses/html/lesson-2")}
              className="rounded-xl border border-[#EBDDE7] px-6 py-3 font-semibold text-[#42213D] transition hover:bg-pink-50"
            >
              ← Previous Lesson
            </button>

            <button
              type="button"
              onClick={() => navigate("/courses/html/lesson-4")}
              disabled={!completed}
              className="rounded-xl bg-pink-100 px-6 py-3 font-semibold text-pink-800 transition hover:bg-pink-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next Lesson →
            </button>
          </div>

          {!canCompleteLesson && !completed && (
            <p className="mt-4 text-sm text-[#65545F]">
              Finish both parts above to unlock the completion button.
            </p>
          )}
        </section>

        <footer className="pb-6 text-center text-sm text-[#65545F]">
          Faidat Code Academy · Learn HTML one step at a time 🌱
        </footer>
      </div>
    </main>
  );
}

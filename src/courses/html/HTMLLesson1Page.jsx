
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TOTAL_LESSONS = 8;
const COMPLETED_KEY = "faidat-html-completed-lessons";

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

function getCompletedLessons() {
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
}

function HTMLLesson1Page() {
  const navigate = useNavigate();

  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const [htmlCode, setHtmlCode] = useState(
    "<h1>About Me</h1>\n<p>I am learning HTML!</p>\n<h2>My Goals</h2>"
  );

  const [challengeChecked, setChallengeChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const [completedLessons, setCompletedLessons] = useState(
    getCompletedLessons
  );

  const isCompleted = completedLessons.includes(1);

  const progress = Math.round(
    (completedLessons.length / TOTAL_LESSONS) * 100
  );

  const bothCorrect = answer1 === "A" && answer2 === "B";

  // Check that the learner has included all three challenge elements.
  const challengePassed =
    /<h1\b[^>]*>\s*About Me\s*<\/h1>/i.test(htmlCode) &&
    /<p\b[^>]*>[\s\S]*?\S[\s\S]*?<\/p>/i.test(htmlCode) &&
    /<h2\b[^>]*>\s*My Goals\s*<\/h2>/i.test(htmlCode);

  const canCompleteLesson =
    checked1 &&
    checked2 &&
    bothCorrect &&
    challengeChecked &&
    challengePassed;

  function handleComplete() {
    if (!canCompleteLesson || isCompleted) return;

    const updated = [
      ...new Set([...getCompletedLessons(), 1]),
    ].sort((a, b) => a - b);

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
  }

  function updateCode(value) {
    setHtmlCode(value);
    setChallengeChecked(false);
    setShowHint(false);
  }

  function resetCode() {
    setHtmlCode(
      "<h1>About Me</h1>\n<p>I am learning HTML!</p>\n<h2>My Goals</h2>"
    );
    setChallengeChecked(false);
    setShowHint(false);
  }

  function checkChallenge() {
    setChallengeChecked(true);

    if (!challengePassed) {
      setShowHint(true);
    }
  }

  const buttonClass =
    "rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <main className="min-h-screen bg-[#FFFAF3] p-5 pt-10 text-[#42213D] md:p-10">
      <div className="mx-auto max-w-5xl">

        {/* PAGE HEADER */}
        <button
          type="button"
          onClick={() => navigate("/courses/html/lessons")}
          className="mb-6 font-semibold text-pink-600 hover:text-pink-700"
        >
          ← Back to HTML lessons
        </button>

        <header className="rounded-3xl bg-[#42213D] p-6 text-white sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-pink-200">
            Faidat Code Academy · HTML Fundamentals
          </p>

          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
            Lesson 1: Introduction to HTML 🌐
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-pink-50">
            Welcome to your first coding lesson! Discover how HTML
            gives webpages their structure, explore examples, and
            create your first simple webpage.
          </p>

          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-white/10 px-3 py-1">
              Beginner
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1">
              Lesson + quiz + coding
            </span>
          </div>
        </header>

        {/* COURSE PROGRESS */}
        <section className="mt-8 rounded-2xl border border-pink-200 bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-bold">
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
        </section>

        {/* SECTION 1: WHAT IS HTML? */}
        <section className="mt-8 rounded-3xl border border-[#F0E5EC] bg-white p-5 sm:p-7">
          <p className="text-sm font-bold uppercase tracking-wide text-pink-600">
            Section 1
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            What is HTML?
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            HTML stands for{" "}
            <strong className="text-[#42213D]">
              HyperText Markup Language
            </strong>
            . It is the language used to organise the content of
            webpages, including headings, paragraphs, images, and links.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <article className="rounded-2xl bg-[#FFF0F6] p-4">
              <span className="text-2xl">📝</span>
              <h3 className="mt-2 font-bold">Headings</h3>
              <p className="mt-1 text-sm leading-6 text-[#65545F]">
                Give a page titles and section headings.
              </p>
            </article>

            <article className="rounded-2xl bg-[#F3E8F0] p-4">
              <span className="text-2xl">📄</span>
              <h3 className="mt-2 font-bold">Paragraphs</h3>
              <p className="mt-1 text-sm leading-6 text-[#65545F]">
                Organise sentences and written information.
              </p>
            </article>

            <article className="rounded-2xl bg-[#D9F3E7] p-4">
              <span className="text-2xl">🔗</span>
              <h3 className="mt-2 font-bold">Links</h3>
              <p className="mt-1 text-sm leading-6 text-[#65545F]">
                Connect visitors to other pages or websites.
              </p>
            </article>
          </div>

          <div className="mt-5 rounded-2xl bg-[#42213D] p-5">
            <p className="text-sm font-semibold text-pink-300">
              YOUR FIRST HTML EXAMPLE
            </p>

            <pre className="mt-3 overflow-x-auto text-sm leading-7 text-white">
              <code>{"<h1>Welcome to my website!</h1>"}</code>
            </pre>
          </div>

          <div className="mt-5 rounded-2xl border border-pink-100 p-4">
            <h3 className="font-bold">Understanding the example</h3>

            <p className="mt-3 leading-7 text-[#65545F]">
              The <code className="text-pink-600">&lt;h1&gt;</code>{" "}
              is the opening tag. It tells the browser that a main
              heading begins.
            </p>

            <p className="mt-3 leading-7 text-[#65545F]">
              <strong>Welcome to my website!</strong> is the content
              that appears on the page.
            </p>

            <p className="mt-3 leading-7 text-[#65545F]">
              The <code className="text-pink-600">&lt;/h1&gt;</code>{" "}
              is the closing tag. It marks the end of the heading.
            </p>
          </div>
        </section>

        
    
        {/* SECTION 2: A FIRST LOOK AT HTML ELEMENTS */}
        <section className="mt-8 rounded-3xl border border-[#F0E5EC] bg-white p-5 sm:p-7">
          <p className="text-sm font-bold uppercase tracking-wide text-pink-600">
            Section 2
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            A first look at HTML elements
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            HTML uses elements to tell the browser what different
            pieces of webpage content are. For example, we use
            headings for titles and paragraphs for written information.
          </p>

          <div className="mt-5 rounded-2xl bg-[#42213D] p-5">
            <p className="text-sm font-semibold text-pink-300">
              LOOK AT THIS EXAMPLE
            </p>

            <pre className="mt-3 overflow-x-auto text-sm leading-7 text-white">
              <code>{"<h1>My First Website</h1>\n<p>I am learning HTML!</p>"}</code>
            </pre>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl bg-[#FFF0F6] p-4">
              <h3 className="font-bold">The heading</h3>
              <p className="mt-2 text-sm leading-6 text-[#65545F]">
                The <code>&lt;h1&gt;</code> element creates the main
                heading: My First Website.
              </p>
            </article>

            <article className="rounded-2xl bg-[#D9F3E7] p-4">
              <h3 className="font-bold">The paragraph</h3>
              <p className="mt-2 text-sm leading-6 text-[#65545F]">
                The <code>&lt;p&gt;</code> element contains the
                sentence I am learning HTML!
              </p>
            </article>
          </div>

          <div className="mt-5 rounded-2xl border border-pink-100 p-4">
            <h3 className="font-bold">Remember this 🌱</h3>
            <p className="mt-2 leading-7 text-[#65545F]">
              HTML elements help organise content. You will learn
              more about how tags work as you practise building webpages.
              In the next lesson, you will discover how these elements
              fit inside a complete HTML document.
            </p>
          </div>
        </section>


        {/* SECTION 3: COMMON HTML TAGS */}
        <section className="mt-8 rounded-3xl border border-[#F0E5EC] bg-white p-5 sm:p-7">
          <p className="text-sm font-bold uppercase tracking-wide text-pink-600">
            Section 3
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Meet some common HTML tags
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-pink-100 p-4">
              <code className="font-bold text-pink-600">&lt;h1&gt;</code>
              <h3 className="mt-2 font-bold">Main heading</h3>
              <p className="mt-1 text-sm leading-6 text-[#65545F]">
                Introduces the main topic of a page.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-[#42213D] p-3 text-sm text-white">
                <code>{"<h1>About Me</h1>"}</code>
              </pre>
            </article>

            <article className="rounded-2xl border border-pink-100 p-4">
              <code className="font-bold text-pink-600">&lt;h2&gt;</code>
              <h3 className="mt-2 font-bold">Section heading</h3>
              <p className="mt-1 text-sm leading-6 text-[#65545F]">
                Introduces a section within a page.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-[#42213D] p-3 text-sm text-white">
                <code>{"<h2>My Goals</h2>"}</code>
              </pre>
            </article>

            <article className="rounded-2xl border border-pink-100 p-4">
              <code className="font-bold text-pink-600">&lt;p&gt;</code>
              <h3 className="mt-2 font-bold">Paragraph</h3>
              <p className="mt-1 text-sm leading-6 text-[#65545F]">
                Contains a block of text.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-[#42213D] p-3 text-sm text-white">
                <code>{"<p>I love learning.</p>"}</code>
              </pre>
            </article>

            <article className="rounded-2xl border border-pink-100 p-4">
              <code className="font-bold text-pink-600">&lt;a&gt;</code>
              <h3 className="mt-2 font-bold">Link</h3>
              <p className="mt-1 text-sm leading-6 text-[#65545F]">
                Uses the href attribute to specify a destination.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-[#42213D] p-3 text-sm text-white">
                <code>{'<a href="/">Home</a>'}</code>
              </pre>
            </article>
          </div>
        </section>

        {/* SECTION 4: KNOWLEDGE CHECK */}
        <section className="mt-8 rounded-3xl border border-[#F0E5EC] bg-white p-5 sm:p-7">
          <p className="text-sm font-bold uppercase tracking-wide text-pink-600">
            Section 4
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Test your knowledge 🌱
          </h2>

          <p className="mt-2 text-[#65545F]">
            Select an answer for each question and check it to see
            your feedback.
          </p>

          {/* QUESTION 1 */}
          <div className="mt-6">
            <h3 className="font-bold">Question 1 of 2</h3>
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
                  className={`rounded-xl border p-3 text-left transition ${
                    answer1 === option.letter
                      ? "border-pink-600 bg-pink-100"
                      : "border-pink-200 hover:bg-pink-50"
                  }`}
                >
                  {option.letter}. {option.text}
                  {answer1 === option.letter ? " ✓" : ""}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setChecked1(true)}
              disabled={!answer1}
              className={`mt-4 ${buttonClass}`}
            >
              Check Answer 1
            </button>

            {checked1 && (
              <div
                role="status"
                className={`mt-3 rounded-xl p-4 ${
                  answer1 === "A"
                    ? "bg-green-50 text-green-800"
                    : "bg-pink-50 text-pink-800"
                }`}
              >
                <p className="font-bold">
                  {answer1 === "A" ? "Correct! 🎉" : "Not quite! 💗"}
                </p>
                <p className="mt-1 leading-6">
                  HTML stands for HyperText Markup Language. It
                  describes the structure of webpage content.
                </p>

                {answer1 !== "A" && (
                  <button
                    type="button"
                    onClick={() => {
                      setAnswer1("");
                      setChecked1(false);
                    }}
                    className="mt-3 rounded-lg border border-pink-300 px-4 py-2 font-semibold"
                  >
                    Try Again
                  </button>
                )}
              </div>
            )}
          </div>

          {/* QUESTION 2 */}
          <div className="mt-8 border-t border-pink-100 pt-6">
            <h3 className="font-bold">Question 2 of 2</h3>
            <p className="mt-2 text-[#65545F]">
              Which HTML tag creates a main heading?
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
                  className={`rounded-xl border p-3 text-left transition ${
                    answer2 === option.letter
                      ? "border-pink-600 bg-pink-100"
                      : "border-pink-200 hover:bg-pink-50"
                  }`}
                >
                  {option.letter}. <code>{option.text}</code>
                  {answer2 === option.letter ? " ✓" : ""}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setChecked2(true)}
              disabled={!answer2}
              className={`mt-4 ${buttonClass}`}
            >
              Check Answer 2
            </button>

            {checked2 && (
              <div
                role="status"
                className={`mt-3 rounded-xl p-4 ${
                  answer2 === "B"
                    ? "bg-green-50 text-green-800"
                    : "bg-pink-50 text-pink-800"
                }`}
              >
                <p className="font-bold">
                  {answer2 === "B" ? "Correct! 🎉" : "Not quite! 💗"}
                </p>
                <p className="mt-1 leading-6">
                  The <code>&lt;h1&gt;</code> tag creates a main
                  heading. HTML provides heading levels from
                  <code> &lt;h1&gt;</code> to <code>&lt;h6&gt;</code>.
                </p>

                {answer2 !== "B" && (
                  <button
                    type="button"
                    onClick={() => {
                      setAnswer2("");
                      setChecked2(false);
                    }}
                    className="mt-3 rounded-lg border border-pink-300 px-4 py-2 font-semibold"
                  >
                    Try Again
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* SECTION 5: LIVE CODING PLAYGROUND */}
        <section className="mt-8 rounded-3xl border border-[#F0E5EC] bg-white p-5 sm:p-7">
          <p className="text-sm font-bold uppercase tracking-wide text-pink-600">
            Section 5
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Build your first webpage 💻
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            Change the code below. Try replacing the heading with
            your name or writing a paragraph about something you enjoy.
            Your preview updates as you type.
          </p>

          <label
            htmlFor="html-playground"
            className="mt-5 block font-semibold"
          >
            Your HTML code
          </label>

          <textarea
            id="html-playground"
            value={htmlCode}
            onChange={(event) => updateCode(event.target.value)}
            spellCheck={false}
            rows={7}
            className="mt-3 w-full resize-y rounded-xl border border-pink-200 bg-[#42213D] p-4 font-mono text-sm leading-6 text-white outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
          />

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-bold">Live preview</h3>

            <button
              type="button"
              onClick={resetCode}
              className="rounded-xl border border-pink-300 px-4 py-2 text-sm font-semibold text-pink-700 hover:bg-pink-50"
            >
              Reset Code
            </button>
          </div>

          <iframe
            title="HTML practice preview"
            sandbox=""
            srcDoc={`<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body {
  font-family: Arial, sans-serif;
  color: #42213D;
  padding: 16px;
  overflow-wrap: anywhere;
}
img { max-width: 100%; height: auto; }
</style>
</head>
<body>${htmlCode}</body>
</html>`}
            className="mt-3 h-64 w-full rounded-xl border border-[#D9F3E7] bg-white"
          />

          <p className="mt-2 text-xs leading-5 text-[#65545F]">
            This is a practice preview. It displays your HTML inside
            a sandboxed frame.
          </p>
        </section>

        {/* SECTION 6: CODING CHALLENGE */}
        <section className="mt-8 rounded-3xl border border-[#F0E5EC] bg-white p-5 sm:p-7">
          <p className="text-sm font-bold uppercase tracking-wide text-pink-600">
            Section 6
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Coding mission: About Me 🎯
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            Use the editor above to create a simple introduction
            webpage. Complete all three tasks.
          </p>

          <div className="mt-5 space-y-3">
            <article className="rounded-xl bg-[#F3E8F0] p-4">
              <h3 className="font-bold">Task 1: Your main heading</h3>
              <p className="mt-1 text-sm leading-6 text-[#65545F]">
                Create an <code>&lt;h1&gt;</code> element containing
                the words About Me.
              </p>
            </article>

            <article className="rounded-xl bg-[#F3E8F0] p-4">
              <h3 className="font-bold">Task 2: Introduce yourself</h3>
              <p className="mt-1 text-sm leading-6 text-[#65545F]">
                Add a paragraph with some information about yourself.
              </p>
            </article>

            <article className="rounded-xl bg-[#F3E8F0] p-4">
              <h3 className="font-bold">Task 3: Add your goals</h3>
              <p className="mt-1 text-sm leading-6 text-[#65545F]">
                Create an <code>&lt;h2&gt;</code> element containing
                the words My Goals.
              </p>
            </article>
          </div>

          <button
            type="button"
            onClick={() => setShowHint((previous) => !previous)}
            aria-expanded={showHint}
            className="mt-5 rounded-xl border border-pink-300 px-5 py-3 font-semibold text-pink-700 hover:bg-pink-50"
          >
            {showHint ? "Hide Hint" : "Need a Hint? 💡"}
          </button>

          {showHint && (
            <div className="mt-4 rounded-xl border border-pink-200 bg-pink-50 p-4">
              <h3 className="font-bold">Here's a little help 🌱</h3>

              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6">
                <li>
                  Use <code>&lt;h1&gt;About Me&lt;/h1&gt;</code> for
                  the main heading.
                </li>
                <li>
                  Put your introduction inside <code>&lt;p&gt;</code> tags.
                </li>
                <li>
                  Use <code>&lt;h2&gt;My Goals&lt;/h2&gt;</code> for
                  the goals heading.
                </li>
                <li>Remember to close each heading and paragraph tag.</li>
              </ul>
            </div>
          )}

          <button
            type="button"
            onClick={checkChallenge}
            className={`mt-5 w-full ${buttonClass}`}
          >
            Check My Challenge
          </button>

          {challengeChecked && (
            <div
              role="status"
              className={`mt-4 rounded-xl p-4 ${
                challengePassed
                  ? "bg-green-50 text-green-800"
                  : "bg-pink-50 text-pink-800"
              }`}
            >
              {challengePassed ? (
                <>
                  <p className="font-bold">Amazing! You did it! 🎉</p>
                  <p className="mt-1 leading-6">
                    Your code includes the required main heading,
                    paragraph, and goals heading. Try personalising
                    the text to make the page your own.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-bold">Almost there! 🌱</p>
                  <p className="mt-1 leading-6">
                    Check that your code includes an h1 heading saying
                    About Me, a non-empty paragraph, and an h2 heading
                    saying My Goals. Then check again.
                  </p>
                </>
              )}
            </div>
          )}

          <p className="mt-3 text-xs leading-5 text-[#65545F]">
            The challenge checker looks for the required HTML patterns.
            It is a beginner exercise, not a complete HTML validator.
          </p>
        </section>

        {/* LESSON COMPLETION */}
        <section className="mt-8 rounded-3xl border border-[#F0E5EC] bg-white p-5 sm:p-7">
          <p className="text-sm font-bold uppercase tracking-wide text-pink-600">
            YOUR PROGRESS
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Complete Lesson 1
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            To complete this lesson, check both quiz answers and pass
            the coding challenge.
          </p>

          <div className="mt-5 space-y-2 text-sm">
            <p className={checked1 && checked2 && bothCorrect ? "text-green-700" : "text-[#65545F]"}>
              {checked1 && checked2 && bothCorrect ? "✓" : "○"} Both quiz answers checked and correct
            </p>

            <p className={challengeChecked && challengePassed ? "text-green-700" : "text-[#65545F]"}>
              {challengeChecked && challengePassed ? "✓" : "○"} Coding challenge checked and passed
            </p>
          </div>

          {isCompleted ? (
            <div className="mt-5 rounded-2xl bg-[#D9F3E7] p-4">
              <h3 className="font-bold text-green-900">
                Lesson 1 completed! 🎉
              </h3>
              <p className="mt-1 text-sm leading-6 text-green-900">
                Your progress is saved in this browser. Keep growing
                your coding skills!
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              disabled={!canCompleteLesson}
              className={`mt-5 ${buttonClass}`}
            >
              Mark Lesson as Complete
            </button>
          )}

          {!canCompleteLesson && !isCompleted && (
            <p className="mt-3 text-sm text-[#65545F]">
              Complete both activities above to unlock this button.
            </p>
          )}
        </section>

        {/* LESSON SUMMARY */}
        <section className="mt-8 rounded-2xl bg-[#F3E8F0] p-6">
          <h2 className="text-xl font-bold">
            Remember what you learned 🌱
          </h2>

          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-[#65545F]">
            <li>HTML stands for HyperText Markup Language.</li>
            <li>HTML gives webpages their structure.</li>
            <li>Tags are written inside angle brackets.</li>
            <li>Headings and paragraphs organise webpage content.</li>
            <li>You can experiment with HTML using the live preview.</li>
          </ul>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate("/courses/html/lessons")}
              className="rounded-xl border border-pink-300 px-5 py-3 font-semibold text-pink-700 hover:bg-white"
            >
              Return to Lesson List →
            </button>

            <button
              type="button"
              onClick={() => navigate("/courses/html/lesson-2")}
              className="rounded-xl bg-[#42213D] px-5 py-3 font-semibold text-white hover:bg-[#583052]"
            >
              Continue to Lesson 2 →
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default HTMLLesson1Page;

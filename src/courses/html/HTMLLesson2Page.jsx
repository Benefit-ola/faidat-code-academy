
import { useState } from "react";
import { Link } from "react-router-dom";

const COMPLETED_KEY = "faidat-html-completed-lessons";

const STARTER_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Personal Website</title>
</head>
<body>
  <h1>Welcome to My Website</h1>
  <p>I am learning how to build websites.</p>
</body>
</html>`;

const QUESTIONS = [
  {
    question: "1. What does <!DOCTYPE html> do?",
    options: [
      "Creates a heading",
      "Tells the browser to use modern HTML",
      "Displays the page title",
      "Creates the page body",
    ],
    answer: 1,
    explanation:
      "The declaration tells the browser to interpret the document using the modern HTML standard. It is not an ordinary HTML element.",
  },
  {
    question: "2. Where should the <title> element go?",
    options: [
      "Inside <body>",
      "Inside <p>",
      "Inside <head>",
      "After </html>",
    ],
    answer: 2,
    explanation:
      "The title belongs inside the head section. Its text usually appears in the browser tab.",
  },
  {
    question: "3. Why do we use the viewport meta element?",
    options: [
      "To make every heading bold",
      "To create a background colour",
      "To add a navigation link",
      "To help the page adapt to different screen widths",
    ],
    answer: 3,
    explanation:
      "The viewport setting helps the browser display the page at an appropriate width on phones and other devices.",
  },
  {
    question: "4. Which statement about <head> and <body> is correct?",
    options: [
      "Both belong inside <html>",
      "<html> belongs inside <body>",
      "<head> must come after </html>",
      "<body> contains the browser tab title",
    ],
    answer: 0,
    explanation:
      "The head and body are the two main sections of a standard HTML document. Both belong inside the html element.",
  },
];

function readCompletedLessons() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(COMPLETED_KEY) || "[]"
    );

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function checkDocumentStructure(code) {
  const hasDoctype = /<!doctype\s+html\s*>/i.test(code);
  const hasHtml = /<html\b[^>]*>[\s\S]*<\/html\s*>/i.test(code);
  const hasHead = /<head\b[^>]*>[\s\S]*<\/head\s*>/i.test(code);
  const hasBody = /<body\b[^>]*>[\s\S]*<\/body\s*>/i.test(code);

  const hasTitle =
    /<title\b[^>]*>\s*\S[\s\S]*?<\/title\s*>/i.test(code);

  const hasCharset =
    /<meta\b[^>]*charset\s*=\s*["']?utf-8["']?[^>]*>/i.test(code);

  const hasViewport =
    /<meta\b[^>]*name\s*=\s*["']viewport["'][^>]*content\s*=\s*["'][^"']*width\s*=\s*device-width[^"']*["'][^>]*>/i.test(code) ||
    /<meta\b[^>]*content\s*=\s*["'][^"']*width\s*=\s*device-width[^"']*["'][^>]*name\s*=\s*["']viewport["'][^>]*>/i.test(code);

  const hasHeading =
    /<h1\b[^>]*>\s*\S[\s\S]*?<\/h1\s*>/i.test(code);

  const hasParagraph =
    /<p\b[^>]*>\s*\S[\s\S]*?<\/p\s*>/i.test(code);

  return {
    hasDoctype,
    hasHtml,
    hasHead,
    hasBody,
    hasTitle,
    hasCharset,
    hasViewport,
    hasHeading,
    hasParagraph,
  };
}

export default function HTMLLesson2Page() {
  const [code, setCode] = useState(STARTER_CODE);
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [challengeChecked, setChallengeChecked] = useState(false);
  const [completed, setCompleted] = useState(() =>
    readCompletedLessons().includes(2)
  );
  const [saveError, setSaveError] = useState("");

  const score = QUESTIONS.reduce(
    (total, question, index) =>
      total + (answers[index] === question.answer ? 1 : 0),
    0
  );

  const hasPassedQuiz =
    quizSubmitted && score === QUESTIONS.length;

  const structure = checkDocumentStructure(code);

  const requirements = [
    {
      label: "Begin with the HTML document declaration",
      passed: structure.hasDoctype,
    },
    {
      label: "Wrap the document in the html element",
      passed: structure.hasHtml,
    },
    {
      label: "Include a head section",
      passed: structure.hasHead,
    },
    {
      label: "Give the page a non-empty title",
      passed: structure.hasTitle,
    },
    {
      label: "Include UTF-8 character encoding",
      passed: structure.hasCharset,
    },
    {
      label: "Include the responsive viewport setting",
      passed: structure.hasViewport,
    },
    {
      label: "Include a body section",
      passed: structure.hasBody,
    },
    {
      label: "Add a non-empty h1 heading",
      passed: structure.hasHeading,
    },
    {
      label: "Add a non-empty paragraph",
      passed: structure.hasParagraph,
    },
  ];

  const hasCompleteStructure = requirements.every(
    (requirement) => requirement.passed
  );

  const canCompleteLesson =
    hasPassedQuiz &&
    challengeChecked &&
    hasCompleteStructure;

  function handleQuizSubmit() {
    setQuizSubmitted(true);
  }

  function handleChallengeCheck() {
    setChallengeChecked(true);
  }

  function handleCompleteLesson() {
    if (!canCompleteLesson) return;

    try {
      const saved = readCompletedLessons();
      const updated = [...new Set([...saved, 2])];

      localStorage.setItem(
        COMPLETED_KEY,
        JSON.stringify(updated)
      );

      setCompleted(true);
      setSaveError("");
    } catch {
      setSaveError(
        "Your work passed, but progress could not be saved. Check your browser storage settings."
      );
    }
  }

  function handleCodeChange(event) {
    setCode(event.target.value);
    setChallengeChecked(false);
    setSaveError("");
  }

  function resetCode() {
    setCode(STARTER_CODE);
    setChallengeChecked(false);
    setSaveError("");
  }

  const sectionClass =
    "mb-8 rounded-2xl border border-[#F0E5E8] bg-white p-5 shadow-sm sm:p-7";

  const headingClass =
    "mb-3 text-xl font-bold text-[#42213D] sm:text-2xl";

  const bodyClass =
    "leading-7 text-[#65545F]";

  const codeClass =
    "rounded bg-[#FCE7F3] px-1.5 py-0.5 font-mono text-sm text-pink-800";

  return (
    <main className="min-h-screen bg-[#FFFAF3] px-4 py-8 text-[#42213D] sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/courses/html"
          className="mb-6 inline-flex font-semibold text-pink-700 hover:text-pink-900"
        >
          ← Back to HTML Lessons
        </Link>

        <header className="mb-8 rounded-3xl bg-[#42213D] p-6 text-white sm:p-9">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-pink-200">
            HTML Fundamentals · Lesson 2
          </p>

          <h1 className="mb-3 text-3xl font-extrabold sm:text-4xl">
            Building a Complete HTML Document
          </h1>

          <p className="max-w-2xl leading-7 text-[#FCE7F3]">
            You already know how HTML tags create content. Now,
            learn how to organize those elements into a complete
            webpage that a browser can understand.
          </p>

          <div className="mt-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm text-pink-100">
            Beginner · Learn, practise and build
          </div>
        </header>

        <section className={sectionClass}>
          <h2 className={headingClass}>
            1. From HTML elements to a complete document
          </h2>

          <p className={bodyClass}>
            In Lesson 1, you learned that HTML uses elements such
            as headings and paragraphs to organize content.
            But a complete webpage needs more than individual
            elements. It also needs a document structure.
          </p>

          <p className={`mt-3 ${bodyClass}`}>
            Think of a document like a house. The content is what
            people use and see, while the structure organizes
            everything and gives it a proper place.
          </p>

          <div className="mt-5 rounded-xl bg-[#FCE7F3] p-4">
            <p className="font-bold">Your goal in this lesson</p>
            <p className="mt-2 leading-7 text-[#65545F]">
              By the end, you should be able to explain the main
              parts of an HTML document and build one yourself
              without copying the starter template.
            </p>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>
            2. Understand the document structure
          </h2>

          <p className={`mb-5 ${bodyClass}`}>
            Each part has a different responsibility. Select
            each explanation below as you study the structure.
          </p>

          <div className="space-y-4">
            <details className="rounded-xl border border-[#F0E5E8] p-4">
              <summary className="cursor-pointer font-bold">
                A. The document declaration
              </summary>
              <div className="mt-3">
                <code className={codeClass}>
                  {"<!DOCTYPE html>"}
                </code>
                <p className={`mt-3 ${bodyClass}`}>
                  This belongs at the beginning of the document.
                  It tells the browser to use modern HTML
                  standards. It is a declaration, not a regular
                  HTML element.
                </p>
              </div>
            </details>

            <details className="rounded-xl border border-[#F0E5E8] p-4">
              <summary className="cursor-pointer font-bold">
                B. The root html element
              </summary>
              <div className="mt-3">
                <code className={codeClass}>
                  {'<html lang="en"> ... </html>'}
                </code>
                <p className={`mt-3 ${bodyClass}`}>
                  This wraps the main document sections.
                  The <code className={codeClass}>lang</code>{" "}
                  attribute identifies the document language.
                  For an English page, we use{" "}
                  <code className={codeClass}>lang="en"</code>.
                </p>
              </div>
            </details>

            <details className="rounded-xl border border-[#F0E5E8] p-4">
              <summary className="cursor-pointer font-bold">
                C. The head section
              </summary>
              <div className="mt-3">
                <code className={codeClass}>
                  {"<head> ... </head>"}
                </code>
                <p className={`mt-3 ${bodyClass}`}>
                  The head contains information about the
                  document, including its title, character
                  encoding and viewport settings. Most of this
                  information is not displayed as the main
                  webpage content.
                </p>
              </div>
            </details>

            <details className="rounded-xl border border-[#F0E5E8] p-4">
              <summary className="cursor-pointer font-bold">
                D. The title element
              </summary>
              <div className="mt-3">
                <code className={codeClass}>
                  {"<title>My Website</title>"}
                </code>
                <p className={`mt-3 ${bodyClass}`}>
                  The title belongs inside the head. It usually
                  identifies your page in the browser tab. It is
                  different from an{" "}
                  <code className={codeClass}>h1</code> heading
                  displayed inside the webpage.
                </p>
              </div>
            </details>

            <details className="rounded-xl border border-[#F0E5E8] p-4">
              <summary className="cursor-pointer font-bold">
                E. Character encoding
              </summary>
              <div className="mt-3">
                <code className={codeClass}>
                  {'<meta charset="UTF-8">'}
                </code>
                <p className={`mt-3 ${bodyClass}`}>
                  UTF-8 supports a wide range of characters,
                  including many languages and symbols. Adding
                  this setting helps prevent text from being
                  displayed incorrectly.
                </p>
              </div>
            </details>

            <details className="rounded-xl border border-[#F0E5E8] p-4">
              <summary className="cursor-pointer font-bold">
                F. The viewport setting
              </summary>
              <div className="mt-3">
                <code className={codeClass}>
                  {'<meta name="viewport" content="width=device-width, initial-scale=1.0">'}
                </code>
                <p className={`mt-3 ${bodyClass}`}>
                  This helps the browser match the page width
                  to the device width. It is important when
                  building websites that work well on phones,
                  tablets and computers.
                </p>
              </div>
            </details>

            <details className="rounded-xl border border-[#F0E5E8] p-4">
              <summary className="cursor-pointer font-bold">
                G. The body section
              </summary>
              <div className="mt-3">
                <code className={codeClass}>
                  {"<body> ... </body>"}
                </code>
                <p className={`mt-3 ${bodyClass}`}>
                  This contains the main content of the page,
                  such as headings, paragraphs, images, links
                  and other elements visitors interact with.
                </p>
              </div>
            </details>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>
            3. See how everything fits together
          </h2>

          <p className={`mb-4 ${bodyClass}`}>
            Study the indentation. Notice that the head and
            body are inside html, while the title and meta
            elements are inside head.
          </p>

          <pre className="overflow-x-auto rounded-xl bg-[#2D1B2E] p-5 text-sm leading-7 text-pink-100">
            <code>{STARTER_CODE}</code>
          </pre>

          <div className="mt-5 rounded-xl bg-[#FFFAF3] p-4">
            <h3 className="mb-2 font-bold">
              Why does indentation matter?
            </h3>
            <p className={bodyClass}>
              Indentation makes it easier to see which elements
              belong inside other elements. Browsers can often
              display HTML even when indentation is poor, but
              neatly organized code is easier to read, debug
              and maintain.
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-[#F0E5E8] p-4">
            <h3 className="mb-2 font-bold">
              Quick thinking question
            </h3>
            <p className={bodyClass}>
              If you want text to appear inside the webpage,
              which section should contain it: head or body?
            </p>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>
            4. Knowledge check
          </h2>

          <p className={`mb-5 ${bodyClass}`}>
            Answer all four questions. Submit your answers to
            see your score and explanations. You need all four
            correct to pass.
          </p>

          <div className="space-y-6">
            {QUESTIONS.map((question, index) => (
              <fieldset
                key={question.question}
                className="rounded-xl border border-[#F0E5E8] p-4"
              >
                <legend className="px-1 font-bold">
                  {question.question}
                </legend>

                <div className="mt-3 space-y-3">
                  {question.options.map((option, optionIndex) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-start gap-3 rounded-lg bg-[#FFFAF3] p-3 hover:bg-pink-50"
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        checked={answers[index] === optionIndex}
                        onChange={() => {
                          setAnswers((previous) => ({
                            ...previous,
                            [index]: optionIndex,
                          }));
                          setQuizSubmitted(false);
                        }}
                        className="mt-1 accent-pink-600"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>

                {quizSubmitted && (
                  <p
                    className={`mt-3 text-sm leading-6 ${
                      answers[index] === question.answer
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {answers[index] === question.answer
                      ? "Correct! "
                      : `Not quite. The correct answer is ${question.options[question.answer]}. `}
                    {question.explanation}
                  </p>
                )}
              </fieldset>
            ))}
          </div>

          <button
            type="button"
            onClick={handleQuizSubmit}
            disabled={
              Object.keys(answers).length !== QUESTIONS.length
            }
            className="mt-5 rounded-xl bg-pink-600 px-5 py-3 font-bold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit Quiz
          </button>

          {quizSubmitted && (
            <p
              className="mt-4 font-semibold"
              aria-live="polite"
            >
              Your score: {score}/{QUESTIONS.length}.{" "}
              {hasPassedQuiz
                ? "Excellent! You passed the quiz. 🎉"
                : "Review the explanations, change your answers and try again."}
            </p>
          )}
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>
            5. Coding challenge: Build your own webpage
          </h2>

          <p className={`mb-4 ${bodyClass}`}>
            Now it is your turn. Create a complete HTML
            document about yourself, your school or your
            favourite hobby. You can use the starter code as a
            reference, but try to make your own changes.
          </p>

          <div className="mb-5 rounded-xl bg-[#FCE7F3] p-4 text-sm leading-6 text-[#42213D]">
            <p className="mb-2 font-bold">Your challenge checklist</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Start with the HTML document declaration.</li>
              <li>Include the opening and closing html elements.</li>
              <li>Keep the head and body inside html.</li>
              <li>Add a meaningful title inside head.</li>
              <li>Include UTF-8 character encoding.</li>
              <li>Include the viewport setting.</li>
              <li>Add your own h1 heading and paragraph inside body.</li>
              <li>Keep your code neatly indented.</li>
            </ul>
          </div>

          <label
            htmlFor="html-document-editor"
            className="mb-2 block font-bold"
          >
            Your HTML code
          </label>

          <textarea
            id="html-document-editor"
            value={code}
            onChange={handleCodeChange}
            spellCheck={false}
            rows={18}
            className="w-full rounded-xl border border-[#DCCBD7] bg-[#2D1B2E] p-4 font-mono text-sm leading-6 text-pink-100 outline-none focus:ring-2 focus:ring-pink-500"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleChallengeCheck}
              className="rounded-xl bg-[#42213D] px-5 py-3 font-bold text-white hover:bg-[#593052]"
            >
              Check My Structure
            </button>

            <button
              type="button"
              onClick={resetCode}
              className="rounded-xl border border-[#DCCBD7] px-5 py-3 font-bold text-[#42213D] hover:bg-pink-50"
            >
              Reset Code
            </button>
          </div>

          {challengeChecked && (
            <div
              className={`mt-4 rounded-xl p-4 ${
                hasCompleteStructure
                  ? "bg-green-50 text-green-800"
                  : "bg-amber-50 text-amber-900"
              }`}
              aria-live="polite"
            >
              <p className="font-bold">
                {hasCompleteStructure
                  ? "Great work! Your document passed the structure checks. 🎉"
                  : "You are making progress! Check the items below."}
              </p>

              <ul className="mt-3 space-y-2 text-sm">
                {requirements.map((requirement) => (
                  <li
                    key={requirement.label}
                    className="flex items-start gap-2"
                  >
                    <span aria-hidden="true">
                      {requirement.passed ? "✓" : "○"}
                    </span>
                    <span>{requirement.label}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-3 text-sm leading-6">
                {hasCompleteStructure
                  ? "All required elements were found. Review the preview to see how your page looks."
                  : "Use this checklist to identify what is missing, edit your code and check again."}
              </p>
            </div>
          )}

          <h3 className="mb-3 mt-7 text-lg font-bold">
            Live preview
          </h3>

          <p className={`mb-3 text-sm ${bodyClass}`}>
            Your preview updates as you type. Scripts are
            disabled in this isolated preview.
          </p>

          <iframe
            title="Your HTML document preview"
            srcDoc={code}
            sandbox=""
            className="h-64 w-full rounded-xl border border-[#DCCBD7] bg-white"
          />

          <button
            type="button"
            onClick={handleCompleteLesson}
            disabled={!canCompleteLesson || completed}
            className="mt-6 w-full rounded-xl bg-pink-600 px-5 py-3 font-bold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {completed
              ? "Lesson 2 Completed ✓"
              : "Complete Lesson 2"}
          </button>

          {!hasPassedQuiz && (
            <p className="mt-2 text-sm text-[#65545F]">
              Pass the quiz to unlock lesson completion.
            </p>
          )}

          {hasPassedQuiz &&
            (!challengeChecked || !hasCompleteStructure) && (
              <p className="mt-2 text-sm text-[#65545F]">
                Finish the coding challenge and click Check My
                Structure before completing the lesson.
              </p>
            )}

          {saveError && (
            <p className="mt-3 text-sm text-red-700" role="alert">
              {saveError}
            </p>
          )}

          {completed && (
            <div className="mt-4 rounded-xl bg-green-50 p-4 text-green-800">
              <p className="font-bold">Lesson complete! 🎉</p>
              <p className="mt-1 text-sm">
                You are ready to learn more about headings and
                paragraphs in Lesson 3.
              </p>
              <Link
                to="/courses/html/lesson-3"
                className="mt-3 inline-block font-bold underline"
              >
                Continue to Lesson 3 →
              </Link>
            </div>
          )}
        </section>

        <nav className="flex flex-wrap items-center justify-between gap-3 pb-8">
          <Link
            to="/courses/html/lesson-1"
            className="rounded-xl border border-[#DCCBD7] px-4 py-3 font-semibold hover:bg-pink-50"
          >
            ← Previous Lesson
          </Link>

          <Link
            to="/courses/html/lesson-3"
            className="rounded-xl bg-[#42213D] px-4 py-3 font-semibold text-white hover:bg-[#593052]"
          >
            Next Lesson: Headings and Paragraphs →
          </Link>
        </nav>
      </div>
    </main>
  );
}

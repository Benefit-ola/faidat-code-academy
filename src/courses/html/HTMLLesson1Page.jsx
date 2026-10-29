import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ---------------------------------------------------------------------------
// Lesson settings
// ---------------------------------------------------------------------------
const LESSON_ID = 1;
const TOTAL_LESSONS = 8;
const COMPLETED_KEY = "faidat-html-completed-lessons";

const STARTER_CODE =
  "<h1>Hello, world!</h1>\n<p>This is my first webpage.</p>";

const objectives = [
  "Explain what HTML is and what it does for a webpage.",
  "Read and write HTML tags and elements.",
  "Understand what an attribute is.",
  "Spot and fix common beginner mistakes.",
  "Build a small webpage in the live playground.",
];

const outline = [
  { id: "what-is-html", title: "What is HTML?" },
  { id: "tags-elements", title: "Tags and elements" },
  { id: "attributes", title: "Attributes" },
  { id: "common-tags", title: "Common tags" },
  { id: "mistakes", title: "Comments and common mistakes" },
  { id: "toolkit", title: "Create a real HTML file" },
  { id: "quiz", title: "Test your knowledge" },
  { id: "playground", title: "Practice playground" },
  { id: "challenge", title: "Coding mission" },
];

const webLanguages = [
  {
    icon: "🦴",
    name: "HTML",
    job: "Structure and content",
    text: "Decides what is on the page: headings, paragraphs, links, and images. Think of it as the skeleton.",
    bg: "bg-[#FFF0F6]",
  },
  {
    icon: "🎨",
    name: "CSS",
    job: "Style and layout",
    text: "Decides how the page looks: colours, fonts, spacing, and layout. Think of it as the clothes and decoration.",
    bg: "bg-[#F3E8F0]",
  },
  {
    icon: "⚡",
    name: "JavaScript",
    job: "Behaviour",
    text: "Decides how the page reacts: menus, buttons, and games. Think of it as the movement.",
    bg: "bg-[#D9F3E7]",
  },
];

const browserSteps = [
  {
    title: "You write HTML",
    text: "You type tags and text into a file that ends in .html.",
  },
  {
    title: "The browser reads it",
    text: "Chrome, Safari, Firefox, or Edge reads your file from top to bottom.",
  },
  {
    title: "The page appears",
    text: "The browser turns your tags into the headings, text, and images you see.",
  },
];

const commonTags = [
  {
    tag: "<h1>",
    name: "Main heading",
    text: "Introduces the main topic of the page. Use one per page.",
    code: "<h1>About Me</h1>",
    lesson: "Lesson 3",
  },
  {
    tag: "<h2>",
    name: "Section heading",
    text: "Introduces a section. Headings go from <h1> (biggest) to <h6> (smallest).",
    code: "<h2>My Goals</h2>",
    lesson: "Lesson 3",
  },
  {
    tag: "<p>",
    name: "Paragraph",
    text: "Holds a block of normal text.",
    code: "<p>I love learning.</p>",
    lesson: "Lesson 3",
  },
  {
    tag: "<a>",
    name: "Link",
    text: "Takes visitors to another page. The href attribute holds the destination.",
    code: '<a href="https://example.com">Visit</a>',
    lesson: "Lesson 4",
  },
  {
    tag: "<img>",
    name: "Image",
    text: "Shows a picture. It has no closing tag because it holds no text.",
    code: '<img src="cat.jpg" alt="A sleeping cat">',
    lesson: "Lesson 4",
  },
  {
    tag: "<ul>",
    name: "Bulleted list",
    text: "Groups items. Each item sits inside an <li> element.",
    code: "<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>",
    lesson: "Lesson 5",
  },
];

const mistakes = [
  {
    title: "Forgetting the closing tag",
    wrong: "<p>I love coding",
    right: "<p>I love coding</p>",
    why: "Without </p>, the browser has to guess where the paragraph ends.",
  },
  {
    title: "Using the wrong slash",
    wrong: "<h1>Hello<\\h1>",
    right: "<h1>Hello</h1>",
    why: "Closing tags use a forward slash (/), not a backslash (\\).",
  },
  {
    title: "Missing a quotation mark",
    wrong: '<a href="https://example.com>Visit</a>',
    right: '<a href="https://example.com">Visit</a>',
    why: "Attribute values need an opening and a closing quotation mark.",
  },
  {
    title: "Misspelling a tag",
    wrong: "<hl>Welcome</hl>",
    right: "<h1>Welcome</h1>",
    why: "That first one is a lowercase L, not the number 1. Browsers ignore tags they do not recognise, so the text shows up as plain text.",
  },
];

const toolkitSteps = [
  "Install a free code editor such as Visual Studio Code.",
  "Create a new file and name it index.html. The .html ending is important.",
  "Type your HTML into the file and save it.",
  "Double-click the file to open it in your browser.",
  "Change the code, save, and refresh the browser to see your changes.",
];

const quizQuestions = [
  {
    id: "q1",
    prompt: "What does HTML stand for?",
    options: [
      { id: "a", text: "HyperText Markup Language" },
      { id: "b", text: "HighText Machine Language" },
      { id: "c", text: "HyperTool Making Language" },
      { id: "d", text: "Home Tool Markup Language" },
    ],
    correct: "a",
    explanation:
      "HTML stands for HyperText Markup Language. 'Markup' means we mark up content with tags to describe what each part is.",
  },
  {
    id: "q2",
    prompt: "What is the main job of HTML on a webpage?",
    options: [
      { id: "a", text: "Adding colours and layouts" },
      { id: "b", text: "Describing the structure and content" },
      { id: "c", text: "Making buttons respond to clicks" },
      { id: "d", text: "Storing information on a server" },
    ],
    correct: "b",
    explanation:
      "HTML gives a page its structure and content. CSS handles the style, and JavaScript handles the behaviour.",
  },
  {
    id: "q3",
    prompt: "Which tag creates a main heading?",
    code: true,
    options: [
      { id: "a", text: "<p>" },
      { id: "b", text: "<h1>" },
      { id: "c", text: "<img>" },
      { id: "d", text: "<a>" },
    ],
    correct: "b",
    explanation:
      "The <h1> tag creates the main heading. HTML has six heading levels, from <h1> to <h6>.",
  },
  {
    id: "q4",
    prompt: "Which one is the correct closing tag for a paragraph?",
    code: true,
    options: [
      { id: "a", text: "<p/>" },
      { id: "b", text: "<\\p>" },
      { id: "c", text: "</p>" },
      { id: "d", text: "<end p>" },
    ],
    correct: "c",
    explanation:
      "A closing tag is the same as the opening tag with a forward slash after the first angle bracket: </p>.",
  },
  {
    id: "q5",
    prompt: 'In <a href="https://example.com">Visit</a>, what is href?',
    options: [
      { id: "a", text: "A closing tag" },
      { id: "b", text: "An attribute" },
      { id: "c", text: "The content of the element" },
      { id: "d", text: "A comment" },
    ],
    correct: "b",
    explanation:
      "href is an attribute. Attributes give extra information about an element, and they go inside the opening tag.",
  },
];

const snippets = [
  { label: "+ Heading 2", code: "<h2>A new section</h2>" },
  { label: "+ Paragraph", code: "<p>Write something here.</p>" },
  { label: "+ Link", code: '<a href="https://example.com">A link</a>' },
  { label: "+ Comment", code: "<!-- This note is only for me -->" },
];

const challengeTasks = [
  {
    id: "h1",
    label: "An <h1> heading that says About Me",
    test: (code) => /<h1\b[^>]*>\s*About Me\s*<\/h1>/i.test(code),
  },
  {
    id: "p",
    label: "A paragraph with some text about you",
    test: (code) =>
      [...code.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].some(
        (match) => match[1].replace(/<[^>]*>/g, "").trim().length > 0
      ),
  },
  {
    id: "h2",
    label: "An <h2> heading that says My Goals",
    test: (code) => /<h2\b[^>]*>\s*My Goals\s*<\/h2>/i.test(code),
  },
];

const keyTerms = [
  ["Element", "A complete piece of HTML: opening tag, content, and closing tag."],
  ["Tag", "A keyword in angle brackets, such as <p> or </p>."],
  ["Attribute", "Extra information inside an opening tag, such as href."],
  ["Browser", "The program that reads HTML and shows the webpage."],
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function getCompletedLessons() {
  try {
    const saved = JSON.parse(localStorage.getItem(COMPLETED_KEY) || "[]");

    if (!Array.isArray(saved)) return [];

    return [
      ...new Set(
        saved.filter(
          (id) => Number.isInteger(id) && id >= 1 && id <= TOTAL_LESSONS
        )
      ),
    ];
  } catch {
    return [];
  }
}

// Build the document shown inside the sandboxed preview frame.
function buildPreview(code) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body { font-family: Arial, sans-serif; color: #42213D; padding: 16px; overflow-wrap: anywhere; }
img { max-width: 100%; height: auto; }
a { pointer-events: none; }
</style>
</head>
<body>${code}</body>
</html>`;
}

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600";

const primaryButton = `rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`;

const secondaryButton = `rounded-xl border border-pink-300 px-5 py-3 font-semibold text-pink-800 transition hover:bg-pink-50 ${focusRing}`;

// ---------------------------------------------------------------------------
// Small reusable pieces
// ---------------------------------------------------------------------------
const Section = ({ id, number, title, children }) => (
  <section
    id={id}
    aria-labelledby={`${id}-title`}
    className="mt-8 scroll-mt-6 rounded-3xl border border-[#F0E5EC] bg-white p-5 sm:p-7"
  >
    <p className="text-sm font-bold uppercase tracking-wide text-pink-700">
      Section {number}
    </p>
    <h2 id={`${id}-title`} className="mt-2 text-2xl font-bold">
      {title}
    </h2>
    {children}
  </section>
);

const Code = ({ children }) => (
  <code className="rounded bg-[#F8F2F6] px-1.5 py-0.5 text-[0.9em] font-semibold text-pink-800">
    {children}
  </code>
);

const CodeBlock = ({ label, code }) => (
  <div className="mt-4 rounded-2xl bg-[#42213D] p-5">
    {label && (
      <p className="text-xs font-semibold uppercase tracking-wide text-pink-200">
        {label}
      </p>
    )}
    <pre className="mt-3 overflow-x-auto text-sm leading-7 text-white">
      <code>{code}</code>
    </pre>
  </div>
);

const calloutTones = {
  tip: { bg: "bg-[#D9F3E7]", text: "text-[#1F4F3F]", icon: "💡" },
  note: { bg: "bg-[#FFF0F6]", text: "text-[#5A2A4A]", icon: "📌" },
  warning: { bg: "bg-amber-50", text: "text-amber-900", icon: "⚠️" },
};

const Callout = ({ tone = "note", title, children }) => {
  const style = calloutTones[tone];

  return (
    <div className={`mt-5 rounded-2xl p-4 ${style.bg} ${style.text}`}>
      <p className="font-bold">
        <span aria-hidden="true">{style.icon} </span>
        {title}
      </p>
      <div className="mt-1 text-sm leading-6">{children}</div>
    </div>
  );
};

// Multiple-choice quiz with per-question feedback.
const Quiz = ({ questions, onResultChange }) => {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState({});

  const correctCount = questions.filter(
    (q) => checked[q.id] && answers[q.id] === q.correct
  ).length;

  const allCorrect = correctCount === questions.length;

  useEffect(() => {
    onResultChange(allCorrect);
  }, [allCorrect, onResultChange]);

  const choose = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    setChecked((prev) => ({ ...prev, [questionId]: false }));
  };

  const retry = (questionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: "" }));
    setChecked((prev) => ({ ...prev, [questionId]: false }));
  };

  return (
    <div className="mt-6 space-y-8">
      {questions.map((q, index) => {
        const selected = answers[q.id];
        const isChecked = checked[q.id];
        const isCorrect = selected === q.correct;

        return (
          <fieldset
            key={q.id}
            className={index > 0 ? "border-t border-pink-100 pt-6" : ""}
          >
            <legend className="font-bold">
              <span className="block text-xs font-semibold uppercase tracking-wide text-pink-700">
                Question {index + 1} of {questions.length}
              </span>
              <span className="mt-1 block">{q.prompt}</span>
            </legend>

            <div className="mt-3 flex flex-col gap-3">
              {q.options.map((option) => {
                const isSelected = selected === option.id;

                let optionStyle = "border-pink-200 hover:bg-pink-50";
                if (isSelected && !isChecked)
                  optionStyle = "border-pink-600 bg-pink-100";
                if (isSelected && isChecked)
                  optionStyle = isCorrect
                    ? "border-green-600 bg-green-50"
                    : "border-red-400 bg-red-50";

                return (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-pink-600 ${optionStyle}`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={option.id}
                      checked={isSelected}
                      onChange={() => choose(q.id, option.id)}
                      className="h-4 w-4 accent-pink-600"
                    />
                    <span>
                      <span className="font-semibold uppercase">
                        {option.id}.{" "}
                      </span>
                      {q.code ? <Code>{option.text}</Code> : option.text}
                    </span>
                  </label>
                );
              })}
            </div>

            {!(isChecked && isCorrect) && (
              <button
                type="button"
                onClick={() => setChecked((prev) => ({ ...prev, [q.id]: true }))}
                disabled={!selected}
                className={`mt-4 ${primaryButton}`}
              >
                Check answer
              </button>
            )}

            {isChecked && (
              <div
                role="status"
                className={`mt-3 rounded-xl p-4 ${
                  isCorrect
                    ? "bg-green-50 text-green-900"
                    : "bg-pink-50 text-pink-900"
                }`}
              >
                <p className="font-bold">
                  {isCorrect ? "✓ Correct! 🎉" : "Not quite yet 💗"}
                </p>
                <p className="mt-1 leading-6">{q.explanation}</p>

                {!isCorrect && (
                  <button
                    type="button"
                    onClick={() => retry(q.id)}
                    className={`mt-3 rounded-lg border border-pink-300 px-4 py-2 font-semibold ${focusRing}`}
                  >
                    Try again
                  </button>
                )}
              </div>
            )}
          </fieldset>
        );
      })}

      <p
        className={`rounded-xl p-4 text-sm font-semibold ${
          allCorrect ? "bg-green-50 text-green-900" : "bg-[#F8F2F6] text-[#65545F]"
        }`}
      >
        {allCorrect
          ? "🎉 Quiz complete! You answered every question correctly."
          : `${correctCount} of ${questions.length} questions answered correctly so far.`}
      </p>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Lesson page
// ---------------------------------------------------------------------------
function HTMLLesson1Page() {
  const [completedLessons, setCompletedLessons] = useState(getCompletedLessons);
  const [saveError, setSaveError] = useState(false);

  const [quizPassed, setQuizPassed] = useState(false);
  const handleQuizResult = useCallback((passed) => setQuizPassed(passed), []);

  const [htmlCode, setHtmlCode] = useState(STARTER_CODE);
  const [challengeChecked, setChallengeChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const isCompleted = completedLessons.includes(LESSON_ID);

  const progress = Math.round(
    (completedLessons.length / TOTAL_LESSONS) * 100
  );

  const taskResults = challengeTasks.map((task) => ({
    ...task,
    passed: task.test(htmlCode),
  }));

  const challengePassed = taskResults.every((task) => task.passed);
  const challengeDone = challengeChecked && challengePassed;
  const canCompleteLesson = quizPassed && challengeDone;

  function updateCode(value) {
    setHtmlCode(value);
    setChallengeChecked(false);
  }

  function resetCode() {
    setHtmlCode(STARTER_CODE);
    setChallengeChecked(false);
    setShowHint(false);
  }

  function addSnippet(snippet) {
    updateCode(`${htmlCode.replace(/\s+$/, "")}\n${snippet}`);
  }

  function checkChallenge() {
    setChallengeChecked(true);
    if (!challengePassed) setShowHint(true);
  }

  function handleComplete() {
    if (!canCompleteLesson || isCompleted) return;

    const updated = [
      ...new Set([...getCompletedLessons(), LESSON_ID]),
    ].sort((a, b) => a - b);

    try {
      localStorage.setItem(COMPLETED_KEY, JSON.stringify(updated));
      setCompletedLessons(updated);
      setSaveError(false);
    } catch {
      setSaveError(true);
    }
  }

  return (
    <main className="min-h-screen bg-[#FFFAF3] p-5 pt-20 text-[#42213D] md:p-10">
      <div className="mx-auto max-w-5xl">
        {/* PAGE HEADER */}
        <Link
          to="/courses/html/lessons"
          className={`mb-6 inline-block rounded font-semibold text-pink-700 hover:text-pink-900 ${focusRing}`}
        >
          ← Back to HTML lessons
        </Link>

        <header className="rounded-3xl bg-[#42213D] p-6 text-white sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-pink-200">
            Code Garden · HTML Fundamentals
          </p>

          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
            Lesson 1: Introduction to HTML <span aria-hidden="true">🌐</span>
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-pink-50">
            Welcome to your first coding lesson! Discover how HTML
            gives webpages their structure, learn how tags and
            elements work, and build your first simple webpage.
          </p>

          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-white/10 px-3 py-1">
              Beginner
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1">
              About 30 minutes
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1">
              Lesson + quiz + coding
            </span>
          </div>
        </header>

        {/* COURSE PROGRESS */}
        <section
          aria-label="Course progress"
          className="mt-8 rounded-2xl border border-pink-200 bg-white p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="font-bold">
              Your learning journey <span aria-hidden="true">🌱</span>
            </p>
            <span className="font-bold text-pink-700">{progress}%</span>
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

        {/* OBJECTIVES AND OUTLINE */}
        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-[#F0E5EC] bg-white p-5 sm:p-7">
            <h2 className="text-xl font-bold">
              By the end of this lesson you will…
            </h2>

            <ul className="mt-4 space-y-3">
              {objectives.map((objective) => (
                <li key={objective} className="flex gap-3">
                  <span aria-hidden="true" className="font-bold text-pink-700">
                    ✓
                  </span>
                  <span className="leading-6 text-[#65545F]">{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          <nav
            aria-label="Lesson outline"
            className="rounded-3xl border border-[#F0E5EC] bg-white p-5 sm:p-7"
          >
            <h2 className="text-xl font-bold">In this lesson</h2>

            <ol className="mt-4 space-y-2">
              {outline.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`flex gap-3 rounded text-[#65545F] hover:text-pink-800 ${focusRing}`}
                  >
                    <span className="w-5 font-semibold text-pink-700">
                      {index + 1}.
                    </span>
                    <span className="underline-offset-2 hover:underline">
                      {item.title}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </section>

        {/* SECTION 1: WHAT IS HTML? */}
        <Section id="what-is-html" number={1} title="What is HTML?">
          <p className="mt-3 leading-7 text-[#65545F]">
            HTML stands for{" "}
            <strong className="text-[#42213D]">
              HyperText Markup Language
            </strong>
            . It is the language used to organise the content of
            webpages, including headings, paragraphs, images, and
            links. Every website you have ever visited is built on
            HTML.
          </p>

          <p className="mt-3 leading-7 text-[#65545F]">
            To "mark up" content means to add labels that describe
            what each piece is. You tell the browser "this is a
            heading" or "this is a paragraph", and the browser knows
            how to show it.
          </p>

          <h3 className="mt-6 text-lg font-bold">
            The three languages of the web
          </h3>

          <p className="mt-2 leading-7 text-[#65545F]">
            Websites are built from three languages that work
            together. Imagine building a person: HTML is the skeleton,
            CSS is the clothing, and JavaScript is the movement. You
            will learn all three in this academy, starting with HTML.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {webLanguages.map((language) => (
              <article
                key={language.name}
                className={`rounded-2xl p-4 ${language.bg}`}
              >
                <span aria-hidden="true" className="text-2xl">
                  {language.icon}
                </span>
                <h4 className="mt-2 font-bold">{language.name}</h4>
                <p className="text-xs font-semibold uppercase tracking-wide text-pink-800">
                  {language.job}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#65545F]">
                  {language.text}
                </p>
              </article>
            ))}
          </div>

          <h3 className="mt-6 text-lg font-bold">
            How does a browser use HTML?
          </h3>

          <ol className="mt-3 grid gap-4 sm:grid-cols-3">
            {browserSteps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-pink-100 p-4"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="mt-3 font-bold">{step.title}</p>
                <p className="mt-1 text-sm leading-6 text-[#65545F]">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>

          <Callout tone="note" title="Good to know">
            HTML is a markup language, not a programming language. It
            describes content instead of making decisions or doing
            calculations, which makes it a gentle place to start.
          </Callout>
        </Section>

        {/* SECTION 2: TAGS AND ELEMENTS */}
        <Section id="tags-elements" number={2} title="Tags and elements">
          <p className="mt-3 leading-7 text-[#65545F]">
            HTML is written with <strong>tags</strong>. A tag is a
            keyword inside angle brackets, like <Code>{"<p>"}</Code>.
            Most tags come in pairs: one to start and one to end.
            Together with the content between them, they form an{" "}
            <strong>element</strong>.
          </p>

          <div className="mt-5 rounded-2xl bg-[#42213D] p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-pink-200">
              Anatomy of an element
            </p>

            <pre className="mt-3 overflow-x-auto text-lg leading-8">
              <code>
                <span className="text-pink-300">{"<p>"}</span>
                <span className="text-[#9BE3C3]">Hello, world!</span>
                <span className="text-amber-200">{"</p>"}</span>
              </code>
            </pre>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <article className="rounded-2xl bg-[#FFF0F6] p-4">
              <h3 className="font-bold">Opening tag</h3>
              <p className="mt-1 text-sm font-semibold text-pink-800">
                {"<p>"}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#65545F]">
                Tells the browser that a paragraph starts here.
              </p>
            </article>

            <article className="rounded-2xl bg-[#D9F3E7] p-4">
              <h3 className="font-bold">Content</h3>
              <p className="mt-1 text-sm font-semibold text-[#1F6B52]">
                Hello, world!
              </p>
              <p className="mt-2 text-sm leading-6 text-[#65545F]">
                The text that visitors will see on the page.
              </p>
            </article>

            <article className="rounded-2xl bg-amber-50 p-4">
              <h3 className="font-bold">Closing tag</h3>
              <p className="mt-1 text-sm font-semibold text-amber-900">
                {"</p>"}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#65545F]">
                The slash (/) tells the browser the paragraph ends here.
              </p>
            </article>
          </div>

          <CodeBlock
            label="Two elements together"
            code={"<h1>My First Website</h1>\n<p>I am learning HTML!</p>"}
          />

          <p className="mt-4 leading-7 text-[#65545F]">
            The <Code>{"<h1>"}</Code> element creates the main
            heading and the <Code>{"<p>"}</Code> element holds a
            sentence of text. The browser shows the heading large and
            bold, and the paragraph as normal text.
          </p>

          <Callout tone="tip" title="Handy rules">
            <ul className="list-disc space-y-1 pl-5">
              <li>
                Tag names are written in lowercase by convention:{" "}
                <Code>{"<p>"}</Code>, not <Code>{"<P>"}</Code>.
              </li>
              <li>
                Some elements, such as <Code>{"<img>"}</Code> and{" "}
                <Code>{"<br>"}</Code>, have no content, so they have
                no closing tag.
              </li>
              <li>
                Extra spaces and blank lines in your code are ignored
                by the browser. Use them to keep your code tidy.
              </li>
            </ul>
          </Callout>
        </Section>

        {/* SECTION 3: ATTRIBUTES */}
        <Section id="attributes" number={3} title="Attributes">
          <p className="mt-3 leading-7 text-[#65545F]">
            Sometimes a tag needs extra information. An{" "}
            <strong>attribute</strong> gives that information. It goes
            inside the opening tag and is written as a name, an equals
            sign, and a value in quotation marks.
          </p>

          <div className="mt-5 rounded-2xl bg-[#42213D] p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-pink-200">
              A link with an attribute
            </p>

            <pre className="mt-3 overflow-x-auto text-sm leading-8">
              <code>
                <span className="text-pink-300">{"<a "}</span>
                <span className="text-amber-200">href</span>
                <span className="text-white">=</span>
                <span className="text-[#9BE3C3]">
                  {'"https://example.com"'}
                </span>
                <span className="text-pink-300">{">"}</span>
                <span className="text-white">Visit my site</span>
                <span className="text-pink-300">{"</a>"}</span>
              </code>
            </pre>
          </div>

          <ul className="mt-4 space-y-2 leading-7 text-[#65545F]">
            <li>
              <Code>a</Code> is the tag name. It makes a link.
            </li>
            <li>
              <Code>href</Code> is the attribute name. It means
              "hypertext reference", the link's destination.
            </li>
            <li>
              <Code>{'"https://example.com"'}</Code> is the attribute
              value. It is the address the link goes to.
            </li>
            <li>
              <strong>Visit my site</strong> is the content people
              click on.
            </li>
          </ul>

          <Callout tone="note" title="Remember">
            Attributes always go in the opening tag, never in the
            closing tag. You will meet more attributes, such as{" "}
            <Code>src</Code> and <Code>alt</Code> for images, in
            Lesson 4.
          </Callout>
        </Section>

        {/* SECTION 4: COMMON TAGS */}
        <Section id="common-tags" number={4} title="Meet some common HTML tags">
          <p className="mt-3 leading-7 text-[#65545F]">
            Here is a first look at tags you will use all the time.
            You do not need to memorise them yet. Later lessons cover
            each one in depth.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {commonTags.map((item) => (
              <article
                key={item.tag}
                className="flex flex-col rounded-2xl border border-pink-100 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <code className="font-bold text-pink-800">{item.tag}</code>
                  <span className="rounded-full bg-[#F8F2F6] px-2.5 py-1 text-xs font-semibold text-[#65545F]">
                    Covered in {item.lesson}
                  </span>
                </div>

                <h3 className="mt-2 font-bold">{item.name}</h3>
                <p className="mt-1 flex-1 text-sm leading-6 text-[#65545F]">
                  {item.text}
                </p>

                <pre className="mt-3 overflow-x-auto rounded-lg bg-[#42213D] p-3 text-sm text-white">
                  <code>{item.code}</code>
                </pre>
              </article>
            ))}
          </div>
        </Section>

        {/* SECTION 5: COMMENTS AND MISTAKES */}
        <Section
          id="mistakes"
          number={5}
          title="Comments and common mistakes"
        >
          <h3 className="mt-3 text-lg font-bold">HTML comments</h3>

          <p className="mt-2 leading-7 text-[#65545F]">
            A comment is a note for people reading your code. The
            browser ignores it, so it never appears on the page.
          </p>

          <CodeBlock
            label="A comment"
            code={
              "<!-- This heading introduces my page -->\n<h1>Welcome!</h1>"
            }
          />

          <h3 className="mt-6 text-lg font-bold">
            Common beginner mistakes
          </h3>

          <p className="mt-2 leading-7 text-[#65545F]">
            Every developer makes these mistakes, so do not worry
            when they happen. Learning to spot them is a real skill.
          </p>

          <div className="mt-4 space-y-4">
            {mistakes.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-pink-100 p-4"
              >
                <h4 className="font-bold">{item.title}</h4>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-red-700">
                      ✗ Not this
                    </p>
                    <pre className="mt-1 overflow-x-auto rounded-lg bg-[#42213D] p-3 text-sm text-white">
                      <code>{item.wrong}</code>
                    </pre>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-green-800">
                      ✓ Do this
                    </p>
                    <pre className="mt-1 overflow-x-auto rounded-lg bg-[#42213D] p-3 text-sm text-white">
                      <code>{item.right}</code>
                    </pre>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-[#65545F]">
                  {item.why}
                </p>
              </article>
            ))}
          </div>

          <Callout tone="warning" title="Debugging tip">
            If your page does not look right, check three things
            first: is every tag spelled correctly, does every opening
            tag have a closing tag, and are all quotation marks in
            pairs?
          </Callout>
        </Section>

        {/* SECTION 6: TOOLKIT */}
        <Section
          id="toolkit"
          number={6}
          title="Create a real HTML file"
        >
          <p className="mt-3 leading-7 text-[#65545F]">
            Webpages are just text files. You do not need expensive
            software to make one, only a code editor and a browser.
            Here is how to make your first real page on your own
            computer.
          </p>

          <ol className="mt-4 space-y-3">
            {toolkitSteps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pink-600 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="leading-7 text-[#65545F]">{step}</span>
              </li>
            ))}
          </ol>

          <Callout tone="tip" title="Why index.html?">
            The main page of a website is usually named{" "}
            <Code>index.html</Code>. Web servers look for this name
            first, so it is a good habit to start with.
          </Callout>
        </Section>

        {/* SECTION 7: QUIZ */}
        <Section id="quiz" number={7} title="Test your knowledge">
          <p className="mt-2 text-[#65545F]">
            Choose an answer for each question, then check it to see
            feedback. You need all five correct to complete the
            lesson, and you can try again as many times as you like.
          </p>

          <Quiz questions={quizQuestions} onResultChange={handleQuizResult} />
        </Section>

        {/* SECTION 8: PLAYGROUND */}
        <Section
          id="playground"
          number={8}
          title="Practice playground"
        >
          <p className="mt-3 leading-7 text-[#65545F]">
            Experiment freely! Change the code below and watch the
            preview update as you type. You cannot break anything, so
            try things out.
          </p>

          <Callout tone="tip" title="Try these experiments">
            <ul className="list-disc space-y-1 pl-5">
              <li>Replace "Hello, world!" with your name.</li>
              <li>
                Change <Code>{"<h1>"}</Code> to <Code>{"<h2>"}</Code>{" "}
                (and its closing tag) and see the size change.
              </li>
              <li>
                Delete a closing tag on purpose to see what the
                browser does.
              </li>
            </ul>
          </Callout>

          {/* Editor and preview sit side by side on large screens */}
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {/* Editor */}
            <div className="flex min-w-0 flex-col">
              <label
                htmlFor="html-playground"
                className="font-semibold"
              >
                Your HTML code
              </label>

              <textarea
                id="html-playground"
                value={htmlCode}
                onChange={(event) => updateCode(event.target.value)}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                className="mt-3 h-64 w-full resize-none rounded-xl border border-pink-200 bg-[#42213D] p-4 font-mono text-sm leading-6 text-white outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 lg:h-80"
              />

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {snippets.map((snippet) => (
                  <button
                    key={snippet.label}
                    type="button"
                    onClick={() => addSnippet(snippet.code)}
                    className={`rounded-lg border border-pink-200 px-3 py-2 text-sm font-semibold text-pink-800 transition hover:bg-pink-50 ${focusRing}`}
                  >
                    {snippet.label}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={resetCode}
                  className={`rounded-lg border border-pink-300 px-3 py-2 text-sm font-semibold text-pink-800 transition hover:bg-pink-50 sm:ml-auto ${focusRing}`}
                >
                  Reset code
                </button>
              </div>
            </div>

            {/* Live preview */}
            <div className="flex min-w-0 flex-col">
              <h3 className="font-semibold">Live preview</h3>

              <iframe
                title="HTML practice preview"
                sandbox=""
                srcDoc={buildPreview(htmlCode)}
                className="mt-3 h-64 w-full rounded-xl border border-[#D9F3E7] bg-white lg:h-80"
              />

              <p className="mt-3 text-xs leading-5 text-[#65545F]">
                This is a safe practice preview shown in a sandboxed
                frame. Links look like links, but clicking them is
                turned off here.
              </p>
            </div>
          </div>
        </Section>

        {/* SECTION 9: CHALLENGE */}
        <Section
          id="challenge"
          number={9}
          title="Coding mission: About Me"
        >
          <p className="mt-3 leading-7 text-[#65545F]">
            Use the editor in the playground to create a simple
            introduction webpage. Your page must include all three
            parts below.
          </p>

          <ol className="mt-5 space-y-3">
            {[
              [
                "Task 1: Your main heading",
                <>
                  Create an <Code>{"<h1>"}</Code> element containing the
                  words About Me.
                </>,
              ],
              [
                "Task 2: Introduce yourself",
                <>Add a paragraph with some information about yourself.</>,
              ],
              [
                "Task 3: Add your goals",
                <>
                  Create an <Code>{"<h2>"}</Code> element containing the
                  words My Goals.
                </>,
              ],
            ].map(([title, text]) => (
              <li key={title} className="rounded-xl bg-[#F3E8F0] p-4">
                <h3 className="font-bold">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#65545F]">
                  {text}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowHint((previous) => !previous)}
              aria-expanded={showHint}
              className={secondaryButton}
            >
              {showHint ? "Hide hint" : "Need a hint? 💡"}
            </button>

            <button
              type="button"
              onClick={checkChallenge}
              className={primaryButton}
            >
              Check my challenge
            </button>
          </div>

          {showHint && (
            <div className="mt-4 rounded-xl border border-pink-200 bg-pink-50 p-4">
              <h3 className="font-bold">
                Here is a little help <span aria-hidden="true">🌱</span>
              </h3>

              <CodeBlock
                code={
                  "<h1>About Me</h1>\n<p>Write a sentence about yourself here.</p>\n<h2>My Goals</h2>"
                }
              />

              <p className="mt-3 text-sm leading-6">
                Replace the sentence with your own words, and remember
                to close every tag.
              </p>
            </div>
          )}

          {challengeChecked && (
            <div
              role="status"
              className={`mt-4 rounded-xl p-4 ${
                challengePassed
                  ? "bg-green-50 text-green-900"
                  : "bg-pink-50 text-pink-900"
              }`}
            >
              <p className="font-bold">
                {challengePassed
                  ? "Amazing! You did it! 🎉"
                  : "Almost there! 🌱"}
              </p>

              <ul className="mt-2 space-y-1 text-sm leading-6">
                {taskResults.map((task) => (
                  <li key={task.id}>
                    <span aria-hidden="true">{task.passed ? "✓ " : "○ "}</span>
                    <span className="sr-only">
                      {task.passed ? "Done: " : "Still needed: "}
                    </span>
                    {task.label}
                  </li>
                ))}
              </ul>

              {challengePassed && (
                <p className="mt-2 text-sm leading-6">
                  Now personalise the text to make the page your own.
                </p>
              )}
            </div>
          )}

          <p className="mt-3 text-xs leading-5 text-[#65545F]">
            The checker looks for the required HTML patterns. It is a
            beginner exercise, not a complete HTML validator.
          </p>
        </Section>

        {/* LESSON COMPLETION */}
        <section
          aria-labelledby="complete-title"
          className="mt-8 rounded-3xl border border-[#F0E5EC] bg-white p-5 sm:p-7"
        >
          <p className="text-sm font-bold uppercase tracking-wide text-pink-700">
            Your progress
          </p>

          <h2 id="complete-title" className="mt-2 text-2xl font-bold">
            Complete Lesson 1
          </h2>

          <p className="mt-3 leading-7 text-[#65545F]">
            To complete this lesson, answer every quiz question
            correctly and pass the coding challenge.
          </p>

          <ul className="mt-5 space-y-2 text-sm">
            <li className={quizPassed ? "text-green-800" : "text-[#65545F]"}>
              <span aria-hidden="true">{quizPassed ? "✓" : "○"} </span>
              Quiz: all five questions answered correctly
            </li>
            <li className={challengeDone ? "text-green-800" : "text-[#65545F]"}>
              <span aria-hidden="true">{challengeDone ? "✓" : "○"} </span>
              Coding challenge checked and passed
            </li>
          </ul>

          {isCompleted ? (
            <div className="mt-5 rounded-2xl bg-[#D9F3E7] p-4">
              <h3 className="font-bold text-green-900">
                Lesson 1 completed! <span aria-hidden="true">🎉</span>
              </h3>
              <p className="mt-1 text-sm leading-6 text-green-900">
                Your progress is saved in this browser. Keep growing
                your coding skills!
              </p>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={handleComplete}
                disabled={!canCompleteLesson}
                className={`mt-5 ${primaryButton}`}
              >
                Mark lesson as complete
              </button>

              {!canCompleteLesson && (
                <p className="mt-3 text-sm text-[#65545F]">
                  Finish both activities above to unlock this button.
                </p>
              )}
            </>
          )}

          {saveError && (
            <p role="alert" className="mt-3 text-sm font-semibold text-red-700">
              Your progress could not be saved. Please check your
              browser's storage settings and try again.
            </p>
          )}
        </section>

        {/* LESSON SUMMARY */}
        <section
          aria-labelledby="summary-title"
          className="mt-8 rounded-2xl bg-[#F3E8F0] p-6"
        >
          <h2 id="summary-title" className="text-xl font-bold">
            Remember what you learned <span aria-hidden="true">🌱</span>
          </h2>

          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-[#65545F]">
            <li>HTML stands for HyperText Markup Language.</li>
            <li>HTML gives webpages structure. CSS styles them, and JavaScript makes them interactive.</li>
            <li>An element is an opening tag, content, and a closing tag.</li>
            <li>Attributes add extra information inside the opening tag.</li>
            <li>Comments are notes that the browser ignores.</li>
            <li>Most mistakes come from missing closing tags, wrong slashes, or missing quotation marks.</li>
          </ul>

          <h3 className="mt-6 font-bold">Key terms</h3>

          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            {keyTerms.map(([term, meaning]) => (
              <div key={term} className="rounded-xl bg-white p-4">
                <dt className="font-bold">{term}</dt>
                <dd className="mt-1 text-sm leading-6 text-[#65545F]">
                  {meaning}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 leading-7 text-[#65545F]">
            <strong>Coming up in Lesson 2:</strong> you will learn
            how these elements fit inside a complete HTML document,
            with a DOCTYPE, head, and body.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/courses/html/lessons"
              className={`inline-flex items-center rounded-xl border border-pink-300 px-5 py-3 font-semibold text-pink-800 hover:bg-white ${focusRing}`}
            >
              Return to lesson list
            </Link>

            {isCompleted && (
              <Link
                to="/courses/html/lesson-2"
                className={`inline-flex items-center rounded-xl bg-[#42213D] px-5 py-3 font-semibold text-white hover:bg-[#583052] ${focusRing}`}
              >
                Continue to Lesson 2 →
              </Link>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default HTMLLesson1Page;
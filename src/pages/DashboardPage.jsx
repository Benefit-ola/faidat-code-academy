import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ---------------------------------------------------------------------------
// Course data
// To launch a course (e.g. CSS): set available: true, add a path, and save
// completed lesson numbers in localStorage under its progressKey.
// ---------------------------------------------------------------------------
const courses = [
  {
    id: "html",
    title: "HTML Fundamentals",
    subtitle: "Build the structure",
    icon: "🌐",
    level: "Beginner",
    lessons: 8,
    progressKey: "faidat-html-completed-lessons",
    description:
      "Learn how to structure webpages with headings, paragraphs, links, images, lists, and forms.",
    outcome: "Create the foundation of your own website.",
    color: "bg-orange-50",
    iconColor: "text-orange-600",
    available: true,
    path: "/courses/html",
    lessonsPath: "/courses/html/lessons",
  },
  {
    id: "css",
    title: "CSS Styling",
    subtitle: "Bring designs to life",
    icon: "🎨",
    level: "Beginner",
    lessons: 10,
    progressKey: "faidat-css-completed-lessons",
    description:
      "Explore colours, typography, spacing, layouts, and responsive web design.",
    outcome: "Transform plain webpages into polished designs.",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    available: false,
  },
  {
    id: "javascript",
    title: "JavaScript Basics",
    subtitle: "Add interactivity",
    icon: "⚡",
    level: "Beginner",
    lessons: 12,
    progressKey: "faidat-javascript-completed-lessons",
    description:
      "Discover variables, functions, conditions, events, and programming logic.",
    outcome: "Build websites that respond to user actions.",
    color: "bg-amber-50",
    iconColor: "text-amber-600",
    available: false,
  },
];

const mindset = [
  {
    icon: "🌱",
    title: "Learn one step at a time",
    description:
      "Break new topics into manageable lessons. Understanding one concept is better than rushing through ten.",
  },
  {
    icon: "🧠",
    title: "Understand the why",
    description:
      "Ask questions, predict what your code will do, and explain concepts in your own words.",
  },
  {
    icon: "🛠️",
    title: "Practise by building",
    description:
      "Turn lessons into small exercises and projects. Practical experience makes concepts stick.",
  },
  {
    icon: "💪",
    title: "Treat mistakes as feedback",
    description:
      "Read error messages, investigate problems, and try again. Debugging is a valuable developer skill.",
  },
];

const skills = [
  "Understand the structure of a webpage.",
  "Style websites with colours, spacing, and layouts.",
  "Add interactive features with JavaScript.",
  "Build projects for a beginner portfolio.",
];

// ---------------------------------------------------------------------------
// Progress helpers
// ---------------------------------------------------------------------------

// Read and validate saved lesson progress for one course.
const readCompletedLessons = (key, total) => {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "[]");

    if (!Array.isArray(saved)) return [];

    return [
      ...new Set(
        saved.filter(
          (id) => Number.isInteger(id) && id >= 1 && id <= total
        )
      ),
    ];
  } catch {
    return [];
  }
};

// Read progress for every course, keyed by course id.
const readAllProgress = () =>
  Object.fromEntries(
    courses.map((course) => [
      course.id,
      readCompletedLessons(course.progressKey, course.lessons),
    ])
  );

const scrollToSection = (id) => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
const DashboardPage = () => {
  const navigate = useNavigate();

  const [progress, setProgress] = useState(readAllProgress);

  // Keep dashboard progress synchronised with saved progress.
  useEffect(() => {
    const syncProgress = () => setProgress(readAllProgress());

    const onVisibility = () => {
      if (document.visibilityState === "visible") syncProgress();
    };

    window.addEventListener("focus", syncProgress);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("storage", syncProgress);

    return () => {
      window.removeEventListener("focus", syncProgress);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("storage", syncProgress);
    };
  }, []);

  // Derived values
  const availableCourses = courses.filter((course) => course.available);
  const htmlCourse = courses.find((course) => course.id === "html");

  const totalLessons = availableCourses.reduce(
    (sum, course) => sum + course.lessons,
    0
  );

  const completedCount = availableCourses.reduce(
    (sum, course) => sum + (progress[course.id]?.length ?? 0),
    0
  );

  const progressPercentage = totalLessons
    ? Math.round((completedCount / totalLessons) * 100)
    : 0;

  const htmlCompleted = progress.html?.length ?? 0;
  const hasStarted = completedCount > 0;
  const allHtmlDone = htmlCompleted >= htmlCourse.lessons;

  const ctaLabel = allHtmlDone
    ? "Review HTML lessons"
    : hasStarted
    ? "Continue learning"
    : "Start learning HTML";

  const ctaPath = hasStarted ? htmlCourse.lessonsPath : htmlCourse.path;

  const achievements = [
    {
      title: "First steps",
      description: "Complete your first lesson.",
      earned: completedCount >= 1,
      icon: "🌱",
    },
    {
      title: "Growing stronger",
      description: "Complete four lessons.",
      earned: completedCount >= 4,
      icon: "🌿",
    },
    {
      title: "HTML graduate",
      description: `Complete all ${htmlCourse.lessons} HTML lessons.`,
      earned: allHtmlDone,
      icon: "🏆",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FFFAF3] px-4 pb-10 pt-20 sm:px-6 md:px-8 md:pt-8">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Welcome banner */}
        <section
          aria-labelledby="welcome-heading"
          className="relative isolate overflow-hidden rounded-3xl bg-[#42213D] px-6 py-8 text-white shadow-lg shadow-[#42213D]/10 sm:px-9 sm:py-10 lg:px-11"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full border-[30px] border-pink-300/10 sm:h-80 sm:w-80"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 right-20 -z-10 h-48 w-48 rounded-full bg-pink-500/10 blur-3xl"
          />

          <div className="relative max-w-3xl">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-600 text-xl"
              >
                🌱
              </span>

              <div>
                <p className="text-xs font-bold tracking-[0.16em] text-pink-200 sm:text-sm">
                  CODE GARDEN
                </p>
                <p className="mt-1 text-xs text-white/70">
                  LEARN · BUILD · GROW
                </p>
              </div>
            </div>

            <h1
              id="welcome-heading"
              className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              {hasStarted ? "Welcome back to your" : "Welcome to your"}
              <br />
              <span className="text-pink-200">coding journey.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
              Explore web development, strengthen your problem-solving
              skills, and turn your ideas into real projects. Learn at
              your own pace and grow one step at a time.
            </p>

            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
              <button
                type="button"
                onClick={() => navigate(ctaPath)}
                className="inline-flex items-center gap-3 rounded-xl bg-pink-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition motion-safe:hover:-translate-y-0.5 hover:bg-pink-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-200"
              >
                {ctaLabel}
                <span aria-hidden="true">→</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("learning-paths")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-200"
              >
                Explore learning paths
                <span aria-hidden="true">↓</span>
              </button>
            </div>

            <p className="mt-4 text-xs text-white/70 sm:text-sm">
              Beginner-friendly · Learn by doing
            </p>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-8 right-10 hidden rotate-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-mono text-sm leading-7 text-pink-200/80 lg:block"
          >
            <p>&lt;learn&gt;</p>
            <p className="pl-4 text-white/60">Build something</p>
            <p>&lt;/learn&gt;</p>
          </div>
        </section>

        {/* Dashboard overview */}
        <section aria-labelledby="overview-heading">
          <div className="mb-5">
            <p className="text-xs font-bold tracking-[0.16em] text-pink-700">
              YOUR LEARNING OVERVIEW
            </p>

            <h2
              id="overview-heading"
              className="mt-2 text-2xl font-bold text-[#42213D] sm:text-3xl"
            >
              Your next step starts here
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#65545F]">
              Explore the available course, track your progress, and
              discover the skills you will develop along the way.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <article className="rounded-2xl border border-[#F0E3ED] bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#65545F]">
                  Available {availableCourses.length === 1 ? "course" : "courses"}
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-xl"
                >
                  📚
                </span>
              </div>

              <p className="mt-3 text-3xl font-bold text-[#42213D]">
                {availableCourses.length}
              </p>

              <p className="mt-1 text-xs text-[#65545F]">
                {availableCourses.map((course) => course.title).join(", ")}{" "}
                {availableCourses.length === 1 ? "is" : "are"} ready to explore.
              </p>
            </article>

            <article className="rounded-2xl border border-[#F0E3ED] bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#65545F]">
                  Lessons completed
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D9F3E7] text-xl"
                >
                  ✓
                </span>
              </div>

              <p className="mt-3 text-3xl font-bold text-[#42213D]">
                {completedCount}
                <span className="text-base font-medium text-[#65545F]">
                  {" "}/ {totalLessons}
                </span>
              </p>

              <p className="mt-1 text-xs text-[#65545F]">
                Lessons recorded as completed on this device.
              </p>
            </article>

            <article className="rounded-2xl border border-[#F0E3ED] bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#65545F]">
                  Overall progress
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-xl"
                >
                  📈
                </span>
              </div>

              <p className="mt-3 text-3xl font-bold text-[#42213D]">
                {progressPercentage}%
              </p>

              <div
                className="mt-3 h-2 overflow-hidden rounded-full bg-[#F3E8F0]"
                role="progressbar"
                aria-label="Overall course completion"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progressPercentage}
              >
                <div
                  className="h-full rounded-full bg-pink-600 transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </article>
          </div>
        </section>

        {/* Learning paths */}
        <section id="learning-paths" aria-labelledby="paths-heading" className="scroll-mt-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-pink-700">
                EXPLORE THE ACADEMY
              </p>

              <h2
                id="paths-heading"
                className="mt-2 text-2xl font-bold text-[#42213D] sm:text-3xl"
              >
                Learning paths
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#65545F]">
                Build your skills progressively, from webpage structure
                to design and interactivity.
              </p>
            </div>

            <span className="text-sm text-[#65545F]">
              {courses.length} learning paths planned
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => {
              const done = progress[course.id]?.length ?? 0;
              const percent = Math.round((done / course.lessons) * 100);

              return (
                <article
                  key={course.id}
                  className="flex flex-col rounded-2xl border border-[#F0E3ED] bg-white p-5 shadow-sm transition duration-200 motion-safe:hover:-translate-y-1 hover:shadow-md sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      aria-hidden="true"
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${course.color} ${course.iconColor}`}
                    >
                      {course.icon}
                    </div>

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-bold tracking-wide ${
                        course.available
                          ? "bg-[#D9F3E7] text-[#1F6B52]"
                          : "bg-[#F3E8F0] text-[#65545F]"
                      }`}
                    >
                      {course.available ? "AVAILABLE NOW" : "COMING SOON"}
                    </span>
                  </div>

                  <p className="mt-5 text-xs font-semibold text-pink-700">
                    {course.subtitle}
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-[#42213D]">
                    {course.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-6 text-[#65545F]">
                    {course.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#F8F2F6] px-3 py-2 text-xs text-[#65545F]">
                      {course.level}
                    </span>

                    <span className="rounded-full bg-[#F8F2F6] px-3 py-2 text-xs text-[#65545F]">
                      {course.lessons} {course.available ? "lessons" : "planned lessons"}
                    </span>
                  </div>

                  {course.available && (
                    <div className="mt-5">
                      <div className="flex items-center justify-between text-xs text-[#65545F]">
                        <span>
                          {done} of {course.lessons} lessons
                        </span>
                        <span>{percent}%</span>
                      </div>

                      <div
                        className="mt-2 h-2 overflow-hidden rounded-full bg-[#F3E8F0]"
                        role="progressbar"
                        aria-label={`${course.title} completion`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={percent}
                      >
                        <div
                          className="h-full rounded-full bg-pink-600 transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-5 rounded-xl bg-[#FFFAF3] p-4">
                    <p className="text-xs font-bold tracking-[0.14em] text-pink-700">
                      LEARNING OUTCOME
                    </p>

                    <p className="mt-2 text-sm leading-5 text-[#42213D]">
                      {course.outcome}
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={!course.available}
                    onClick={() => navigate(course.path)}
                    className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      course.available
                        ? "bg-[#42213D] text-white hover:bg-[#573050] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                        : "cursor-not-allowed border border-[#E8DDE6] bg-[#FAF7F9] text-[#8A7B87]"
                    }`}
                  >
                    {course.available
                      ? done > 0
                        ? "Continue course"
                        : "Explore course"
                      : "Coming soon"}

                    <span aria-hidden="true">
                      {course.available ? "→" : "🔒"}
                    </span>
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        {/* Skills you will develop */}
        <section
          aria-labelledby="skills-heading"
          className="rounded-3xl border border-[#F0E3ED] bg-white p-6 sm:p-8"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.16em] text-pink-700">
              YOUR FUTURE SKILLS
            </p>

            <h2
              id="skills-heading"
              className="mt-2 text-2xl font-bold text-[#42213D] sm:text-3xl"
            >
              What you are working towards
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#65545F]">
              Each learning path contributes to a bigger goal: giving
              you the skills to design, build, and improve websites of
              your own.
            </p>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {skills.map((skill) => (
              <li key={skill} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D9F3E7] font-bold text-[#1F6B52]"
                >
                  ✓
                </span>

                <p className="text-sm leading-6 text-[#42213D]">{skill}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Learning mindset */}
        <section aria-labelledby="mindset-heading">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.16em] text-pink-700">
              THE CODE GARDEN MINDSET
            </p>

            <h2
              id="mindset-heading"
              className="mt-2 text-2xl font-bold text-[#42213D] sm:text-3xl"
            >
              Learn with purpose
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#65545F]">
              Becoming a developer is a process. Build good habits,
              stay curious, and give yourself room to improve.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {mindset.map((item, index) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#F0E3ED] bg-white p-5 transition hover:border-pink-200 hover:shadow-sm sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F8F2F6] text-2xl"
                  >
                    {item.icon}
                  </span>

                  <div>
                    <p className="text-xs font-semibold text-pink-700">
                      PRINCIPLE 0{index + 1}
                    </p>

                    <h3 className="mt-1 font-bold text-[#42213D]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#65545F]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Progress and achievements */}
        <section
          aria-labelledby="progress-heading"
          className="rounded-3xl bg-[#F3E8F0] p-6 sm:p-8"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-pink-700">
                YOUR PROGRESS
              </p>

              <h2
                id="progress-heading"
                className="mt-2 text-2xl font-bold text-[#42213D] sm:text-3xl"
              >
                Every lesson moves you forward.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#65545F]">
                Your dashboard reflects the lessons recorded as
                completed on this device. Keep practising to unlock
                your next milestones.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate(htmlCourse.lessonsPath)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#D63384] bg-white px-4 py-3 text-sm font-semibold text-[#B02468] transition hover:bg-pink-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              View lessons <span aria-hidden="true">→</span>
            </button>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {achievements.map((achievement) => (
              <li
                key={achievement.title}
                className="rounded-2xl border border-white/80 bg-white p-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span aria-hidden="true" className="text-2xl">
                    {achievement.icon}
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      achievement.earned
                        ? "bg-[#D9F3E7] text-[#1F6B52]"
                        : "bg-[#F8F2F6] text-[#65545F]"
                    }`}
                  >
                    {achievement.earned ? "UNLOCKED" : "NOT YET"}
                  </span>
                </div>

                <h3 className="mt-4 font-bold text-[#42213D]">
                  {achievement.title}
                </h3>

                <p className="mt-2 text-sm leading-5 text-[#65545F]">
                  {achievement.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Closing message */}
        <section className="pb-2 pt-2 text-center">
          <span aria-hidden="true" className="text-3xl">
            🌱
          </span>

          <h2 className="mt-3 text-xl font-bold text-[#42213D] sm:text-2xl">
            Small steps. Real skills. Bigger possibilities.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#65545F]">
            You do not need to know everything today. Keep learning,
            keep experimenting, and let each project help you grow.
          </p>

          <button
            type="button"
            onClick={() => navigate(ctaPath)}
            className="mt-5 rounded-xl bg-pink-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
          >
            {ctaLabel} →
          </button>
        </section>
      </div>
    </main>
  );
};

export default DashboardPage;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const COMPLETED_KEY = "faidat-html-completed-lessons";

const lessons = [
  {
    id: 1,
    title: "Introduction to HTML",
    description:
      "Discover what HTML is, understand basic tags and elements, and create your first simple webpage.",
  },
  {
    id: 2,
    title: "Building a Complete HTML Document",
    description:
      "Learn the HTML document structure, including DOCTYPE, html, head, title, and body.",
  },
  {
    id: 3,
    title: "Headings and Paragraphs",
    description:
      "Organise webpage content with heading levels, paragraphs, and readable text sections.",
  },
  {
    id: 4,
    title: "Links and Images",
    description:
      "Connect webpages and display images using links, image sources, and alternative text.",
  },
  {
    id: 5,
    title: "Lists in HTML",
    description:
      "Create ordered and unordered lists to organise information clearly.",
  },
  {
    id: 6,
    title: "HTML Forms",
    description:
      "Collect information with labels, input fields, and buttons.",
  },
  {
    id: 7,
    title: "Semantic HTML and Page Layout",
    description:
      "Organise webpages using meaningful sections such as header, nav, main, and footer.",
  },
  {
    id: 8,
    title: "Your First HTML Project",
    description:
      "Combine your HTML skills to build a complete personal or school information webpage.",
  },
];

// Visual and text settings for each lesson state.
const STATUS_STYLES = {
  completed: {
    badge: "✓ Completed",
    badgeClass: "bg-[#D9F3E7] text-[#1F6B52]",
    cardClass: "border-green-200 shadow-sm",
    buttonLabel: "Review Lesson",
    buttonClass: "bg-[#D9F3E7] text-[#1F6B52] hover:bg-[#BCE8D5]",
  },
  next: {
    badge: "Up next",
    badgeClass: "bg-pink-100 text-pink-800",
    cardClass: "border-pink-300 shadow-md",
    buttonLabel: "Start Lesson",
    buttonClass: "bg-pink-600 text-white hover:bg-pink-700",
  },
  available: {
    badge: "Available",
    badgeClass: "bg-pink-100 text-pink-800",
    cardClass: "border-[#F0E3ED] shadow-sm",
    buttonLabel: "Start Lesson",
    buttonClass: "bg-pink-600 text-white hover:bg-pink-700",
  },
  locked: {
    badge: "🔒 Locked",
    badgeClass: "bg-gray-100 text-gray-700",
    cardClass: "border-[#F0E3ED] bg-[#FBF8FA] shadow-sm",
    buttonLabel: "Complete previous lesson",
    buttonClass: "bg-gray-200 text-gray-600",
  },
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600";

const lessonPath = (id) => `/courses/html/lesson-${id}`;

// Read and validate saved lesson progress.
function readCompletedLessons() {
  try {
    const saved = JSON.parse(localStorage.getItem(COMPLETED_KEY) || "[]");

    if (!Array.isArray(saved)) return [];

    return [
      ...new Set(
        saved.filter(
          (id) =>
            Number.isInteger(id) &&
            lessons.some((lesson) => lesson.id === id)
        )
      ),
    ];
  } catch {
    return [];
  }
}

const HTMLLessonsListPage = () => {
  const [completedLessons, setCompletedLessons] = useState(
    readCompletedLessons
  );

  // Keep the list synchronised with saved progress.
  useEffect(() => {
    const syncProgress = () => setCompletedLessons(readCompletedLessons());

    const onVisibility = () => {
      if (document.visibilityState === "visible") syncProgress();
    };

    window.addEventListener("focus", syncProgress);
    window.addEventListener("storage", syncProgress);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("focus", syncProgress);
      window.removeEventListener("storage", syncProgress);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const completedCount = completedLessons.length;
  const totalLessons = lessons.length;
  const progress = Math.round((completedCount / totalLessons) * 100);
  const allCompleted = completedCount === totalLessons;

  // A lesson unlocks when the previous lesson is completed.
  // Lesson 1 is unlocked from the beginning, and completed lessons
  // always stay available for revision.
  const unlockedLessons = lessons.map((lesson) => {
    const isCompleted = completedLessons.includes(lesson.id);

    const isUnlocked =
      lesson.id === 1 ||
      isCompleted ||
      completedLessons.includes(lesson.id - 1);

    return { ...lesson, isCompleted, isUnlocked };
  });

  const nextLesson = unlockedLessons.find(
    (lesson) => lesson.isUnlocked && !lesson.isCompleted
  );

  const lessonStatuses = unlockedLessons.map((lesson) => {
    let status = "locked";

    if (lesson.isCompleted) status = "completed";
    else if (nextLesson?.id === lesson.id) status = "next";
    else if (lesson.isUnlocked) status = "available";

    return { ...lesson, status };
  });

  const availableCount = lessonStatuses.filter(
    (lesson) => lesson.isUnlocked
  ).length;

  return (
    <main className="min-h-screen bg-[#FFFAF3] p-5 pt-20 md:p-10">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/courses/html"
          className={`mb-6 inline-block rounded font-semibold text-pink-700 hover:text-pink-900 ${focusRing}`}
        >
          ← Back to HTML Fundamentals
        </Link>

        <p className="text-sm font-semibold tracking-wide text-pink-700">
          CODE GARDEN / HTML FUNDAMENTALS
        </p>

        <h1 className="mt-4 text-3xl font-bold text-[#42213D] md:text-4xl">
          Your HTML Learning Journey <span aria-hidden="true">🌱</span>
        </h1>

        <p className="mt-3 max-w-2xl leading-7 text-[#65545F]">
          Learn one concept at a time. Complete each lesson's quiz and
          coding exercise to unlock your next step.
        </p>

        {/* Course progress */}
        <section
          aria-labelledby="path-heading"
          className="mt-8 rounded-2xl bg-[#42213D] p-6 text-white"
        >
          <h2
            id="path-heading"
            className="text-sm font-semibold text-pink-200"
          >
            YOUR LEARNING PATH
          </h2>

          <dl className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-3">
            <div>
              <dd className="text-2xl font-bold">{totalLessons}</dd>
              <dt className="mt-1 text-sm text-white/80">Total lessons</dt>
            </div>

            <div>
              <dd className="text-2xl font-bold">{availableCount}</dd>
              <dt className="mt-1 text-sm text-white/80">
                Unlocked lessons
              </dt>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <dd className="text-2xl font-bold">
                {completedCount}/{totalLessons}
              </dd>
              <dt className="mt-1 text-sm text-white/80">
                Lessons completed
              </dt>
            </div>
          </dl>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-white/80">Course progress</span>
              <span className="font-bold">{progress}%</span>
            </div>

            <div
              className="h-3 overflow-hidden rounded-full bg-white/20"
              role="progressbar"
              aria-label="HTML course progress"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-[#D9F3E7] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-3 text-sm text-white/80">
              {allCompleted
                ? `Amazing! You've completed all ${totalLessons} HTML lessons. 🎉`
                : `You've completed ${completedCount} of ${totalLessons} lessons. Keep growing!`}
            </p>
          </div>
        </section>

        {/* Continue learning */}
        {nextLesson && (
          <section
            aria-labelledby="next-step-heading"
            className="mt-6 rounded-2xl border border-pink-200 bg-white p-5 shadow-sm"
          >
            <p
              id="next-step-heading"
              className="text-sm font-semibold text-pink-700"
            >
              YOUR NEXT STEP
            </p>

            <h2 className="mt-2 text-xl font-bold text-[#42213D]">
              Lesson {nextLesson.id}: {nextLesson.title}
            </h2>

            <p className="mt-2 leading-6 text-[#65545F]">
              {nextLesson.description}
            </p>

            <Link
              to={lessonPath(nextLesson.id)}
              className={`mt-4 inline-flex items-center gap-2 rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white transition hover:bg-pink-700 ${focusRing}`}
            >
              {completedCount > 0 ? "Continue Learning" : "Start Learning"}
              <span aria-hidden="true">→</span>
            </Link>
          </section>
        )}

        {allCompleted && (
          <section className="mt-6 rounded-2xl border border-green-200 bg-[#D9F3E7] p-5">
            <h2 className="text-xl font-bold text-[#1F6B52]">
              HTML Foundations Complete! <span aria-hidden="true">🎓</span>
            </h2>

            <p className="mt-2 leading-6 text-[#1F6B52]">
              You've finished every lesson. You can now revisit any
              topic whenever you need a refresher.
            </p>
          </section>
        )}

        {/* Lesson cards */}
        <section aria-labelledby="lessons-heading" className="mt-8">
          <h2
            id="lessons-heading"
            className="text-2xl font-bold text-[#42213D]"
          >
            Choose your lesson
          </h2>

          <p className="mt-2 text-[#65545F]">
            Complete lessons in order to unlock new topics. Completed
            lessons stay available for revision.
          </p>

          <ol className="mt-5 grid gap-5 sm:grid-cols-2">
            {lessonStatuses.map((lesson) => {
              const styles = STATUS_STYLES[lesson.status];

              return (
                <li
                  key={lesson.id}
                  className={`flex flex-col rounded-2xl border bg-white p-5 transition ${styles.cardClass}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-pink-700">
                      LESSON {String(lesson.id).padStart(2, "0")}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles.badgeClass}`}
                    >
                      {styles.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-[#42213D]">
                    {lesson.title}
                  </h3>

                  <p className="mt-2 flex-1 leading-6 text-[#65545F]">
                    {lesson.description}
                  </p>

                  {lesson.isUnlocked ? (
                    <Link
                      to={lessonPath(lesson.id)}
                      aria-label={`${styles.buttonLabel} ${lesson.id}: ${lesson.title}`}
                      className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold transition ${styles.buttonClass} ${focusRing}`}
                    >
                      {styles.buttonLabel}
                      <span aria-hidden="true">→</span>
                    </Link>
                  ) : (
                    <>
                      <p className="mt-3 text-sm text-[#65545F]">
                        Complete Lesson {lesson.id - 1} to unlock this
                        lesson.
                      </p>

                      <button
                        type="button"
                        disabled
                        className={`mt-3 w-full cursor-not-allowed rounded-xl px-4 py-3 font-semibold ${styles.buttonClass}`}
                      >
                        <span aria-hidden="true">🔒 </span>
                        {styles.buttonLabel}
                      </button>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </section>

        <section className="mt-8 rounded-2xl bg-[#F3E8F0] p-6">
          <h2 className="text-xl font-bold text-[#42213D]">
            Progress, not perfection. <span aria-hidden="true">🌱</span>
          </h2>

          <p className="mt-2 leading-7 text-[#65545F]">
            Take your time. Understand each concept, pass the quiz,
            complete the coding exercise, and unlock the next step.
          </p>
        </section>
      </div>
    </main>
  );
};

export default HTMLLessonsListPage;
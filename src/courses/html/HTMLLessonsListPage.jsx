
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

function readCompletedLessons() {
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
            lessons.some((lesson) => lesson.id === id)
        )
      ),
    ];
  } catch {
    return [];
  }
}

const HTMLLessonsListPage = () => {
  const navigate = useNavigate();

  const [completedLessons, setCompletedLessons] = useState(
    readCompletedLessons
  );

  useEffect(() => {
    const syncProgress = () => {
      setCompletedLessons(readCompletedLessons());
    };

    window.addEventListener("focus", syncProgress);
    window.addEventListener("storage", syncProgress);
    document.addEventListener("visibilitychange", syncProgress);

    return () => {
      window.removeEventListener("focus", syncProgress);
      window.removeEventListener("storage", syncProgress);
      document.removeEventListener(
        "visibilitychange",
        syncProgress
      );
    };
  }, []);

  const completedCount = completedLessons.length;

  const progress = Math.round(
    (completedCount / lessons.length) * 100
  );

  // A lesson unlocks when the previous lesson is completed.
  // Lesson 1 is unlocked from the beginning.
  // Previously completed lessons remain available for revision.
  const lessonStatuses = lessons.map((lesson) => {
    const isCompleted = completedLessons.includes(lesson.id);

    const isUnlocked =
      lesson.id === 1 ||
      isCompleted ||
      completedLessons.includes(lesson.id - 1);

    return {
      ...lesson,
      isCompleted,
      isUnlocked,
    };
  });

  const availableCount = lessonStatuses.filter(
    (lesson) => lesson.isUnlocked
  ).length;

  const nextLesson = lessonStatuses.find(
    (lesson) => lesson.isUnlocked && !lesson.isCompleted
  );

  const allCompleted = completedCount === lessons.length;

  const openLesson = (lesson) => {
    if (!lesson.isUnlocked) return;

    navigate(`/courses/html/lesson-${lesson.id}`);
  };

  return (
    <div className="min-h-screen bg-[#FFFAF3] p-5 pt-20 md:p-10">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => navigate("/courses/html")}
          className="mb-6 font-semibold text-pink-600 hover:text-pink-800"
        >
          ← Back to HTML Fundamentals
        </button>

        <p className="text-sm font-semibold tracking-wide text-pink-600">
          FAIDAT CODE ACADEMY / HTML FUNDAMENTALS
        </p>

        <h1 className="mt-4 text-3xl font-bold text-[#42213D] md:text-4xl">
          Your HTML Learning Journey 🌱
        </h1>

        <p className="mt-3 max-w-2xl leading-7 text-[#65545F]">
          Learn one concept at a time. Complete each lesson's quiz
          and coding exercise to unlock your next step.
        </p>

        {/* Course progress */}
        <section className="mt-8 rounded-2xl bg-[#42213D] p-6 text-white">
          <p className="text-sm font-semibold text-pink-200">
            YOUR LEARNING PATH
          </p>

          <div className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-3">
            <div>
              <p className="text-2xl font-bold">{lessons.length}</p>
              <p className="mt-1 text-sm text-white/75">
                Total lessons
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold">{availableCount}</p>
              <p className="mt-1 text-sm text-white/75">
                Unlocked lessons
              </p>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="text-2xl font-bold">
                {completedCount}/{lessons.length}
              </p>
              <p className="mt-1 text-sm text-white/75">
                Lessons completed
              </p>
            </div>
          </div>

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
                ? "Amazing! You've completed all eight HTML lessons. 🎉"
                : `You've completed ${completedCount} of ${lessons.length} lessons. Keep growing!`}
            </p>
          </div>
        </section>

        {/* Continue learning */}
        {nextLesson && (
          <section className="mt-6 rounded-2xl border border-pink-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-pink-600">
              YOUR NEXT STEP
            </p>

            <h2 className="mt-2 text-xl font-bold text-[#42213D]">
              {nextLesson.title}
            </h2>

            <p className="mt-2 leading-6 text-[#65545F]">
              {nextLesson.description}
            </p>

            <button
              type="button"
              onClick={() => openLesson(nextLesson)}
              className="mt-4 rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white transition hover:bg-pink-700"
            >
              Continue Learning →
            </button>
          </section>
        )}

        {allCompleted && (
          <section className="mt-6 rounded-2xl border border-green-200 bg-[#D9F3E7] p-5">
            <h2 className="text-xl font-bold text-[#246B50]">
              HTML Foundations Complete! 🎓
            </h2>

            <p className="mt-2 leading-6 text-[#246B50]">
              You've finished every lesson. You can now revisit
              any topic whenever you need a refresher.
            </p>
          </section>
        )}

        {/* Lesson cards */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-[#42213D]">
            Choose your lesson
          </h2>

          <p className="mt-2 text-[#65545F]">
            Complete lessons in order to unlock new topics.
            Completed lessons stay available for revision.
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {lessonStatuses.map((lesson) => {
              const { isCompleted, isUnlocked } = lesson;

              const isNext = nextLesson?.id === lesson.id;

              return (
                <article
                  key={lesson.id}
                  className={`rounded-2xl border bg-white p-5 transition ${
                    isCompleted
                      ? "border-green-200 shadow-sm"
                      : isNext
                        ? "border-pink-300 shadow-md"
                        : "border-[#F0E3ED] opacity-75 shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-pink-600">
                      LESSON {String(lesson.id).padStart(2, "0")}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        isCompleted
                          ? "bg-[#D9F3E7] text-[#287D61]"
                          : isUnlocked
                            ? "bg-pink-100 text-pink-700"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {isCompleted
                        ? "✓ Completed"
                        : isUnlocked
                          ? "Available"
                          : "🔒 Locked"}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-[#42213D]">
                    {lesson.title}
                  </h3>

                  <p className="mt-2 leading-6 text-[#65545F]">
                    {lesson.description}
                  </p>

                  {!isUnlocked && (
                    <p className="mt-3 text-sm text-[#65545F]">
                      Complete Lesson {lesson.id - 1} to unlock this lesson.
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => openLesson(lesson)}
                    disabled={!isUnlocked}
                    aria-label={
                      isUnlocked
                        ? `${isCompleted ? "Review" : "Start"} ${lesson.title}`
                        : `${lesson.title} is locked`
                    }
                    className={`mt-5 w-full rounded-xl px-4 py-3 font-semibold transition disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 ${
                      isCompleted
                        ? "bg-[#D9F3E7] text-[#287D61] hover:bg-[#BCE8D5]"
                        : isUnlocked
                          ? "bg-pink-600 text-white hover:bg-pink-700"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted
                      ? "Review Lesson →"
                      : isUnlocked
                        ? "Start Lesson →"
                        : "🔒 Complete Previous Lesson"}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-8 rounded-2xl bg-[#F3E8F0] p-6">
          <h2 className="text-xl font-bold text-[#42213D]">
            Progress, not perfection. 🌱
          </h2>

          <p className="mt-2 leading-7 text-[#65545F]">
            Take your time. Understand each concept, pass the quiz,
            complete the coding exercise, and unlock the next step.
          </p>
        </section>
      </div>
    </div>
  );
};

export default HTMLLessonsListPage;

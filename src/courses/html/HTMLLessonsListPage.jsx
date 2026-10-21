
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const COMPLETED_KEY = "faidat-html-completed-lessons";

const lessons = [
  {
    id: 1,
    title: "Introduction to HTML",
    description: "Understand what HTML is and how websites use it.",
    available: true,
  },
  {
    id: 2,
    title: "HTML Elements and Tags",
    description: "Learn opening tags, closing tags and elements.",
    available: true,
  },
  {
    id: 3,
    title: "Headings and Paragraphs",
    description: "Organise webpage text using headings and paragraphs.",
    available: true,
  },
  {
    id: 4,
    title: "Links and Images",
    description: "Add clickable links and images to webpages.",
    available: true,
  },
  {
    id: 5,
    title: "Lists in HTML",
    description: "Create ordered and unordered lists.",
    available: true,
  },
  {
    id: 6,
    title: "HTML Forms",
    description: "Learn the basics of collecting user information.",
    available: true,
  },
  {
    id: 7,
    title: "HTML Page Structure",
    description: "Understand the main parts of an HTML document.",
    available: true,
  },
  {
    id: 8,
    title: "Your First HTML Project",
    description: "Practise what you have learned by building a page.",
    available: true,
  },
];

const HTMLLessonsListPage = () => {
  const navigate = useNavigate();

  const [completedLessons] = useState(() => {
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
  });

  const availableLessons = lessons.filter(
    (lesson) => lesson.available
  ).length;

  const completedCount = completedLessons.length;

  const progress = Math.round(
    (completedCount / lessons.length) * 100
  );

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
          Start with the basics, understand each concept, and practise
          as you go. Every lesson brings you closer to building your own
          webpages.
        </p>

        <section className="mt-8 rounded-2xl bg-[#42213D] p-6 text-white">
          <p className="text-sm font-semibold text-pink-200">
            YOUR LEARNING PATH
          </p>

          <div className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-3">
            <div>
              <p className="text-2xl font-bold">{lessons.length}</p>
              <p className="mt-1 text-sm text-white/75">
                Planned lessons
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold">{availableLessons}</p>
              <p className="mt-1 text-sm text-white/75">
                Available now
              </p>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="text-2xl font-bold">{completedCount}</p>
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
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-[#42213D]">
            Choose your lesson
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {lessons.map((lesson) => {
              const isCompleted = completedLessons.includes(lesson.id);

              return (
                <article
                  key={lesson.id}
                  className={`rounded-2xl border bg-white p-5 transition ${
                    isCompleted
                      ? "border-green-200 shadow-sm"
                      : lesson.available
                        ? "border-pink-200 shadow-sm hover:shadow-md"
                        : "border-[#F0E3ED]"
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
                          : lesson.available
                            ? "bg-pink-100 text-pink-700"
                            : "bg-[#F3E8F0] text-[#65545F]"
                      }`}
                    >
                      {isCompleted
                        ? "Completed ✓"
                        : lesson.available
                          ? "Available"
                          : "Coming soon"}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-[#42213D]">
                    {lesson.title}
                  </h3>

                  <p className="mt-2 leading-6 text-[#65545F]">
                    {lesson.description}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/courses/html/lesson-${lesson.id}`)
                    }
                    disabled={!lesson.available}
                    className={`mt-5 w-full rounded-xl px-4 py-3 font-semibold transition disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 ${
                      isCompleted
                        ? "bg-[#D9F3E7] text-[#287D61] hover:bg-[#BCE8D5]"
                        : "bg-pink-600 text-white hover:bg-pink-700"
                    }`}
                  >
                    {isCompleted
                      ? "Review Lesson →"
                      : lesson.available
                        ? "Start Lesson →"
                        : "Coming Soon"}
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
            You don't have to master everything at once. Learn one
            concept, practise it, and build on what you know.
          </p>
        </section>
      </div>
    </div>
  );
};

export default HTMLLessonsListPage;

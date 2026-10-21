
import { useNavigate } from "react-router-dom";

const HTMLIntroductionPage = () => {
  const navigate = useNavigate();

  const learningTopics = [
    "Understand HTML and how browsers use it.",
    "Create headings, paragraphs, and text content.",
    "Add links and images to webpages.",
    "Organise content using lists and tables.",
    "Build forms and use semantic HTML.",
  ];

  const outcomes = [
    "Understand the structure of an HTML document.",
    "Create your own basic webpages.",
    "Organise content using appropriate HTML elements.",
    "Prepare a foundation for styling with CSS.",
  ];

  return (
    <div className="min-h-screen bg-[#FFFAF3] p-5 pt-20 md:p-8">
      <div className="mx-auto max-w-5xl space-y-8">

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm text-[#65545F]"
        >
          <button
            onClick={() => navigate("/")}
            className="transition hover:text-pink-600"
          >
            Academy Home
          </button>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-[#42213D]">
            HTML Course
          </span>
        </nav>

        {/* Course hero */}
        <section className="overflow-hidden rounded-3xl bg-[#42213D] p-7 text-white md:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-widest text-pink-200">
                FAIDAT CODE ACADEMY / HTML COURSE
              </p>

              <h1 className="mt-4 text-3xl font-bold md:text-5xl">
                HTML Fundamentals 🌐
              </h1>

              <p className="mt-4 leading-7 text-white/80">
                Every website starts with structure. Learn how
                HTML organises webpage content and build the
                foundation for your own websites, one concept
                at a time.
              </p>

              <div className="mt-5 flex flex-wrap gap-2 text-sm">
                <span className="rounded-full bg-white/10 px-3 py-2">
                  Beginner friendly
                </span>
                <span className="rounded-full bg-white/10 px-3 py-2">
                  8 planned lessons
                </span>
                <span className="rounded-full bg-white/10 px-3 py-2">
                  Reading and practice
                </span>
              </div>

              <button
                onClick={() => navigate("/courses/html/lessons")}
                className="mt-7 rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700"
              >
                Explore Lessons →
              </button>
            </div>

            <div
              aria-hidden="true"
              className="flex h-28 w-28 shrink-0 items-center justify-center self-start rounded-3xl bg-white/10 text-6xl sm:h-36 sm:w-36 sm:self-center"
            >
              🌐
            </div>
          </div>
        </section>

        {/* Course introduction */}
        <section className="rounded-2xl border border-[#F0E3ED] bg-white p-6 md:p-8">
          <p className="text-sm font-semibold tracking-wide text-pink-600">
            YOUR STARTING POINT
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#42213D]">
            What is HTML?
          </h2>

          <p className="mt-4 leading-7 text-[#65545F]">
            HTML stands for HyperText Markup Language. It is
            used to structure content on the web. Think of it
            as the framework of a house: it gives a webpage
            its basic structure, while CSS adds the visual
            styling and JavaScript can add behaviour.
          </p>

          <p className="mt-3 leading-7 text-[#65545F]">
            You do not need previous coding experience. We
            will introduce concepts gradually, show you
            examples, and give you opportunities to practise.
          </p>
        </section>

        {/* Learning objectives */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[#F0E3ED] bg-white p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-2xl">
              📚
            </div>

            <h2 className="mt-4 text-xl font-bold text-[#42213D]">
              What you will learn
            </h2>

            <ul className="mt-5 space-y-4">
              {learningTopics.map((topic) => (
                <li key={topic} className="flex gap-3">
                  <span className="font-bold text-pink-600">
                    ✓
                  </span>
                  <span className="leading-6 text-[#65545F]">
                    {topic}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#F0E3ED] bg-white p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D9F3E7] text-2xl">
              🎯
            </div>

            <h2 className="mt-4 text-xl font-bold text-[#42213D]">
              What you will achieve
            </h2>

            <p className="mt-3 leading-7 text-[#65545F]">
              By completing the course and its exercises,
              you will build the knowledge needed to create
              a simple webpage and understand the code
              behind its structure.
            </p>

            <ul className="mt-5 space-y-4">
              {outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3">
                  <span className="font-bold text-[#287D61]">
                    ✓
                  </span>
                  <span className="leading-6 text-[#65545F]">
                    {outcome}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Learning mindset */}
        <section className="rounded-2xl bg-[#F3E8F0] p-6 md:p-8">
          <p className="text-sm font-semibold tracking-wide text-pink-600">
            YOUR LEARNING MINDSET 🌱
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#42213D]">
            You are here to understand, not to rush.
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-4">
              <h3 className="font-bold text-[#42213D]">
                Be curious
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#65545F]">
                Ask why an element works and when to use it.
              </p>
            </div>

            <div className="rounded-xl bg-white p-4">
              <h3 className="font-bold text-[#42213D]">
                Practise often
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#65545F]">
                Type the examples yourself and experiment.
              </p>
            </div>

            <div className="rounded-xl bg-white p-4">
              <h3 className="font-bold text-[#42213D]">
                Welcome mistakes
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#65545F]">
                Learn to spot errors and understand how to fix them.
              </p>
            </div>
          </div>
        </section>

        {/* Final call to action */}
        <section className="pb-4 text-center">
          <h2 className="text-2xl font-bold text-[#42213D]">
            Ready to begin? 🌱
          </h2>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-[#65545F]">
            Explore the lesson list, choose a lesson, and
            begin building your HTML skills at your own pace.
          </p>

          <button
            onClick={() => navigate("/courses/html/lessons")}
            className="mt-6 rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700"
          >
            Explore Lessons →
          </button>
        </section>

      </div>
    </div>
  );
};

export default HTMLIntroductionPage;

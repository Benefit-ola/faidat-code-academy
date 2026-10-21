
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  const courses = [
    {
      id: "html",
      title: "HTML Fundamentals",
      icon: "🌐",
      level: "Beginner",
      lessons: 8,
      description:
        "Learn how webpages are structured with headings, paragraphs, images, links, lists, and forms.",
      outcome:
        "Build the foundation for your first webpage.",
      path: "/courses/html",
      color: "bg-orange-50",
      tag: "START HERE",
    },
    {
      id: "css",
      title: "CSS Styling",
      icon: "🎨",
      level: "Beginner",
      lessons: 10,
      description:
        "Discover colours, typography, spacing, layouts, and responsive design.",
      outcome:
        "Turn plain webpages into beautiful designs.",
      path: "/courses/css",
      color: "bg-blue-50",
      tag: "DESIGN",
    },
    {
      id: "javascript",
      title: "JavaScript Basics",
      icon: "⚡",
      level: "Beginner",
      lessons: 12,
      description:
        "Explore variables, functions, conditions, and programming logic.",
      outcome:
        "Make websites interactive and responsive to users.",
      path: "/courses/javascript",
      color: "bg-yellow-50",
      tag: "INTERACT",
    },
  ];

  const mindset = [
    {
      icon: "🌱",
      title: "Start small",
      description:
        "You don't have to understand everything on your first day. Learn one concept at a time.",
    },
    {
      icon: "🧠",
      title: "Understand, don't memorise",
      description:
        "Ask questions, experiment with code, and learn why things work.",
    },
    {
      icon: "🛠️",
      title: "Practise by building",
      description:
        "Apply every lesson to small exercises and projects.",
    },
    {
      icon: "💪",
      title: "Learn from mistakes",
      description:
        "Errors are part of programming. Debugging helps you become a better developer.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFAF3] p-5 pt-20 md:p-8">
      <div className="mx-auto max-w-6xl space-y-12">

        {/* Welcome and academy introduction */}
        <section className="relative overflow-hidden rounded-3xl bg-[#42213D] p-7 text-white md:p-12">
          <p className="text-sm font-semibold tracking-widest text-pink-200">
            FAIDAT CODE ACADEMY
          </p>

          <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
            Welcome to Code Garden 🌱
            <br />
            <span className="text-pink-200">
              Your journey starts here.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-white/80">
            Every expert was once a beginner. This is your
            space to explore technology, develop practical
            skills, and learn how to turn ideas into real
            websites. Start at your own pace and grow one
            step at a time.
          </p>

          <button
            onClick={() => navigate("/courses/html")}
            className="mt-7 rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700"
          >
            Begin Your Journey →
          </button>

          <p className="mt-4 text-sm text-white/60">
            No previous coding experience required.
          </p>
        </section>

        {/* What learners will learn */}
        <section>
          <p className="text-sm font-semibold tracking-wide text-pink-600">
            YOUR LEARNING JOURNEY
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#42213D] md:text-3xl">
            What will you learn?
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-[#65545F]">
            Our learning paths take you from the foundations
            of web development towards building websites of
            your own. Choose a course to explore its
            introduction and available lessons.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <article
                key={course.id}
                className="flex flex-col rounded-2xl border border-[#F0E3ED] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${course.color}`}
                  >
                    {course.icon}
                  </div>

                  <span className="rounded-full bg-[#F8E6F0] px-3 py-1 text-xs font-semibold text-[#42213D]">
                    {course.tag}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#42213D]">
                  {course.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#65545F]">
                  {course.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#65545F]">
                  <span className="rounded-full bg-[#F8F2F6] px-3 py-2">
                    {course.level}
                  </span>

                  <span className="rounded-full bg-[#F8F2F6] px-3 py-2">
                    {course.lessons} planned lessons
                  </span>
                </div>

                <div className="mt-5 rounded-xl bg-[#FFFAF3] p-3">
                  <p className="text-xs font-semibold text-pink-600">
                    YOUR GOAL
                  </p>

                  <p className="mt-1 text-sm text-[#42213D]">
                    {course.outcome}
                  </p>
                </div>

                <button
                  onClick={() => navigate(course.path)}
                  className="mt-5 w-full rounded-xl border border-[#D63384] px-4 py-3 font-semibold text-[#D63384] transition hover:bg-pink-50"
                >
                  Explore Course →
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* What learners can achieve */}
        <section className="rounded-2xl border border-[#F0E3ED] bg-white p-6 md:p-8">
          <p className="text-sm font-semibold tracking-wide text-pink-600">
            YOUR FUTURE SKILLS
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#42213D] md:text-3xl">
            What can you achieve?
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-[#65545F]">
            With consistent learning and practice, you can
            develop the skills to:
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              "Understand how websites are built.",
              "Create and style your own webpages.",
              "Add interactive features with JavaScript.",
              "Build projects for a beginner portfolio.",
            ].map((goal) => (
              <div key={goal} className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D9F3E7] font-bold text-[#287D61]">
                  ✓
                </span>

                <p className="leading-6 text-[#42213D]">
                  {goal}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* The learner mindset */}
        <section>
          <p className="text-sm font-semibold tracking-wide text-pink-600">
            THE CODE GARDEN MINDSET
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#42213D] md:text-3xl">
            Learn patiently. Grow confidently.
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-[#65545F]">
            You don't need to be a genius to become a
            developer. You need curiosity, practice,
            patience, and the courage to keep going.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {mindset.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#F0E3ED] bg-white p-5"
              >
                <span className="text-3xl">{item.icon}</span>

                <h3 className="mt-3 font-bold text-[#42213D]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#65545F]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Honest progress and achievements */}
        <section className="rounded-2xl bg-[#F3E8F0] p-6 md:p-8">
          <p className="text-sm font-semibold tracking-wide text-pink-600">
            YOUR PROGRESS
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#42213D]">
            Every small step counts. 🏆
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-[#65545F]">
            Your learning achievements will grow as you
            complete lessons, practise your skills, and
            pass assessments. Start learning to begin
            building your record.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white p-5">
              <span className="text-2xl">📚</span>

              <p className="mt-3 font-bold text-[#42213D]">
                Lessons completed
              </p>

              <p className="mt-1 text-sm text-[#65545F]">
                Progress tracking coming next.
              </p>
            </div>

            <div className="rounded-xl bg-white p-5">
              <span className="text-2xl">🏆</span>

              <p className="mt-3 font-bold text-[#42213D]">
                Achievements earned
              </p>

              <p className="mt-1 text-sm text-[#65545F]">
                Your milestones will appear here.
              </p>
            </div>
          </div>
        </section>

        {/* Final encouragement */}
        <section className="pb-4 text-center">
          <h2 className="text-2xl font-bold text-[#42213D]">
            Ready to plant your first coding seed? 🌱
          </h2>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-[#65545F]">
            Choose a course, explore its lessons, and take
            your first step. You don't have to know it all
            today; you just have to begin.
          </p>

          <button
            onClick={() => navigate("/courses/html")}
            className="mt-6 rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700"
          >
            Explore HTML Fundamentals →
          </button>
        </section>

      </div>
    </div>
  );
};

export default DashboardPage;

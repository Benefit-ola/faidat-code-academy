
import { useNavigate } from "react-router-dom";

const lessons = [
  {
    id: 1,
    title: "Introduction to HTML",
    description: "Understand what HTML is and how websites use it.",
  },
  {
    id: 2,
    title: "HTML Elements and Tags",
    description: "Learn opening tags, closing tags and elements.",
  },
  {
    id: 3,
    title: "Headings and Paragraphs",
    description: "Organise webpage text using headings and paragraphs.",
  },
  {
    id: 4,
    title: "Links and Images",
    description: "Add clickable links and images to webpages.",
  },
  {
    id: 5,
    title: "Lists in HTML",
    description: "Create ordered and unordered lists.",
  },
  {
    id: 6,
    title: "HTML Forms",
    description: "Learn the basics of collecting user information.",
  },
  {
    id: 7,
    title: "HTML Page Structure",
    description: "Understand the main parts of an HTML document.",
  },
  {
    id: 8,
    title: "Your First HTML Project",
    description: "Practise what you have learned by building a page.",
  },
];

const LessonsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFFAF3] p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <p className="font-semibold text-pink-600">
          FAIDAT CODE ACADEMY / HTML FUNDAMENTALS
        </p>

        <h1 className="mt-4 text-3xl font-bold text-[#42213D]">
          Your HTML Learning Journey 🌱
        </h1>

        <p className="mt-3 text-[#65545F]">
          Choose a lesson and learn at your own pace.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="rounded-2xl border border-pink-200 bg-white p-5"
            >
              <p className="text-sm font-semibold text-pink-600">
                LESSON {lesson.id}
              </p>

              <h2 className="mt-2 text-xl font-bold text-[#42213D]">
                {lesson.title}
              </h2>

              <p className="mt-2 text-[#65545F]">
                {lesson.description}
              </p>

              <button
                onClick={() => {
                  if (lesson.id === 1) {
                    navigate("/courses/html/lesson-1");
                  }
                }}
                disabled={lesson.id !== 1}
                className="mt-5 rounded-lg bg-pink-600 px-4 py-2 font-semibold text-white hover:bg-pink-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {lesson.id === 1 ? "Start Lesson" : "Coming Soon"}
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/courses/html")}
          className="mt-8 font-semibold text-pink-600 hover:text-pink-800"
        >
          ← Back to HTML Fundamentals
        </button>
      </div>
    </div>
  );
};

export default LessonsPage;

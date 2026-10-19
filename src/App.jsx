
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import CourseCard from "./components/CourseCard";
import Sidebar from "./components/Sidebar";

import CoursePage from "./pages/CoursePage";
import LessonPage from "./pages/LessonPage";
import LessonsPage from "./pages/LessonsPage";

const App = () => {
  const navigate = useNavigate();

  const [selectedCourse, setSelectedCourse] = useState("");

  const courses = [
    {
      id: 1,
      title: "HTML Fundamentals",
      description: "Learn the building blocks of websites using HTML.",
      level: "Beginner",
      lessons: 8,
      logo: "🌐",
    },
    {
      id: 2,
      title: "CSS Styling",
      description: "Learn colours, layouts and responsive design.",
      level: "Beginner",
      lessons: 10,
      logo: "🎨",
    },
    {
      id: 3,
      title: "JavaScript Basics",
      description: "Learn variables, functions and programming logic.",
      level: "Beginner",
      lessons: 12,
      logo: "⚡",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFAF3]">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main page content */}
      <main className="min-h-screen md:ml-64">
        <Routes>
          {/* Dashboard */}
          <Route
            path="/"
            element={
              <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-4 p-6 pt-20 md:p-8">
                <h1 className="text-center text-4xl font-bold text-pink-600">
                  Faidat Code Academy
                </h1>

                <p className="text-center text-lg text-[#42213D]">
                  Learn HTML and CSS, one step at a time.
                </p>

                <div className="mt-6 w-full max-w-3xl">
                  <h2 className="text-2xl font-bold text-[#42213D]">
                    Start Your Coding Journey 🌱
                  </h2>

                  <p className="mt-3 text-[#65545F]">
                    Welcome to Faidat Code Academy! This is your space to
                    learn how websites are built, even if you have never
                    written code before.
                  </p>

                  <h3 className="mt-6 text-lg font-bold text-[#42213D]">
                    What will you learn?
                  </h3>

                  <ul className="mt-3 list-disc space-y-2 pl-6 text-[#65545F]">
                    <li>
                      HTML: Structure webpages with headings, text, images,
                      and links.
                    </li>
                    <li>
                      CSS: Style webpages with colours, spacing, and layouts.
                    </li>
                    <li>
                      JavaScript: Understand the basics of interactive
                      websites.
                    </li>
                  </ul>

                  <h3 className="mt-6 text-lg font-bold text-[#42213D]">
                    What will you achieve?
                  </h3>

                  <p className="mt-3 text-[#65545F]">
                    You will practise each concept, complete small exercises,
                    and work towards building your own simple website.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/courses/html")}
                  className="mt-4 rounded-lg bg-pink-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-pink-700"
                >
                  Start Learning
                </button>

                {/* Course cards */}
                <div className="mt-8 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {courses.map((course) => (
                    <CourseCard
                      key={course.id}
                      title={course.title}
                      description={course.description}
                      logo={course.logo}
                      level={course.level}
                      lessons={course.lessons}
                      onExplore={() => {
                        if (course.title === "HTML Fundamentals") {
                          navigate("/courses/html");
                        } else {
                          setSelectedCourse(
                            selectedCourse === course.title
                              ? ""
                              : course.title
                          );
                        }
                      }}
                      isSelected={selectedCourse === course.title}
                    />
                  ))}
                </div>
              </div>
            }
          />

          {/* HTML course overview */}
          <Route
            path="/courses/html"
            element={<CoursePage />}
          />

          {/* All HTML lessons */}
          <Route
            path="/courses/html/lessons"
            element={<LessonsPage />}
          />

          {/* Individual lesson */}
          <Route
            path="/courses/html/lesson-1"
            element={<LessonPage />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;

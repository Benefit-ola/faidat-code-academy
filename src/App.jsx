
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import DashboardPage from "./pages/DashboardPage";
import HTMLIntroductionPage from "./courses/html/HTMLIntroductionPage";
import HTMLLessonsListPage from "./courses/html/HTMLLessonsListPage";
import HTMLLesson1Page from "./courses/html/HTMLLesson1Page";
import HTMLLesson2Page from "./courses/html/HTMLLesson2Page";
import HTMLLesson3Page from "./courses/html/HTMLLesson3Page";
import HTMLLesson4Page from "./courses/html/HTMLLesson4Page";
import HTMLLesson5Page from "./courses/html/HTMLLesson5Page";
import HTMLLesson6Page from "./courses/html/HTMLLesson6Page";
import HTMLLesson7Page from "./courses/html/HTMLLesson7Page";
import HTMLLesson8Page from "./courses/html/HTMLLesson8Page";

const COMPLETED_KEY = "faidat-html-completed-lessons";

// Read the learner's saved progress safely.
function readCompletedLessons() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(COMPLETED_KEY) || "[]"
    );

    if (!Array.isArray(saved)) return [];

    return saved.filter(
      (id) =>
        Number.isInteger(id) &&
        id >= 1 &&
        id <= 8
    );
  } catch {
    return [];
  }
}

// Protect lessons from being opened before they are unlocked.
const ProtectedLesson = ({ lessonId, children }) => {
  const completedLessons = readCompletedLessons();

  const isCompleted = completedLessons.includes(lessonId);

  const previousLessonCompleted =
    lessonId === 1 ||
    completedLessons.includes(lessonId - 1);

  const isUnlocked = isCompleted || previousLessonCompleted;

  if (!isUnlocked) {
    return (
      <Navigate
        to="/courses/html/lessons"
        replace
      />
    );
  }

  return children;
};

const App = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFAF3]">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main
        className={`min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        <Routes>
          {/* Academy dashboard */}
          <Route path="/" element={<DashboardPage />} />

          {/* HTML course introduction */}
          <Route
            path="/courses/html"
            element={<HTMLIntroductionPage />}
          />

          {/* HTML lesson list */}
          <Route
            path="/courses/html/lessons"
            element={<HTMLLessonsListPage />}
          />

          {/* Lesson 1: unlocked from the beginning */}
          <Route
            path="/courses/html/lesson-1"
            element={
              <ProtectedLesson lessonId={1}>
                <HTMLLesson1Page />
              </ProtectedLesson>
            }
          />

          {/* Lesson 2: requires Lesson 1 */}
          <Route
            path="/courses/html/lesson-2"
            element={
              <ProtectedLesson lessonId={2}>
                <HTMLLesson2Page />
              </ProtectedLesson>
            }
          />

          {/* Lesson 3: requires Lesson 2 */}
          <Route
            path="/courses/html/lesson-3"
            element={
              <ProtectedLesson lessonId={3}>
                <HTMLLesson3Page />
              </ProtectedLesson>
            }
          />

          {/* Lesson 4: requires Lesson 3 */}
          <Route
            path="/courses/html/lesson-4"
            element={
              <ProtectedLesson lessonId={4}>
                <HTMLLesson4Page />
              </ProtectedLesson>
            }
          />

          {/* Lesson 5: requires Lesson 4 */}
          <Route
            path="/courses/html/lesson-5"
            element={
              <ProtectedLesson lessonId={5}>
                <HTMLLesson5Page />
              </ProtectedLesson>
            }
          />

          {/* Lesson 6: requires Lesson 5 */}
          <Route
            path="/courses/html/lesson-6"
            element={
              <ProtectedLesson lessonId={6}>
                <HTMLLesson6Page />
              </ProtectedLesson>
            }
          />

          {/* Lesson 7: requires Lesson 6 */}
          <Route
            path="/courses/html/lesson-7"
            element={
              <ProtectedLesson lessonId={7}>
                <HTMLLesson7Page />
              </ProtectedLesson>
            }
          />

          {/* Lesson 8: requires Lesson 7 */}
          <Route
            path="/courses/html/lesson-8"
            element={
              <ProtectedLesson lessonId={8}>
                <HTMLLesson8Page />
              </ProtectedLesson>
            }
          />

          {/* Unknown routes return to the academy */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;

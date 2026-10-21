import { useState } from "react";
import { Routes, Route } from "react-router-dom";

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
          <Route path="/courses/html" element={<HTMLIntroductionPage />} />

          {/* Complete HTML lesson list */}
          <Route
            path="/courses/html/lessons"
            element={<HTMLLessonsListPage />}
          />

          {/* HTML Lesson 1 */}
          <Route path="/courses/html/lesson-1" element={<HTMLLesson1Page />} />
          <Route path="/courses/html/lesson-2" element={<HTMLLesson2Page />} />

          <Route path="/courses/html/lesson-3" element={<HTMLLesson3Page />} />

          <Route path="/courses/html/lesson-4" element={<HTMLLesson4Page />} />
          <Route path="/courses/html/lesson-5" element={<HTMLLesson5Page />} />
          <Route path="/courses/html/lesson-6" element={<HTMLLesson6Page />} />
          <Route path="/courses/html/lesson-7" element={<HTMLLesson7Page />} />
          <Route path="/courses/html/lesson-8" element={<HTMLLesson8Page />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

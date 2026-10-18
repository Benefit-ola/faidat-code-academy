
import { useState } from 'react'
import CourseCard from './components/CourseCard'
import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom'
import CoursePage from './pages/CoursePage'
import LessonPage from './pages/LessonPage'

const App = () => {
  const navigate = useNavigate()

  // const [started, setStarted] = useState(false)
  // const [courseStarted, setCourseStarted] = useState(false)
  // const [lessonOpened, setLessonOpened] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState('')
  // const [answer, setAnswer] = useState('')

  const courses = [
    {
      id: 1,
      title: 'HTML Fundamentals',
      description:
        'Learn the building blocks of websites using HTML.',
      level: 'Beginner',
      lessons: 8,
      logo: '🌐',
    },
    {
      id: 2,
      title: 'CSS Styling',
      description:
        'Learn colours, layouts and responsive design.',
      level: 'Beginner',
      lessons: 10,
      logo: '🎨',
    },
    {
      id: 3,
      title: 'JavaScript Basics',
      description:
        'Learn variables, functions and programming logic.',
      level: 'Beginner',
      lessons: 12,
      logo: '⚡',
    },
  ]

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="bg-[#FFFAF3] p-8 rounded-2xl text-center mx-auto w-full max-w-5xl mt-8 min-h-screen flex items-center flex-col justify-center gap-4">
            <h1 className="text-pink-600 text-4xl font-bold">
              Faidat Code Academy
            </h1>

            <p className="text-[#42213D] text-lg">
              Learn HTML and CSS, one step at a time
            </p>
            
<div className="max-w-3xl mt-6 text-left">
  <h2 className="text-2xl font-bold text-[#42213D]">
    Start Your Coding Journey 🌱
  </h2>

  <p className="mt-3 text-[#65545F]">
    Welcome to Faidat Code Academy! This is your space
    to learn how websites are built, even if you have
    never written code before.
  </p>

  <h3 className="mt-6 text-lg font-bold text-[#42213D]">
    What will you learn?
  </h3>

  <ul className="mt-3 space-y-2 text-[#65545F] list-disc pl-6">
    <li>HTML: Structure webpages with headings, text, images and links.</li>
    <li>CSS: Style webpages with colours, spacing and layouts.</li>
    <li>JavaScript: Understand the basics of interactive websites.</li>
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
  onClick={() => navigate('/courses/html')}
  className="bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-700 transition-colors duration-200"
>
  Start Learning
</button>

            {/* <div className="bg-white p-6 rounded-2xl shadow-md w-full">
              <p className="bg-pink-100 text-pink-700 text-sm px-3 py-1 rounded-md inline-block mb-3">
                Beginner
              </p>

              <h2 className="text-[#42213D] text-2xl font-bold">
                HTML Fundamentals
              </h2>

              <p className="text-[#65545F] text-base mt-2">
                Learn the building blocks of websites using HTML.
              </p>

              <div className="flex justify-between mt-4">
                <p className="text-sm text-gray-500">
                  8 lessons
                </p>
                <p className="text-sm text-gray-500">
                  Beginner friendly
                </p>
              </div>

              <h4 className="mt-4 font-semibold">
                What is HTML?
              </h4>

              <p className="mt-2 text-sm text-[#65545F]">
                HTML stands for HyperText Markup Language.
                It structures the content of web pages.
              </p>

              <div className="mt-4 rounded-xl bg-pink-50 p-4 text-left border border-pink-200">
                <h4 className="text-lg font-bold text-[#42213D]">
                  Practice Question
                </h4>

                <p className="mt-2 text-sm text-[#65545F]">
                  What is HTML used for?
                </p>

                <button
                  onClick={() => setAnswer('A')}
                  className="mt-3 w-full rounded-lg border border-pink-200 bg-white p-3 text-left text-sm hover:bg-pink-100 transition-colors"
                >
                  A. To structure the content of a web page
                </button>

                <button
                  onClick={() => setAnswer('B')}
                  className="mt-3 w-full rounded-lg border border-pink-200 bg-white p-3 text-left text-sm hover:bg-pink-100 transition-colors"
                >
                  B. To store information in a database
                </button>
              </div>

              <button
                onClick={() => setCourseStarted(true)}
                className="bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700 transition-colors w-full mt-4"
              >
                {courseStarted
                  ? 'Course Selected ✓'
                  : 'Explore Course'}
              </button>

              {courseStarted && (
                <div className="mt-4 rounded-xl bg-pink-50 p-4 text-left border border-pink-200 hover:shadow-md transition-shadow duration-300">
                  <p className="text-lg font-bold text-[#42213D]">
                    🎉 You're ready to grow!
                  </p>

                  <p className="mt-2 text-sm text-[#65545F]">
                    Welcome to HTML Fundamentals. Your coding
                    journey starts here! Get ready to learn,
                    practise, and build your first web pages.
                  </p>
                </div>
              )}

              <h3 className="mt-4 text-left font-bold text-[#42213D]">
                Your First Lesson
              </h3>

              <button
                onClick={() => setLessonOpened(!lessonOpened)}
                className="mt-2 text-left text-sm w-full cursor-pointer text-[#65545F] bg-[#FFFAF3] p-3 rounded-lg border border-pink-100 hover:bg-pink-50 transition-colors"
              >
                {lessonOpened
                  ? 'Lesson 1: Introduction to HTML ▲'
                  : 'Lesson 1: Introduction to HTML ▼'}
              </button>

              {lessonOpened && (
                <div className="mt-4 rounded-xl bg-white p-4 text-left border border-pink-100">
                  <h4 className="text-lg font-bold text-[#42213D]">
                    What is HTML?
                  </h4>

                  <p className="mt-2 text-sm text-[#65545F]">
                    HTML stands for HyperText Markup Language.
                    It is used to structure the content of web pages.
                  </p>
                </div>
              )}
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  logo={course.logo}
                  level={course.level}
                  lessons={course.lessons}
                  onExplore={() => {
                    if (course.title === 'HTML Fundamentals') {
                      navigate('/courses/html')
                    } else {
                      setSelectedCourse(
                        selectedCourse === course.title
                          ? ''
                          : course.title
                      )
                    }
                  }}
                  isSelected={selectedCourse === course.title}
                />
              ))}
            </div>
          </div>
        }
      />

      <Route
        path="/courses/html"
        element={<CoursePage />}
      />
      <Route
  path="/courses/html/lesson-1"
  element={<LessonPage />}
/>
    </Routes>
  )
}

export default App

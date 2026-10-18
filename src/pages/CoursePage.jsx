import { useNavigate } from 'react-router-dom'
const CoursePage = () => {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#FFFAF3] p-6 md:p-10">
      <div className="mx-auto max-w-4xl">

        <p className="text-sm font-semibold text-pink-600">
          FAIDAT CODE ACADEMY / HTML COURSE
        </p>

        <h1 className="mt-4 text-3xl md:text-4xl font-bold text-[#42213D]">
          HTML Fundamentals 🌐
        </h1>

        <p className="mt-4 text-lg text-[#65545F]">
          Learn how to build the structure of a website,
          starting from the very beginning.
        </p>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-xl font-bold text-[#42213D]">
            What you will learn
          </h2>

          <ul className="mt-4 list-disc space-y-3 pl-6 text-[#65545F]">
            <li>What HTML is and how it works.</li>
            <li>How to create headings and paragraphs.</li>
            <li>How to add links and images.</li>
            <li>How to create lists and tables.</li>
            <li>How to build simple forms.</li>
          </ul>
        </div>

        <div className="mt-6 rounded-2xl bg-pink-50 p-6 border border-pink-100">
          <h2 className="text-xl font-bold text-[#42213D]">
            What you will achieve 🎯
          </h2>

          <p className="mt-3 text-[#65545F]">
            By the end of this course, you will be able
            to create a basic webpage using HTML and
            understand the code behind its structure.
            You will also build a small webpage as your
            final project.
          </p>
        </div>

       
<div className="mt-8">
  <h2 className="text-2xl font-bold text-[#42213D]">
    Your learning journey
  </h2>

  <p className="mt-2 text-[#65545F]">
    We will learn one concept at a time, practise
    what you learn, and gradually build your skills.
  </p>

  <div className="mt-6 rounded-2xl bg-white p-6 shadow-md">
    <p className="text-sm font-semibold text-pink-600">
      LESSON 1 OF 8
    </p>

    <h3 className="mt-2 text-xl font-bold text-[#42213D]">
      Introduction to HTML
    </h3>

    <p className="mt-3 text-[#65545F]">
      Discover what HTML means, why websites need it,
      and how browsers use HTML to display webpage content.
    </p>

    <p className="mt-4 text-sm text-gray-500">
      Beginner · Reading and practice
    </p>

    <button
      onClick={() => navigate('/courses/html/lesson-1')}
      className="mt-5 w-full rounded-lg bg-pink-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-pink-700"
    >
      Start Lesson 1 →
    </button>
  </div>
</div>


      </div>
    </div>
  )
}

export default CoursePage

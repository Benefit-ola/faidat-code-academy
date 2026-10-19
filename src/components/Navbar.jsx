
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#42213D] px-6 py-4 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          🌱 Code Garden
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-pink-300">
            Dashboard
          </Link>

          <Link
            to="/courses/html"
            className="hover:text-pink-300"
          >
            Courses
          </Link>

          <Link
            to="/courses/html/lessons"
            className="hover:text-pink-300"
          >
            My Learning
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

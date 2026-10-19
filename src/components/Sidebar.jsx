
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { name: "Dashboard", path: "/", icon: "🏠" },
    { name: "Courses", path: "/courses/html", icon: "📚" },
    { name: "My Learning", path: "/courses/html/lessons", icon: "🎓" },
  ];

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-[#42213D] p-3 text-white md:hidden"
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>

      {mobileOpen && (
        <button
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          aria-label="Close navigation menu"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#42213D] p-5 text-white transition-all duration-300 ${
          collapsed ? "md:w-20" : "md:w-64"
        } ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          {!collapsed && (
            <div>
              <h2 className="text-xl font-bold">🌱 Code Garden</h2>
              <p className="mt-1 text-xs text-pink-200">
                LEARN · BUILD · GROW
              </p>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden rounded-lg p-2 hover:bg-white/10 md:block"
            aria-label="Collapse or expand sidebar"
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-pink-200">
          {!collapsed && "Workspace"}
        </p>

        <nav className="flex-1 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? link.name : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 transition ${
                  isActive
                    ? "bg-pink-600 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <span>{link.icon}</span>
              {!collapsed && <span>{link.name}</span>}
            </NavLink>
          ))}
        </nav>

        {!collapsed && (
          <div className="rounded-xl bg-white/10 p-4">
            <p className="font-semibold">Keep growing 🌱</p>
            <p className="mt-1 text-sm text-white/70">
              Small steps, great skills.
            </p>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;

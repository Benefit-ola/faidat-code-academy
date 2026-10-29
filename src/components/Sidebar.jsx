
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ collapsed, onToggle }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    {
      name: "Dashboard",
      path: "/",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
          <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      name: "Courses",
      path: "/courses/html",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
          <path d="M4 5.5v16M8 7h8M8 11h7" />
        </svg>
      ),
    },
    {
      name: "My Learning",
      path: "/courses/html/lessons",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="8" r="4" />
          <path d="M5 20v-1.5a7 7 0 0 1 14 0V20z" />
          <path d="m9.5 14 2.5 2 2.5-2" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMobileOpen((open) => !open)}
        className="fixed left-4 top-4 z-[60] flex h-11 w-11 items-center justify-center rounded-xl border border-[#F0E3ED] bg-white text-[#42213D] shadow-sm transition hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-400 md:hidden"
        aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="m18 6-12 12M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-[#241321]/40 backdrop-blur-[2px] md:hidden"
          aria-label="Close navigation overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/10 bg-[#42213D] text-white shadow-xl transition-[width,transform] duration-300 ease-in-out md:z-40 md:translate-x-0 md:shadow-none ${
          collapsed ? "md:w-[84px]" : "md:w-64"
        } ${
          mobileOpen ? "translate-x-0 w-72" : "-translate-x-full w-72"
        }`}
      >
        {/* Brand */}
        <div className={`flex min-h-[88px] items-center border-b border-white/10 px-5 ${
          collapsed ? "md:justify-center md:px-2" : "justify-between"
        }`}>
          <div className={`flex min-w-0 items-center gap-3 ${
            collapsed ? "md:justify-center" : ""
          }`}>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pink-500 text-white shadow-lg shadow-pink-950/20">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 8 4.5 12 8 16" />
                <path d="m16 8 3.5 4-3.5 4" />
                <path d="m14 5-4 14" />
              </svg>
            </div>

            <div className={collapsed ? "md:hidden" : ""}>
              <h2 className="whitespace-nowrap text-lg font-bold tracking-tight">
                Code Garden
              </h2>
              <p className="mt-0.5 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.18em] text-pink-200">
                Learn · Build · Grow
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggle}
            className={`hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-300 md:flex ${
              collapsed ? "md:hidden" : ""
            }`}
            aria-label="Collapse sidebar"
            title="Collapse sidebar"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="m14 18-6-6 6-6" />
            </svg>
          </button>

          {collapsed && (
            <button
              type="button"
              onClick={onToggle}
              className="hidden h-9 w-9 items-center justify-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-white md:flex"
              aria-label="Expand sidebar"
              title="Expand sidebar"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m10 18 6-6-6-6" />
              </svg>
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="px-4 pt-8">
          <p className={`mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-pink-200/70 ${
            collapsed ? "md:hidden" : ""
          }`}>
            Workspace
          </p>

          <nav className="space-y-2" aria-label="Main navigation">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? link.name : undefined}
                className={({ isActive }) =>
                  `group relative flex min-h-12 items-center gap-3 rounded-xl px-3.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-300 ${
                    collapsed ? "md:justify-center md:px-0" : ""
                  } ${
                    isActive
                      ? "bg-pink-500 text-white shadow-lg shadow-pink-950/20"
                      : "text-white/70 hover:bg-white/[0.08] hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute bottom-3 left-0 top-3 w-1 rounded-r-full bg-white md:group-hover:bg-white" />
                    )}

                    <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                      <span className="h-5 w-5">{link.icon}</span>
                    </span>

                    <span className={`whitespace-nowrap ${
                      collapsed ? "md:hidden" : ""
                    }`}>
                      {link.name}
                    </span>

                    {collapsed && (
                      <span className="pointer-events-none absolute left-full z-50 ml-3 hidden whitespace-nowrap rounded-lg bg-[#2F172C] px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
                        {link.name}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Learning encouragement */}
        <div className="mt-auto p-4">
          <div className={`rounded-2xl border border-white/10 bg-white/[0.07] p-4 ${
            collapsed ? "md:hidden" : ""
          }`}>
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#D9F3E7] text-lg text-[#285D4D]">
              🌱
            </div>

            <p className="text-sm font-semibold text-white">
              Keep growing
            </p>

            <p className="mt-1 text-xs leading-5 text-white/60">
              Every line of code brings you one step closer to your goals.
            </p>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-1/2 rounded-full bg-pink-400" />
            </div>

            <p className="mt-2 text-[10px] font-medium text-pink-200">
              Small steps. Great skills.
            </p>
          </div>

          {collapsed && (
            <div className="hidden justify-center md:flex">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.08] text-lg"
                title="Keep growing"
              >
                🌱
              </div>
            </div>
          )}

          <p className={`mt-4 text-center text-[10px] text-white/40 ${
            collapsed ? "md:hidden" : ""
          }`}>
            © {new Date().getFullYear()} Code Garden
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

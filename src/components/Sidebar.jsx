import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

// Keep these in sync with the dashboard (a shared progress helper is the next cleanup).
const HTML_LESSON_COUNT = 8;
const PROGRESS_KEY = "faidat-html-completed-lessons";

// Count valid completed HTML lessons saved on this device.
const readCompletedCount = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "[]");

    if (!Array.isArray(saved)) return 0;

    return new Set(
      saved.filter(
        (id) =>
          Number.isInteger(id) && id >= 1 && id <= HTML_LESSON_COUNT
      )
    ).size;
  } catch {
    return 0;
  }
};

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-5 w-5",
  "aria-hidden": "true",
  focusable: "false",
};

const DashboardIcon = () => (
  <svg {...iconProps}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
  </svg>
);

const CoursesIcon = () => (
  <svg {...iconProps}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
    <path d="M4 5.5v16M8 7h8M8 11h7" />
  </svg>
);

const LearningIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="8" r="4" />
    <path d="M5 20v-1.5a7 7 0 0 1 14 0V20z" />
    <path d="m9.5 14 2.5 2 2.5-2" />
  </svg>
);

const CloseIcon = () => (
  <svg {...iconProps} strokeWidth={2}>
    <path d="m18 6-12 12M6 6l12 12" />
  </svg>
);

const MenuIcon = () => (
  <svg {...iconProps} strokeWidth={2}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg {...iconProps}>
    <path d="m14 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg {...iconProps}>
    <path d="m10 18 6-6-6-6" />
  </svg>
);

const LogoIcon = () => (
  <svg {...iconProps} className="h-6 w-6">
    <path d="M8 8 4.5 12 8 16" />
    <path d="m16 8 3.5 4-3.5 4" />
    <path d="m14 5-4 14" />
  </svg>
);

// ---------------------------------------------------------------------------
// Navigation links
// `end` stops a link from staying active on its child routes, so "Courses"
// and "My Learning" are never highlighted at the same time.
// ---------------------------------------------------------------------------
const links = [
  { name: "Dashboard", path: "/", end: true, Icon: DashboardIcon },
  { name: "Courses", path: "/courses/html", end: true, Icon: CoursesIcon },
  {
    name: "My Learning",
    path: "/courses/html/lessons",
    end: false,
    Icon: LearningIcon,
  },
];

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------
const Sidebar = ({ collapsed, onToggle }) => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [completedCount, setCompletedCount] = useState(readCompletedCount);

  // The sidebar stays mounted between pages, so refresh progress and
  // close the mobile menu whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
    setCompletedCount(readCompletedCount());
  }, [pathname]);

  // Keep progress in sync when the tab regains focus or another tab saves.
  useEffect(() => {
    const sync = () => setCompletedCount(readCompletedCount());

    window.addEventListener("focus", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("focus", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // While the mobile menu is open: Escape closes it, the page behind
  // does not scroll, and it closes if the screen grows to desktop size.
  useEffect(() => {
    if (!mobileOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = (event) => {
      if (event.matches) setMobileOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", onKeyDown);
    desktopQuery.addEventListener("change", onBreakpoint);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktopQuery.removeEventListener("change", onBreakpoint);
    };
  }, [mobileOpen]);

  const percent = Math.round((completedCount / HTML_LESSON_COUNT) * 100);

  const progressMessage =
    completedCount === 0
      ? "Start your first lesson today."
      : completedCount >= HTML_LESSON_COUNT
      ? "HTML complete. Great work!"
      : `${completedCount} of ${HTML_LESSON_COUNT} HTML lessons done.`;

  return (
    <>
      {/* Mobile menu button */}
      {!mobileOpen && (
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="fixed left-4 top-4 z-[60] flex h-11 w-11 items-center justify-center rounded-xl border border-[#F0E3ED] bg-white text-[#42213D] shadow-sm transition hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-400 md:hidden"
          aria-label="Open navigation menu"
          aria-expanded="false"
          aria-controls="app-sidebar"
        >
          <MenuIcon />
        </button>
      )}

      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-[#241321]/40 backdrop-blur-[2px] md:hidden"
          aria-label="Close navigation overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        id="app-sidebar"
        aria-label="Sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/10 bg-[#42213D] text-white shadow-xl transition-[width,transform,visibility] duration-300 ease-in-out motion-reduce:transition-none md:visible md:z-40 md:translate-x-0 md:shadow-none ${
          collapsed ? "md:w-[84px]" : "md:w-64"
        } ${
          mobileOpen
            ? "visible w-72 translate-x-0"
            : "invisible w-72 -translate-x-full"
        }`}
      >
        {/* Brand */}
        <div
          className={`flex min-h-[88px] items-center justify-between border-b border-white/10 px-5 ${
            collapsed
              ? "md:min-h-0 md:flex-col md:justify-center md:gap-2 md:px-2 md:py-4"
              : ""
          }`}
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pink-500 text-white shadow-lg shadow-pink-950/20">
              <LogoIcon />
            </div>

            <div className={collapsed ? "md:hidden" : ""}>
              <p className="whitespace-nowrap text-lg font-bold tracking-tight">
                Code Garden
              </p>
              <p className="mt-0.5 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.14em] text-pink-200">
                Learn · Build · Grow
              </p>
            </div>
          </div>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-300 md:hidden"
            aria-label="Close navigation menu"
          >
            <CloseIcon />
          </button>

          {/* Desktop collapse / expand button */}
          <button
            type="button"
            onClick={onToggle}
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-300 md:flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </button>
        </div>

        {/* Navigation */}
        <div className="px-4 pt-8">
          <p
            className={`mb-3 px-3 text-xs font-bold uppercase tracking-[0.18em] text-pink-200/80 ${
              collapsed ? "md:hidden" : ""
            }`}
          >
            Workspace
          </p>

          <nav className="space-y-2" aria-label="Main navigation">
            {links.map(({ name, path, end, Icon }) => (
              <NavLink
                key={path}
                to={path}
                end={end}
                title={collapsed ? name : undefined}
                className={({ isActive }) =>
                  `group relative flex min-h-12 items-center gap-3 rounded-xl px-3.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${
                    collapsed ? "md:justify-center md:px-0" : ""
                  } ${
                    isActive
                      ? "bg-pink-600 text-white shadow-lg shadow-pink-950/20"
                      : "text-white/75 hover:bg-white/[0.08] hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-3 left-0 top-3 w-1 rounded-r-full bg-white"
                      />
                    )}

                    <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                      <Icon />
                    </span>

                    <span
                      className={`whitespace-nowrap ${
                        collapsed ? "md:hidden" : ""
                      }`}
                    >
                      {name}
                    </span>

                    {collapsed && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute left-full z-50 ml-3 hidden whitespace-nowrap rounded-lg bg-[#2F172C] px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 md:block"
                      >
                        {name}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Learning encouragement and progress */}
        <div className="mt-auto p-4">
          <div
            className={`rounded-2xl border border-white/10 bg-white/[0.07] p-4 ${
              collapsed ? "md:hidden" : ""
            }`}
          >
            <div
              aria-hidden="true"
              className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#D9F3E7] text-lg text-[#285D4D]"
            >
              🌱
            </div>

            <p className="text-sm font-semibold text-white">Keep growing</p>

            <p className="mt-1 text-xs leading-5 text-white/70">
              Every line of code brings you one step closer to your goals.
            </p>

            <div
              className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-label="HTML course completion"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percent}
            >
              <div
                className="h-full rounded-full bg-pink-400 transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>

            <p className="mt-2 text-xs font-medium text-pink-200">
              {progressMessage}
            </p>
          </div>

          {collapsed && (
            <div className="hidden justify-center md:flex">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.08] text-lg"
                title={`Keep growing · ${percent}% of HTML complete`}
              >
                <span aria-hidden="true">🌱</span>
                <span className="sr-only">
                  Keep growing. {percent}% of HTML complete.
                </span>
              </div>
            </div>
          )}

          <p
            className={`mt-4 text-center text-xs text-white/60 ${
              collapsed ? "md:hidden" : ""
            }`}
          >
            © {new Date().getFullYear()} Code Garden
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
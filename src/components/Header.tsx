"use client";

import { useState } from "react";

const navLinks = [
  { label: "本周", href: "#weekly" },
  { label: "公司追踪", href: "#tracker" },
  { label: "往期归档", href: "#archive" },
  { label: "关于", href: "#about" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(8, 14, 26, 0.88)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(29, 48, 80, 0.8)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div
            className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
            style={{
              background: "rgba(0, 212, 255, 0.12)",
              border: "1px solid rgba(0, 212, 255, 0.3)",
              color: "#00D4FF",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            ψ
          </div>
          <div>
            <span
              className="font-display font-semibold text-sm tracking-tight"
              style={{ color: "#E2EAF4" }}
            >
              Neural
            </span>
            <span
              className="font-display font-semibold text-sm tracking-tight"
              style={{ color: "#00D4FF" }}
            >
              Pulse
            </span>
          </div>
          <span
            className="hidden sm:inline-block font-mono text-xs px-1.5 py-0.5 rounded"
            style={{
              background: "rgba(245, 166, 36, 0.1)",
              color: "#F5A624",
              border: "1px solid rgba(245, 166, 36, 0.2)",
              fontSize: "10px",
            }}
          >
            WEEKLY
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm transition-colors duration-150"
              style={{ color: "#7A95B0" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#E2EAF4")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#7A95B0")
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Subscribe button + mobile menu */}
        <div className="flex items-center gap-3">
          <a
            href="#subscribe"
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-all duration-150"
            style={{
              background: "rgba(0, 212, 255, 0.1)",
              color: "#00D4FF",
              border: "1px solid rgba(0, 212, 255, 0.25)",
              fontFamily: "JetBrains Mono, monospace",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(0, 212, 255, 0.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(0, 212, 255, 0.1)";
            }}
          >
            <span>⬡</span>
            <span>订阅周报</span>
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1.5"
            style={{ color: "#7A95B0" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-4 pb-4 pt-2"
          style={{ borderTop: "1px solid rgba(29, 48, 80, 0.6)" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2 text-sm"
              style={{ color: "#7A95B0" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#subscribe"
            className="block mt-2 py-2 text-sm"
            style={{ color: "#00D4FF" }}
            onClick={() => setMenuOpen(false)}
          >
            订阅周报
          </a>
        </div>
      )}
    </header>
  );
}

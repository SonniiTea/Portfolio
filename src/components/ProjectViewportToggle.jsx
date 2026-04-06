import React from "react";

const MODES = [
  { id: "desktop", label: "Desktop" },
  { id: "tablet", label: "Tablet" },
  { id: "mobile", label: "Mobile" },
];

/**
 * Segment control to preview project content at common viewport widths.
 * Parent should wrap content in `.project-viewport__frame.project-viewport__frame--{id}`.
 */
export default function ProjectViewportToggle({ value, onChange }) {
  return (
    <div
      className="project-viewport__toggle"
      role="group"
      aria-label="Preview size"
    >
      {MODES.map((m) => (
        <button
          key={m.id}
          type="button"
          className={
            value === m.id
              ? "project-viewport__btn project-viewport__btn--active"
              : "project-viewport__btn"
          }
          onClick={() => onChange(m.id)}
          aria-pressed={value === m.id}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

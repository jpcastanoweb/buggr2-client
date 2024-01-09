import React from "react";

export default function Arrow() {
  return (
    <div
      className="hidden lg:block absolute top-0 right-0 h-full w-5"
      aria-hidden="true"
    >
      <svg
        className="h-full w-full text-gray-300"
        viewBox="0 0 22 80"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 -2L20 40L0 82"
          vector-effect="non-scaling-stroke"
          stroke="currentcolor"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

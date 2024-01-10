import React from "react";
import Arrow from "./Arrow";

export default function CompletedStep(props) {
  return (
    <li key={props.number} className="relative md:flex-1 md:flex">
      {/* <!-- Completed Step --> */}
      <div className="group flex items-center w-full">
        <span className="px-6 py-4 flex items-center text-sm font-medium">
          <span
            className={
              props.red
                ? "flex-shrink-0 w-10 h-10 flex items-center justify-center bg-red-600 rounded-full group-hover:bg-red-800"
                : "flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800"
            }
          >
            {/* <!-- Heroicon name: solid/check --> */}
            <svg
              className="w-6 h-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill={props.red ? "red" : "currentColor"}
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="ml-4 text-sm font-medium text-gray-900">
            {props.name}
          </span>
        </span>
      </div>
      {props.number < props.max - 1 ? <Arrow /> : <></>}
    </li>
  );
}

import React from "react";
import Arrow from "./Arrow";
export default function CurrentStep(props) {
  return (
    <li key={props.number} className="relative md:flex-1 md:flex">
      {/* <!-- Current Step --> */}
      <div
        className="px-6 py-4 flex items-center text-sm font-medium"
        aria-current="step"
      >
        <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full">
          <span className="text-indigo-600">{props.number}</span>
        </span>
        <span className="ml-4 text-sm font-medium text-indigo-600">
          {props.name}
        </span>
      </div>
      {props.number < props.max - 1 ? <Arrow /> : <></>}
    </li>
  );
}

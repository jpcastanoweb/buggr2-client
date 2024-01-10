import React from "react";
import Arrow from "./Arrow";

export default function UpcomingStep(props) {
  return (
    <li key={props.number} className="relative md:flex-1 md:flex">
      {/* <!-- Upcoming Step --> */}
      <div className="group flex items-center">
        <span className="px-6 py-4 flex items-center text-sm font-medium">
          <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400">
            <span className="text-gray-500 group-hover:text-gray-900">
              {props.number}
            </span>
          </span>
          <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
            {props.name}
          </span>
        </span>
      </div>

      {props.number < props.max - 1 ? <Arrow /> : <></>}
    </li>
  );
}

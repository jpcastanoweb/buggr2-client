import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import OrgContext from "../../context/Organization/OrgContext"

export default function Customers() {
  const orgCtx = useContext(OrgContext)
  const { opportunities, loadOpportunities } = orgCtx

  useEffect(() => {
    loadOpportunities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      {/* Heading */}
      <div className="mb-3 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Opportunities
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-purple-900 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Divider */}
      <hr className="border-gray-300 mb-3" />
      <div class="pb-5 border-b border-gray-200">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Sort Filter Search
        </h3>
      </div>
    </div>
  )
}

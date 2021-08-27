import React, { useState } from "react"
import { Link } from "react-router-dom"
import main_logo from "./../../images/main_logo_notext.png"

export default function Header() {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div>
      {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
      <div class="relative bg-white">
        <div
          class="absolute inset-0 shadow z-30 pointer-events-none"
          aria-hidden="true"
        ></div>
        <div class="relative z-20">
          <div class="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
            <div>
              <Link to="/" class="flex items-center">
                <span class="sr-only">Buggr</span>
                <img class="h-8 w-auto sm:h-10" src={main_logo} alt="" />
                <span className="font-body text-3xl m-2 text-gray-700">
                  Buggr
                </span>
              </Link>
            </div>
            <div class="-mr-2 -my-2 md:hidden">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  setShowMenu(true)
                }}
                class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-expanded="false"
              >
                <span class="sr-only">Open menu</span>
                {/* <!-- Heroicon name: outline/menu --> */}
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <div class="hidden md:flex-1 md:flex md:items-center md:justify-between">
              <nav class="flex space-x-10">
                <Link
                  to="/"
                  class="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Home
                </Link>
                <Link
                  to="/pricing"
                  class="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Pricing
                </Link>
              </nav>
              <div class="flex items-center md:ml-12">
                <Link
                  to="/login"
                  class="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  class="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-900 hover:bg-purple-700"
                >
                  Get Started!
                </Link>
              </div>
            </div>
          </div>
        </div>

        {showMenu ? (
          <div class="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
            <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div class="pt-5 pb-6 px-5 sm:pb-8">
                <div class="flex items-center justify-between">
                  <div>
                    <img class="h-8 w-auto" src={main_logo} alt="Workflow" />
                  </div>
                  <div class="-mr-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        setShowMenu(false)
                      }}
                      class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                      <span class="sr-only">Close menu</span>
                      {/* <!-- Heroicon name: outline/x --> */}
                      <svg
                        class="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="mt-6 sm:mt-8">
                  <nav>
                    <div class="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                      <Link
                        to="/"
                        class="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-50"
                      >
                        <div class="ml-4 text-base font-medium text-gray-900">
                          Home
                        </div>
                      </Link>

                      <Link
                        to="/pricing"
                        class="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-50"
                      >
                        <div class="ml-4 text-base font-medium text-gray-900">
                          Pricing
                        </div>
                      </Link>
                    </div>
                  </nav>
                </div>
              </div>
              <div class="py-6 px-5">
                <div class="mt-6">
                  <Link
                    to="/signup"
                    class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-900 hover:bg-purple-700"
                  >
                    Sign up
                  </Link>
                  <p class="mt-6 text-center text-base font-medium text-gray-500">
                    Existing customer?{" "}
                    <Link
                      to="/login"
                      class="text-purple-900 hover:text-purple-700"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

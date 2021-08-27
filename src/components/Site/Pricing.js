import React from "react"
import { Link } from "react-router-dom"

export default function Pricing() {
  return (
    <div>
      <div class="bg-purple-900">
        <div class="pt-12 sm:pt-16 lg:pt-24">
          <div class="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto space-y-2 lg:max-w-none">
              <h2 class="text-lg leading-6 font-semibold text-gray-300 uppercase tracking-wider">
                Pricing
              </h2>
              <p class="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                The right price for you, whoever you are
              </p>
            </div>
          </div>
        </div>
        <div class="mt-8 pb-12 bg-gray-50 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24">
          <div class="relative">
            <div class="absolute inset-0 h-3/4 bg-purple-900"></div>
            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="max-w-md mx-auto space-y-4 lg:max-w-5xl lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0">
                <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <div class="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                    <div>
                      <h3
                        class="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-indigo-100 text-indigo-600"
                        id="tier-standard"
                      >
                        Monthly
                      </h3>
                    </div>
                    <div class="mt-4 flex items-baseline text-6xl font-extrabold">
                      $12
                      <span class="ml-1 text-2xl font-medium text-gray-500">
                        /mo
                      </span>
                    </div>
                    <p class="mt-5 text-lg text-gray-500">
                      No commitment. Cancel any time.
                    </p>
                  </div>
                  <div class="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6">
                    <ul class="space-y-4">
                      <li class="flex items-start">
                        <div class="flex-shrink-0">
                          {/* <!-- Heroicon name: outline/check --> */}
                          <svg
                            class="h-6 w-6 text-green-500"
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p class="ml-3 text-base text-gray-700">
                          Customer Directory
                        </p>
                      </li>
                      <li class="flex items-start">
                        <div class="flex-shrink-0">
                          {/* <!-- Heroicon name: outline/check --> */}
                          <svg
                            class="h-6 w-6 text-green-500"
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p class="ml-3 text-base text-gray-700">
                          Track opportunity stages
                        </p>
                      </li>
                      <li class="flex items-start">
                        <div class="flex-shrink-0">
                          {/* <!-- Heroicon name: outline/check --> */}
                          <svg
                            class="h-6 w-6 text-green-500"
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p class="ml-3 text-base text-gray-700">
                          Convert Opps to Projects
                        </p>
                      </li>
                      <li class="flex items-start">
                        <div class="flex-shrink-0">
                          {/* <!-- Heroicon name: outline/check --> */}
                          <svg
                            class="h-6 w-6 text-green-500"
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p class="ml-3 text-base text-gray-700">
                          Track your project's status
                        </p>
                      </li>
                      <li class="flex items-start">
                        <div class="flex-shrink-0">
                          {/* <!-- Heroicon name: outline/check --> */}
                          <svg
                            class="h-6 w-6 text-green-500"
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p class="ml-3 text-base text-gray-700">
                          Write down your notes
                        </p>
                      </li>
                      <li class="flex items-start">
                        <div class="flex-shrink-0">
                          {/* <!-- Heroicon name: outline/check --> */}
                          <svg
                            class="h-6 w-6 text-green-500"
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p class="ml-3 text-base text-gray-700">
                          Assign contacts to projects
                        </p>
                      </li>
                    </ul>
                    <div class="rounded-md shadow">
                      <Link
                        to="/signup"
                        class="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-900 hover:bg-purple-700"
                        aria-describedby="tier-standard"
                      >
                        Get started
                      </Link>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <div class="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                    <div>
                      <h3
                        class="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-indigo-100 text-indigo-600"
                        id="tier-standard"
                      >
                        Yearly
                      </h3>
                    </div>
                    <div class="mt-4 flex items-baseline text-6xl font-extrabold">
                      $120
                      <span class="ml-1 text-2xl font-medium text-gray-500">
                        /yr
                      </span>
                    </div>
                    <p class="mt-5 text-lg text-gray-500">
                      One-time payment. Discounted rate.
                    </p>
                  </div>
                  <div class="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6">
                    <ul class="space-y-4">
                      <li class="flex items-start">
                        <div class="flex-shrink-0">
                          {/* <!-- Heroicon name: outline/check --> */}
                          <svg
                            class="h-6 w-6 text-green-500"
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p class="ml-3 text-base text-gray-700">
                          Customer Directory
                        </p>
                      </li>
                      <li class="flex items-start">
                        <div class="flex-shrink-0">
                          {/* <!-- Heroicon name: outline/check --> */}
                          <svg
                            class="h-6 w-6 text-green-500"
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p class="ml-3 text-base text-gray-700">
                          Track opportunity stages
                        </p>
                      </li>
                      <li class="flex items-start">
                        <div class="flex-shrink-0">
                          {/* <!-- Heroicon name: outline/check --> */}
                          <svg
                            class="h-6 w-6 text-green-500"
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p class="ml-3 text-base text-gray-700">
                          Convert Opps to Projects
                        </p>
                      </li>
                      <li class="flex items-start">
                        <div class="flex-shrink-0">
                          {/* <!-- Heroicon name: outline/check --> */}
                          <svg
                            class="h-6 w-6 text-green-500"
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p class="ml-3 text-base text-gray-700">
                          Track your project's status
                        </p>
                      </li>
                      <li class="flex items-start">
                        <div class="flex-shrink-0">
                          {/* <!-- Heroicon name: outline/check --> */}
                          <svg
                            class="h-6 w-6 text-green-500"
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p class="ml-3 text-base text-gray-700">
                          Write down your notes
                        </p>
                      </li>
                      <li class="flex items-start">
                        <div class="flex-shrink-0">
                          {/* <!-- Heroicon name: outline/check --> */}
                          <svg
                            class="h-6 w-6 text-green-500"
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p class="ml-3 text-base text-gray-700">
                          Assign contacts to projects
                        </p>
                      </li>
                    </ul>
                    <div class="rounded-md shadow">
                      <Link
                        to="/signup"
                        class="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white  bg-purple-900 hover:bg-purple-700"
                        aria-describedby="tier-standard"
                      >
                        Get started
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

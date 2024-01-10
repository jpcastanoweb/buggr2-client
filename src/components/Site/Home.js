import React from "react";
import { Link } from "react-router-dom";
import opportunity_page from "./../../images/opportunity-page-homepage.png";

export default function Home() {
  return (
    <div>
      {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
      <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">
              Improve the efficiency of your{" "}
            </span>
            <span className="block text-green-400 xl:inline">
              web development agency
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Let Buggr become your single source of information for your
            business. Save countless hours in opportunity and project management
            so that you can focus on what matters, developing.
          </p>
        </div>
      </main>
      <div className="bg-white">
        <div className="w-screen pt-16 ">
          <div className="bg-green-400 shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-gray-700 sm:text-4xl">
                  <span className="block">Ready to dive in?</span>
                  <span className="block">
                    Start for{" "}
                    <span className="block text-purple-900 md:inline">
                      free
                    </span>{" "}
                    today.
                  </span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-black">
                  We haven't launched yet, so use card number
                  <br /> <i className="text-purple-900">
                    4242 4242 4242 4242
                  </i>{" "}
                  to sign up for free.
                </p>
                <Link
                  to="/signup"
                  className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-purple-900 hover:bg-purple-50"
                >
                  Sign up for free
                </Link>
              </div>
            </div>
            <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
              <img
                className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                src={opportunity_page}
                alt="App screenshot"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              All-in-one platform
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Maximize your team's productivity. One single source of truth.
            </p>
          </div>
          <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
            <div className="relative">
              <dt>
                {/* <!-- Heroicon name: outline/check --> */}
                <svg
                  className="absolute h-6 w-6 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="ml-9 text-lg leading-6 font-medium text-gray-900">
                  Customer Directory
                </p>
              </dt>
              <dd className="mt-2 ml-9 text-base text-gray-500">
                Keep a historic record of all your customers in one place. Have
                access to historic revenue and open business data.
              </dd>
            </div>

            <div className="relative">
              <dt>
                {/* <!-- Heroicon name: outline/check --> */}
                <svg
                  className="absolute h-6 w-6 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="ml-9 text-lg leading-6 font-medium text-gray-900">
                  Track opportunity stages
                </p>
              </dt>
              <dd className="mt-2 ml-9 text-base text-gray-500">
                With a friendly UI, it becomes easier than ever to not let any
                opportunity slide through the cracks.
              </dd>
            </div>

            <div className="relative">
              <dt>
                {/* <!-- Heroicon name: outline/check --> */}
                <svg
                  className="absolute h-6 w-6 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="ml-9 text-lg leading-6 font-medium text-gray-900">
                  Convert Opps to Projects
                </p>
              </dt>
              <dd className="mt-2 ml-9 text-base text-gray-500">
                Easily convert won opportunities into projects to start tracking
                your development efforts and keep your customers happy.
              </dd>
            </div>

            <div className="relative">
              <dt>
                {/* <!-- Heroicon name: outline/check --> */}
                <svg
                  className="absolute h-6 w-6 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="ml-9 text-lg leading-6 font-medium text-gray-900">
                  Track your project's status
                </p>
              </dt>
              <dd className="mt-2 ml-9 text-base text-gray-500">
                Don't lose track of your project's progress. Easily access your
                point of contact and keep track of everything that's happening.
              </dd>
            </div>

            <div className="relative">
              <dt>
                {/* <!-- Heroicon name: outline/check --> */}
                <svg
                  className="absolute h-6 w-6 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="ml-9 text-lg leading-6 font-medium text-gray-900">
                  Write down your notes
                </p>
              </dt>
              <dd className="mt-2 ml-9 text-base text-gray-500">
                Don't forget anything! Write down all your meeting notes and
                messages and easily access them for reference.
              </dd>
            </div>

            <div className="relative">
              <dt>
                {/* <!-- Heroicon name: outline/check --> */}
                <svg
                  className="absolute h-6 w-6 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="ml-9 text-lg leading-6 font-medium text-gray-900">
                  Assign contacts to projects
                </p>
              </dt>
              <dd className="mt-2 ml-9 text-base text-gray-500">
                All projects can have a different point of contact. Assign your
                main contact from a customer directly to an opportunity or
                project.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
          <div className="lg:w-0 lg:flex-1">
            <h5
              className="text-4xl font-extrabold tracking-tight text-white sm:text-4xl"
              id="newsletter-headline"
            >
              No commitment <span className="text-green-400">monthly</span>{" "}
              pricing.
            </h5>
            <h5
              className="text-4xl font-extrabold tracking-tight text-white sm:text-4xl"
              id="newsletter-headline"
            >
              Discounted <span className="text-green-400">yearly</span> pricing.
            </h5>
          </div>
          <div className="mt-8 lg:mt-0 lg:ml-8 sm:w-sm">
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:flex-shrink-0">
              <Link
                to="/pricing"
                className="w-full flex justify-between items-center px-5 py-3 border border-transparent text-base font-medium  text-white  outline-none ring-2 ring-offset-2 ring-offset-gray-800 ring-purple-500 hover:text-gray-300"
              >
                <span>Read more about pricing </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

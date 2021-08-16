import React, { useContext } from "react"
import { Link } from "react-router-dom"
import mainLogoNoText from "./../../main_logo_notext.png"
import Customers from "../Pages/Customers"
import Dashboard from "../Pages/Dashboard"
import Opportunities from "../Pages/Opportunities"
import Projects from "../Pages/Projects"
import PrivateRoute from "../PrivateRoute"
import UserContext from "../../context/UserContext"

export default function MainApp(props) {
  const userCtx = useContext(UserContext)

  const { signout } = userCtx

  const submitSignout = (e) => {
    signout()
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
      <div
        className="fixed inset-0 flex z-40 md:hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* <!--
      Off-canvas menu overlay, show/hide based on off-canvas menu state.

      Entering: "transition-opacity ease-linear duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "transition-opacity ease-linear duration-300"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          aria-hidden="true"
        ></div>

        {/* <!--
      Off-canvas menu, show/hide based on off-canvas menu state.

      Entering: "transition ease-in-out duration-300 transform"
        From: "-translate-x-full"
        To: "translate-x-0"
      Leaving: "transition ease-in-out duration-300 transform"
        From: "translate-x-0"
        To: "-translate-x-full"
    --> */}
        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-russianViolet">
          {/* <!--
        Close button, show/hide based on off-canvas menu state.

        Entering: "ease-in-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in-out duration-300"
          From: "opacity-100"
          To: "opacity-0"
      --> */}
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Close sidebar</span>
              {/* <!-- Heroicon name: outline/x --> */}
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center flex-shrink-0 px-4">
            <img
              src={mainLogoNoText}
              alt=""
              width="50"
              className="d-inline-block align-text-top"
            />
            <span className="font-body text-3xl m-2 text-white">Buggr</span>
          </div>
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {/* <!-- Current: "bg-indigo-800 text-white", Default: "text-indigo-100 hover:bg-indigo-600" --> */}
              <Link
                to="/app"
                className="bg-indigo-800 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
              >
                {/* <!-- Heroicon name: outline/home --> */}
                <svg
                  className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Dashboard
              </Link>

              <Link
                to="/app/customers"
                className="text-indigo-100 hover:bg-indigo-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
              >
                {/* <!-- Heroicon name: outline/users --> */}
                <svg
                  className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                Customers
              </Link>

              <Link
                href="/app/opportunities"
                className="text-indigo-100 hover:bg-indigo-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
              >
                {/* <!-- Heroicon name: outline/folder --> */}
                <svg
                  className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke-width="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                Opportunities
              </Link>

              <Link
                href="/app/projects"
                className="text-indigo-100 hover:bg-indigo-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
              >
                {/* <!-- Heroicon name: outline/calendar --> */}
                <svg
                  className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Projects
              </Link>
            </nav>
          </div>
        </div>

        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* <!-- Dummy element to force sidebar to shrink to fit close icon --> */}
        </div>
      </div>
      {/* <!-- Static sidebar for desktop --> */}
      <div className="bg-russianViolet md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                src={mainLogoNoText}
                alt=""
                width="50"
                className="d-inline-block align-text-top"
              />
              <span className="font-body text-3xl m-2 text-white">Buggr</span>
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {/* <!-- Current: "bg-indigo-800 text-white", Default: "text-indigo-100 hover:bg-indigo-600" --> */}
                <Link
                  to="/app"
                  className="bg-indigo-800 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  {/* <!-- Heroicon name: outline/home --> */}
                  <svg
                    className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Dashboard
                </Link>

                <Link
                  to="/app/customers"
                  className="text-indigo-100 hover:bg-indigo-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  {/* <!-- Heroicon name: outline/users --> */}
                  <svg
                    className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  Customers
                </Link>

                <Link
                  to="/app/opportunities"
                  className="text-indigo-100 hover:bg-indigo-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  {/* <!-- Heroicon name: outline/folder --> */}
                  <svg
                    className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke-width="2"
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  Opportunities
                </Link>

                <Link
                  to="/app/projects"
                  className="text-indigo-100 hover:bg-indigo-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  {/* <!-- Heroicon name: outline/calendar --> */}
                  <svg
                    className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Projects
                </Link>
              </nav>
            </div>
          </div>
          <button
            onClick={(e) => {
              submitSignout(e)
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <main className="flex-1 relative overflow-y-auto focus:outline-none">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <PrivateRoute exact path={props.path} component={Dashboard} />
            <PrivateRoute
              exact
              path={`${props.path}/customers`}
              component={Customers}
            />
            <PrivateRoute
              path={`${props.path}/opportunities`}
              component={Opportunities}
            />
            <PrivateRoute
              path={`${props.path}/projects`}
              component={Projects}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

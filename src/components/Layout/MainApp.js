// dependencies
import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"

// images
import mainLogoNoText from "./../../images/main_logo_notext.png"

// contexts
import OrgContext from "./../../context/Organization/OrgContext"
import UserContext from "./../../context/User/UserContext"

// components
import Customers from "../Pages/Customers"
import Dashboard from "../Pages/Dashboard"
import Opportunities from "../Pages/Opportunities"
import Projects from "../Pages/Projects"
import PrivateRoute from "../PrivateRoute"
import UserNav from "../misc/UserNav"

export default function MainApp(props) {
  // GLOBAL STATE
  const orgCtx = useContext(OrgContext)
  const { org, orgId, customers, loadOrg, loadCustomers } = orgCtx

  const userCtx = useContext(UserContext)
  const { user } = userCtx

  // LOCAL STATE
  const [activeTab, setActiveTab] = useState("dashboard")

  useEffect(() => {
    const loadAll = async () => {
      await loadOrg(user.organizations[0])
      await loadCustomers(orgId)
    }

    loadAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-purple-900">
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
            <nav className="px-2 pr-0 space-y-1">
              {/* <!-- Current: "bg-indigo-800 text-white", Default: "text-indigo-100 hover:bg-indigo-600" --> */}
              <Link
                to="/app"
                className={
                  (activeTab === "dashboard"
                    ? "border-r-4 border-green-400  "
                    : "") +
                  "px-10 text-indigo-100 hover:bg-purple-700 group flex items-center px-2 py-2 text-sm font-medium "
                }
                onClick={() => {
                  setActiveTab("dashboard")
                }}
              >
                {/* <!-- Heroicon name: outline/home --> */}
                Dashboard
              </Link>

              <Link
                to="/app/customers"
                className={
                  (activeTab === "customers"
                    ? "border-r-4 border-green-400  "
                    : "") +
                  "px-10 text-indigo-100 hover:bg-purple-700 group flex items-center px-2 py-2 text-sm font-medium "
                }
                onClick={() => {
                  setActiveTab("customers")
                }}
              >
                Customers
              </Link>

              <Link
                to="/app/opportunities"
                className={
                  (activeTab === "opportunities"
                    ? "border-r-4 border-green-400  "
                    : "") +
                  "px-10 text-indigo-100 hover:bg-purple-700 group flex items-center px-2 py-2 text-sm font-medium "
                }
                onClick={() => {
                  setActiveTab("opportunities")
                }}
              >
                {/* <!-- Heroicon name: outline/folder --> */}
                Opportunities
              </Link>

              <Link
                to="/app/projects"
                className={
                  (activeTab === "projects"
                    ? "border-r-4 border-green-400  "
                    : "") +
                  "px-10 text-indigo-100 hover:bg-purple-700 group flex items-center px-2 py-2 text-sm font-medium "
                }
                onClick={() => {
                  setActiveTab("projects")
                }}
              >
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
      <div className="bg-purple-900 md:flex md:flex-shrink-0">
        <div className="flex flex-col w-52">
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
              <nav className="flex-1 space-y-1">
                {/* <!-- Current: "bg-indigo-800 text-white", Default: "text-indigo-100 hover:bg-indigo-600" --> */}
                <Link
                  to="/app"
                  className={
                    (activeTab === "dashboard"
                      ? "border-r-4 border-green-400  "
                      : "") +
                    "px-10 text-indigo-100 hover:bg-purple-700 group flex items-center px-2 py-2 text-sm font-medium "
                  }
                  onClick={() => {
                    setActiveTab("dashboard")
                  }}
                >
                  {/* <!-- Heroicon name: outline/home --> */}
                  Dashboard
                </Link>

                <Link
                  to="/app/customers"
                  className={
                    (activeTab === "customers"
                      ? "border-r-4 border-green-400  "
                      : "") +
                    "px-10 text-indigo-100 hover:bg-purple-700 group flex items-center px-2 py-2 text-sm font-medium "
                  }
                  onClick={() => {
                    setActiveTab("customers")
                  }}
                >
                  Customers
                </Link>

                <Link
                  to="/app/opportunities"
                  className={
                    (activeTab === "opportunities"
                      ? "border-r-4 border-green-400  "
                      : "") +
                    "px-10 text-indigo-100 hover:bg-purple-700 group flex items-center px-2 py-2 text-sm font-medium "
                  }
                  onClick={() => {
                    setActiveTab("opportunities")
                  }}
                >
                  {/* <!-- Heroicon name: outline/folder --> */}
                  Opportunities
                </Link>

                <Link
                  to="/app/projects"
                  className={
                    (activeTab === "projects"
                      ? "border-r-4 border-green-400  "
                      : "") +
                    "px-10 text-indigo-100 hover:bg-purple-700 group flex items-center px-2 py-2 text-sm font-medium "
                  }
                  onClick={() => {
                    setActiveTab("projects")
                  }}
                >
                  Projects
                </Link>
              </nav>
            </div>
          </div>
          <UserNav />
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

// dependencies
import React, { useState, useEffect, useContext } from "react"
import { Link, Switch, useRouteMatch } from "react-router-dom"

// images
import mainLogoNoText from "./../../images/main_logo_notext.png"

// contexts
import OrgContext from "./../../context/Organization/OrgContext"
import UserContext from "./../../context/User/UserContext"

// states
import CustomerState from "../../context/Customer/CustomerState"
import ProjectState from "../../context/Project/ProjectState"
import OpportunityState from "../../context/Opportunity/OpportunityState"

// components
import Customers from "../Pages/Customers"
import Opportunities from "../Pages/Opportunities"
import Projects from "../Pages/Projects"
import PrivateActiveSubRoute from "../PrivateActiveSubRoute"
import UserNav from "../misc/UserNav"
import SingleCustomer from "../Pages/SingleCustomer"
import SingleProject from "../Pages/SingleProject"
import SingleOpporunity from "../Pages/SingleOpportunity"
import EditCustomer from "../Pages/EditCustomer"
import EditProject from "../Pages/EditProject"
import EditOpportunity from "../Pages/EditOpportunity"
import AddCustomer from "../Pages/AddCustomer"
import AddOpportunity from "../Pages/AddOpportunity"
import AddProject from "../Pages/AddProject"
import Settings from "./Settings"
import Dashboard from "../Pages/Dashboard"

export default function MainApp(props) {
  let { path } = useRouteMatch()

  // GLOBAL STATE
  const orgCtx = useContext(OrgContext)
  const { loadOrg } = orgCtx

  const userCtx = useContext(UserContext)
  const { user } = userCtx

  // LOCAL STATE
  const [activeTab, setActiveTab] = useState("")

  useEffect(() => {
    const loadAll = async () => {
      await loadOrg(user.organizations[0])
      // await loadCustomers(orgId)
    }

    loadAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
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
            <div className="mt-5 flex-1 flex flex-col ">
              <nav className="flex-1 space-y-1">
                <Link
                  to="/app/customers"
                  className={
                    (activeTab === "customers"
                      ? "border-r-4 border-green-400"
                      : "") +
                    "px-6 text-lg border-green-400 text-indigo-100 flex flex-row justify-start items-center hover:bg-purple-700 group flex items-center px-6 py-2 text-sm font-medium "
                  }
                  onClick={() => {
                    setActiveTab("customers")
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                    />
                  </svg>
                  <span className="ml-4">Customers</span>
                </Link>

                <Link
                  to="/app/opportunities"
                  className={
                    (activeTab === "opportunities"
                      ? "border-r-4 border-green-400"
                      : "") +
                    "px-6 text-lg border-green-400 text-indigo-100 flex flex-row justify-start items-center hover:bg-purple-700 group flex items-center px-6 py-2 text-sm font-medium "
                  }
                  onClick={() => {
                    setActiveTab("opportunities")
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <span className="ml-4">Opportunities</span>
                </Link>

                <Link
                  to="/app/projects"
                  className={
                    (activeTab === "projects"
                      ? "border-r-4 border-green-400"
                      : "") +
                    "px-6 text-lg border-green-400 text-indigo-100 flex flex-row justify-start items-center hover:bg-purple-700 group flex items-center px-6 py-2 text-sm font-medium "
                  }
                  onClick={() => {
                    setActiveTab("projects")
                  }}
                >
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>

                  <span className="ml-4">Projects</span>
                </Link>
              </nav>
            </div>
          </div>
          <UserNav />
        </div>
      </div>

      <main className="flex-1 relative overflow-y-auto focus:outline-none">
        <div className="py-6">
          <CustomerState>
            <ProjectState>
              <OpportunityState>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                  <Switch>
                    <PrivateActiveSubRoute
                      exact
                      path={`${path}/`}
                      component={Dashboard}
                    />
                    <PrivateActiveSubRoute
                      exact
                      path={`${path}/customers`}
                      component={Customers}
                    />
                    <PrivateActiveSubRoute
                      exact
                      path={`${path}/customers/new`}
                      component={AddCustomer}
                    />
                    <PrivateActiveSubRoute
                      exact
                      path={`${path}/customers/:customerid`}
                      component={SingleCustomer}
                    />
                    <PrivateActiveSubRoute
                      exact
                      path={`${path}/customers/edit/:customerid`}
                      component={EditCustomer}
                    />

                    <PrivateActiveSubRoute
                      exact
                      path={`${path}/opportunities`}
                      component={Opportunities}
                    />
                    <PrivateActiveSubRoute
                      exact
                      path={`${path}/opportunities/new`}
                      component={AddOpportunity}
                    />
                    <PrivateActiveSubRoute
                      exact
                      path={`${path}/opportunities/:opportunityid`}
                      component={SingleOpporunity}
                    />
                    <PrivateActiveSubRoute
                      exact
                      path={`${path}/opportunities/edit/:opportunityid`}
                      component={EditOpportunity}
                    />

                    <PrivateActiveSubRoute
                      exact
                      path={`${path}/projects`}
                      component={Projects}
                    />
                    <PrivateActiveSubRoute
                      exact
                      path={`${path}/projects/new`}
                      component={AddProject}
                    />
                    <PrivateActiveSubRoute
                      exact
                      path={`${path}/projects/:projectid`}
                      component={SingleProject}
                    />
                    <PrivateActiveSubRoute
                      exact
                      path={`${path}/projects/edit/:projectid`}
                      component={EditProject}
                    />
                    <PrivateActiveSubRoute
                      exact
                      path={`${path}/settings`}
                      component={Settings}
                    />
                  </Switch>
                </div>
              </OpportunityState>
            </ProjectState>
          </CustomerState>
        </div>
      </main>
    </div>
  )
}

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
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 space-y-1">
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

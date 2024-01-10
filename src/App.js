import "./App.css";
import "./index.css";

import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";

import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import MainApp from "./components/Layout/MainApp";
import UserState from "./context/User/UserState";
import PrivateRoute from "./components/PrivateRoute";
import AuthRoute from "./components/AuthRoute";
import OrgState from "./context/Organization/OrgState";
import SubscribePage from "./components/Pages/Stripe/SubscribePage";
import PrivateActiveSubRoute from "./components/ProtectedMainApp";
import SessionSuccess from "./components/Pages/Stripe/SessionSuccess";
import SessionFailed from "./components/Pages/Stripe/SessionFailed";
import Site from "./components/Site/Site";
import Home from "./components/Site/Home";
import Pricing from "./components/Site/Pricing";
import Dashboard from "./components/Pages/Dashboard";
import Customers from "./components/Pages/Customers";
import AddCustomer from "./components/Pages/AddCustomer";
import SingleCustomer from "./components/Pages/SingleCustomer";
import EditCustomer from "./components/Pages/EditCustomer";
import Opportunities from "./components/Pages/Opportunities";
import AddOpportunity from "./components/Pages/AddOpportunity";
import SingleOpportunity from "./components/Pages/SingleOpportunity";
import EditOpportunity from "./components/Pages/EditOpportunity";
import Projects from "./components/Pages/Projects";
import AddProject from "./components/Pages/AddProject";
import SingleProject from "./components/Pages/SingleProject";
import EditProject from "./components/Pages/EditProject";
import Settings from "./components/Layout/Settings";
import { Children } from "react";

function App() {
  return (
    <>
      <UserState>
        <OrgState>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Site />}>
                <Route path="/" element={<Home />} />
                <Route path="/pricing" element={<Pricing />} />
              </Route>
              <Route path="/subscribe" element={<SubscribePage />}></Route>

              {/* Auth Routes */}
              <Route
                path="/login"
                element={
                  <AuthRoute>
                    <Login />
                  </AuthRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <AuthRoute>
                    <Signup />
                  </AuthRoute>
                }
              />

              {/* Private Routes */}
              <Route path="/app" element={<PrivateActiveSubRoute />}>
                <Route path={""} element={<Dashboard />} />
                <Route path={`customers`} element={<Customers />} />
                <Route path={`customers/new`} element={<AddCustomer />} />
                <Route
                  path={`customers/:customerid`}
                  element={<SingleCustomer />}
                />
                <Route
                  path={`customers/edit/:customerid`}
                  element={<EditCustomer />}
                />

                <Route path={`opportunities`} element={<Opportunities />} />
                <Route
                  path={`opportunities/new`}
                  element={<AddOpportunity />}
                />
                <Route
                  path={`opportunities/:opportunityid`}
                  element={<SingleOpportunity />}
                />
                <Route
                  path={`opportunities/edit/:opportunityid`}
                  element={<EditOpportunity />}
                />

                <Route path={`projects`} element={<Projects />} />
                <Route path={`projects/new`} element={<AddProject />} />
                <Route
                  path={`projects/:projectid`}
                  element={<SingleProject />}
                />
                <Route
                  path={`projects/edit/:projectid`}
                  element={<EditProject />}
                />
                <Route path={`settings`} element={<Settings />} />
              </Route>
              <Route
                path="subscribe"
                element={
                  <PrivateRoute>
                    <SubscribePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="subscribe/failed-session"
                element={
                  <PrivateRoute>
                    <SessionFailed />
                  </PrivateRoute>
                }
              />
              <Route
                path="subscribe/successful-session"
                element={
                  <PrivateRoute>
                    <SessionSuccess />
                  </PrivateRoute>
                }
              />
              {/* <PrivateActiveSubRoute path="/app" component={MainApp} />
              <PrivateRoute exact path="/subscribe" component={SubscribePage} />
              <PrivateRoute
                exact
                path="/subscribe/successful-session"
                component={SessionSuccess}
              />
              <PrivateRoute
                exact
                path="/subscribe/failed-session"
                component={SessionFailed}
              /> */}

              {/* 404 Not Found */}
            </Routes>
          </BrowserRouter>
        </OrgState>
      </UserState>
    </>
  );
}

export default App;

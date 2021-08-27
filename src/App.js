import "./App.css"

import { Switch, Route, BrowserRouter as Router } from "react-router-dom"

import Home from "./components/Site/Home.js"
import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup"
import MainApp from "./components/Layout/MainApp"
import UserState from "./context/User/UserState"
import PrivateRoute from "./components/PrivateRoute"
import AuthRoute from "./components/AuthRoute"
import OrgState from "./context/Organization/OrgState"
import SubscribePage from "./components/Pages/Stripe/SubscribePage"
import PrivateActiveSubRoute from "./components/PrivateActiveSubRoute"
import SessionSuccess from "./components/Pages/Stripe/SessionSuccess"
import SessionFailed from "./components/Pages/Stripe/SessionFailed"
import Site from "./components/Site/Site"

function App() {
  return (
    <>
      <UserState>
        <OrgState>
          <Router>
            <Switch>
              {/* Private Routes */}
              <PrivateActiveSubRoute path="/app" component={MainApp} />
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
              />

              {/* Auth Routes */}
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/signup" component={Signup} />
              {/* Public Routes */}
              <Route path="/subscribe" component={SubscribePage}></Route>
              <Route path="/" component={Site} />
              {/* 404 Not Found */}
            </Switch>
          </Router>
        </OrgState>
      </UserState>
    </>
  )
}

export default App

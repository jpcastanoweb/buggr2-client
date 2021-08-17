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

function App() {
  return (
    <>
      <UserState>
        <OrgState>
          <Router>
            <Switch>
              {/* Private Routes */}
              <PrivateRoute path="/app" component={MainApp} />

              {/* Auth Routes */}
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/signup" component={Signup} />
              {/* Public Routes */}
              <Route path="/" component={Home} />
              {/* 404 Not Found */}
            </Switch>
          </Router>
        </OrgState>
      </UserState>
    </>
  )
}

export default App

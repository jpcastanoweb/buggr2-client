import "./App.css"

import { Switch, Route, BrowserRouter as Router } from "react-router-dom"

import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup"

function App() {
  return (
    <>
      <Router>
        <Switch>
          {/* Private Routes */}

          {/* Auth Routes */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />

          {/* Public Routes */}

          {/* 404 Not Found */}
        </Switch>
      </Router>
    </>
  )
}

export default App

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
import PrivateActiveSubRoute from "./components/PrivateActiveSubRoute";
import SessionSuccess from "./components/Pages/Stripe/SessionSuccess";
import SessionFailed from "./components/Pages/Stripe/SessionFailed";
import Site from "./components/Site/Site";
import Home from "./components/Site/Home";
import Pricing from "./components/Site/Pricing";

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

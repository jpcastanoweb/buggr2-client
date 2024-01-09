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

function App() {
  return (
    <>
      <UserState>
        <OrgState>
          <BrowserRouter>
            <Routes>
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

              {/* Auth Routes */}
              {/* <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/signup" component={Signup} /> */}
              {/* Public Routes */}
              <Route path="/subscribe" component={<SubscribePage />}></Route>
              <Route path="*" element={<Site />} />
              {/* 404 Not Found */}
            </Routes>
          </BrowserRouter>
        </OrgState>
      </UserState>
    </>
  );
}

export default App;

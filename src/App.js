import "./App.css";
import React, { useState } from "react";
import Header from "./Header/Header";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Welcome from "./Welcome/welcome";
import UserDataContextProvider from "./userDataContext";
import SignIU from "./signIU/signIU";
import Dashboard from "./Dashboard/dashboard";
import ForgotMyPassword from "./forgotMyPassword/forgotMyPassword";
import CreateNewPassword from "./createNewPassword/createNewPassword";
import ErrorPage from "./errorPage/errorPage";
import DashboardRoute from "./dashboardRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <UserDataContextProvider>
          <Header />
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/signIU" component={SignIU} />
            <DashboardRoute exact path="/dashboard" component={Dashboard} />
            <Route
              exact
              path="/forgotMyPassword"
              component={ForgotMyPassword}
            />
            <Route
              exact
              path="/createNewPassword"
              component={CreateNewPassword}
            />
            <Route exact path="/errorPage" component={ErrorPage} />
          </Switch>
        </UserDataContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;

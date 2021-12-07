import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/use.auth";
import HomePage from "./pages/Home";



import Login from "./pages/Login";
import Register from "./pages/Register";

export default function Routes() {
  const { signed } = useAuthContext();
  return (
    <BrowserRouter>
      <Switch>
        {signed ? (
          <Route path="/" exact component={HomePage} />
        ) : (
          <>
            <Route path="/register" component={Register} />
            <Redirect path="/" to="/login" />
            <Route path="/login" component={Login} />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}

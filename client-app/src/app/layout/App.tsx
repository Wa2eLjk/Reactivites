import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./navbar";
import ActivityDashboard from "../../features/activites/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router-dom";
import HomePage from "../../features/home/homePage";
import ActivityForm from "../../features/activites/form/ActivityForm";
import ActivityDetails from "../../features/activites/dashboard/details/ActivityDetails";

function App() {
  const location = useLocation();

  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path="/(.+)"
        render={() => (
          <>
            <Navbar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/activites" component={ActivityDashboard} />
              <Route
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              />
              <Route path="/activites/:id" component={ActivityDetails} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);

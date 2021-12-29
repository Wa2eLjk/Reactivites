import React, { Fragment, useEffect } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./navbar";
import ActivityDashboard from "../../features/activites/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponents";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivites();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading App" />;
  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);

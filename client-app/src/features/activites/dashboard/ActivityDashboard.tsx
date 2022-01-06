import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";




export default observer(function ActivityDashboard(){
    const { activityStore } = useStore();
    const {loadActivites,activityRegisty} = activityStore

    useEffect(() => {
      if (activityRegisty.size <= 0 ) loadActivites();
    }, [loadActivites,activityRegisty]);
  
    if (activityStore.loadingInitial)
      return <LoadingComponent content="Loading App" />;
   

    return(
        <Grid>
            <Grid.Column width='10'>
              <ActivityList />
              
            </Grid.Column>
            <Grid.Column width='6'>
               <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>
    )
})
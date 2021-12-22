import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import Navbar from './navbar';
import ActivityDashboard from '../../features/activites/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [activites,setActivites] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined> (undefined);
  const [editeMode, setEditMode] = useState(false);
  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/api/Activities').then(resoponse => {
    setActivites(resoponse.data);
    })
  }, [])

  function handleSelectActivity(id : string){
    setSelectedActivity(activites.find(x => x.id === id))
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }
  
  function handleCreateOrEditActivity(activity: Activity){
    activity.id
     ? setActivites([...activites.filter(x=>x.id !== activity.id), activity])
     :setActivites([...activites, {...activity, id: uuid()}])
     setEditMode(false)
     setSelectedActivity(activity);
    

  }

  function handleDeleteActivity(id:string){ 
    setActivites([...activites.filter(x=>x.id !== id)])
  }

  return (
    <>
     <Navbar  openForm={handleFormOpen} />
      <Container style = {{marginTop: '7em'}}>
       <ActivityDashboard 
       activites={activites}
       selectedActivity={selectedActivity}
       selectActivity={handleSelectActivity}
       cancelSelectActivity={handleCancelSelectActivity}
       editMode={editeMode}
       openForm={handleFormOpen}
       closeForm={handleFormClose}
       createOrEdit={handleCreateOrEditActivity}
       deleteActivity={handleDeleteActivity}
       />
      </Container>
     
    </>
  );
}

export default App;
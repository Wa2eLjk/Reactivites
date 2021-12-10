import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ducks } from './demp';
import DuckItem from './DuckItem';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activites,setActivites] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/api/Activities').then(resoponse => {
    console.log(resoponse);
    setActivites(resoponse.data);
    })
  }, [])
  return (
    <div>
      <Header as='h2' icon='users' content='reactivites'/>
      
        <List>
          {activites.map((activity: any) => (
            <List.Item key={activity.id}>
            {activity.title}
            </List.Item>
          ))}
        </List>
     
    </div>
  );
}

export default App;

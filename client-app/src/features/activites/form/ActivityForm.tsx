import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import {v4 as uuid} from 'uuid'
import { useStore } from "../../../app/stores/store";


export default observer(function ActivityForm(){
    const history = useHistory();
    const {activityStore} = useStore();
    const {createActivity,updateActivity,loading, loadactivity,loadingInitial} = activityStore
    const {id} = useParams<{id:string}>()

    const [activity, setActivity] = useState({
        id:'',
        title:'',
        category: '',
        description: '',
        date: '',
        city:'',
        venue:''
    });

    useEffect(()=> {
        if(id) loadactivity(id).then(activity => setActivity(activity!))
    },[id,loadactivity])

   
   

    function handleSubmit(){
        if (activity.id.length === 0){
            let newActivity = {
                ...activity,
                id:uuid()
            }
            createActivity(newActivity).then(()=> history.push(`/activites/${newActivity.id}`))
        } else {
            updateActivity(activity).then(() => history.push(`/activites/${activity.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }
    if (loadingInitial) return <LoadingComponent content="Loading app ..."/>
    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input placeholder='Date' type="date" value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={loading} floated="right" positive type='submit' content='Submit'/>
                <Button floated="right"  type='button' as={Link} to='/activites' content='Cancel' />
            </Form>
        </Segment>
    )
})
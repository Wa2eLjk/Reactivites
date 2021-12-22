import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props{
    activites: Activity[];
    selectActivity : (id : string) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean
}
export default function ActivityList({activites, selectActivity, deleteActivity, submitting}: Props){
    const [target,setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name)
        deleteActivity(id)
    }
    return(
        <Segment>
            <Item.Group divided>
                {activites.map(activites => (
                    <Item key={activites.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activites.title}</Item.Header>
                            <Item.Meta>{activites.date}</Item.Meta>
                            <Item.Description>
                                <div>{activites.description}</div>
                                <div>{activites.city},{activites.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated="right" content='View' color="blue" onClick={() => selectActivity(activites.id)}/>
                                <Button 
                                name={activites.id}
                                loading={submitting && target === activites.id}
                                floated="right" 
                                content='Delete' 
                                color="red" 
                                onClick={(e) => handleActivityDelete(e, activites.id)}
                                />
                                <Label basic content={activites.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}
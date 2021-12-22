import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props{
    activites: Activity[];
    selectActivity : (id : string) => void;
    deleteActivity: (id: string) => void;
}
export default function ActivityList({activites, selectActivity, deleteActivity}: Props){
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
                                <Button floated="right" content='Delete' color="red" onClick={() => deleteActivity(activites.id)}/>
                                <Label basic content={activites.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}
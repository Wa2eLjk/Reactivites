import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default observer(function ActivityList(){
    const {activityStore} = useStore()
    const {deleteactivity,activitesByDate,loading} = activityStore
    const [target,setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name)
        deleteactivity(id)
    }
    
    return(
        <Segment>
            <Item.Group divided>
                {activitesByDate.map(activites => (
                    <Item key={activites.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activites.title}</Item.Header>
                            <Item.Meta>{activites.date}</Item.Meta>
                            <Item.Description>
                                <div>{activites.description}</div>
                                <div>{activites.city},{activites.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated="right" content='View' color="blue" as={Link} to={`/activites/${activites.id}`}/>
                                <Button 
                                name={activites.id}
                                loading={loading && target === activites.id}
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
})
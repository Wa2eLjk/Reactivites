import React from "react";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";


export default function HomePage() {

    return(
        <Container style={{marginTop:'7em'}}>
            <h1>HomePage</h1>
            <h3>GO to <Link to='/activites'>Activites</Link></h3>
        </Container>
    )
}
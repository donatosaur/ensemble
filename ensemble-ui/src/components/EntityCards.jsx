import React from "react";
import { useHistory } from "react-router-dom";
import { CardGroup, Card, Button } from "react-bootstrap";
import entityDescriptions from "../data/entityDescriptions";



export default function EntityCards() {
  const history= useHistory();

  return (
      <CardGroup id="entityCardGroup">
        {entityDescriptions.map((entity, index) => {
          return (
            <Card key={index}>
              <Card.Header>
                <Card.Title> {Object.keys(entity)} </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text> {Object.values(entity)} </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button onClick={(e)=>{
                  e.preventDefault()
                  history.push(`/${Object.keys(entity)}`)}}>
                  {"Manage"}
                </Button>
              </Card.Footer>
            </Card>
          );
        }
       )}
      </CardGroup>
  );
}

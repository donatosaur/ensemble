import React from "react";
import { useHistory } from "react-router-dom";
import { CardGroup, Card, Button } from "react-bootstrap";
import entityDescriptions from '../data/_entityConfig.json'




export default function EntityCards() {
  const history= useHistory();

  return (
      <CardGroup id="entityCardGroup">
        {Object.keys(entityDescriptions.Entities).map((entity, index) => {
          return (
            <Card key={index}>
              <Card.Header>
                <Card.Title> {entity} </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text> {entityDescriptions.Entities[entity]} </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button onClick={(e)=>{
                  e.preventDefault()
                  history.push(`/${entity}`)}}>
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

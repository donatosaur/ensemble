import React from "react";
import { CardGroup, Card, Button } from "react-bootstrap";
import entityDescriptions from "../data/entityDescriptions";
import { useHistory } from "react-router";


export default function EntityCards() {

  const history= useHistory()
  return (
      <CardGroup id="entityCardGroup">
        {entityDescriptions.map((entity, _) => {
          return (
            <Card>
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

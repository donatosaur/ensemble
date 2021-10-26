import React from "react";
import { CardGroup, Card, Button } from "react-bootstrap";
import entityDescriptions from "../data/entityDescriptions";

export default function EntityCards() {
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
                <Button href={`/${Object.keys(entity)}`}>
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

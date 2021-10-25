import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import "../data/entities";
import entities from "../data/entities";

export default function EntityCards() {
  return (<>
      {entities.map((entity, id) => {
        return (
            <Col lg={4}>
            <Card>
              <Card.Body>
                <Card.Title>{Object.keys(entity)}</Card.Title>
                <Card.Text>{Object.values(entity)}</Card.Text>
                <Button>{"Manage " + Object.keys(entity)}</Button>
              </Card.Body>
            </Card>
            </Col>
        );
      })}
      </>
  );
}

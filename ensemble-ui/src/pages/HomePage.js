import React from "react";
import { Container, Row, CardGroup } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import EntityCards from "../components/EntityCards";

export default function HomePage() {
  return (
    <>
      <Container fluid>
        <Row>
          <NavigationBar />
        </Row>

        <Row>
          <h1>Ensemble</h1>
        </Row>

        <Row >
          <CardGroup>
            <EntityCards></EntityCards>
          </CardGroup>
        </Row>
      </Container>
    </>
  );
}

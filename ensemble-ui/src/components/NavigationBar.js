import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import entities from "../data/entities";

export default function NavigationBar() {
  return (
    <Navbar bg="light" style={{ position: "sticky" }} fixed="top" expand="lg">
      <Container>
        <Navbar.Brand href="/">Ensemble</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {entities.map((entity, index) => (
              <Nav.Link key={index} href={String(Object.keys(entity))}>
                {Object.keys(entity)}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

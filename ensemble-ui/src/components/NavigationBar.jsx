import React from "react";

import { Navbar, Nav } from "react-bootstrap";
import entityDescriptions from "../data/entityDescriptions";

export default function NavigationBar() {
  return (
    <Navbar class="navbar" bg="light" sticky="top" fixed="top" expand="lg">
      <Navbar.Brand href="/">Ensemble</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {entityDescriptions.map((entity, index) => (
            <Nav.Link key={index} href={String(Object.keys(entity))}>
              {Object.keys(entity)}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

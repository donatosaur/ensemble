import React from "react";

import { Navbar, Nav } from "react-bootstrap";
import { useHistory } from "react-router";
import entityDescriptions from '../data/_entityConfig.json'

export default function NavigationBar() {
  const history = useHistory()

  return (
    <Navbar className="navbar" bg="light" sticky="top" fixed="top" expand="lg">
      <Navbar.Brand onClick={(e)=>{
        e.preventDefault()
        history.push("/")
      }}>Ensemble</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {Object.keys(entityDescriptions.Entities).map((item, index) => {
            return(<Nav.Link key={index} href={String(item)}>
              {item}
            </Nav.Link>)

          })}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

import React from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import entityConfig from "../entityConfig.json";

export default function NavigationBar() {
  const history = useHistory()

  return (
    <Navbar className="navbar mb-2 text-start" bg="light" sticky="top" fixed="top" expand="xl">
      <Navbar.Brand >Ensemble</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link onClick={(event)=>{
            event.preventDefault();
            history.push("/");
          }}>
            Home
          </Nav.Link>

          { Object.keys(entityConfig).map((entity, index) => (
            <Nav.Link
              key={index}
              onClick={(event)=>{
                event.preventDefault();
                history.push(`/${entity}`);
              }}
              children={entity}
            />
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

import React from "react";
import {Form, Row, Col, Button, FloatingLabel} from "react-bootstrap";

export default function VenuesForm() {
  return ( 
    <Form>
    <Row className="entityForm">
      <Form.Group as={Col} controlId="venueID">
        <FloatingLabel controlId="venueID" label="Venue ID">
          <Form.Control type="text" placeholder="Enter Venue ID" />
        </FloatingLabel>
      </Form.Group>

      <Form.Group as={Col} controlId="capacity">
        <FloatingLabel controlId="capacity" label="Capacity">
          <Form.Control type="number" placeholder="Enter Venue Capacity" />
        </FloatingLabel>
      </Form.Group>
      
      <Form.Group as={Col} controlId="name">
        <FloatingLabel controlId="name" label="Venue Name">
          <Form.Control type="text" placeholder="Enter Venue Name" />
        </FloatingLabel>
      </Form.Group>
    </Row>

    <Row className="entityForm">
      <Form.Group as={Col} className="entityForm" controlId="street">
        <FloatingLabel controlId="street" label="Street Address">
          <Form.Control placeholder="1234 Main St" />
        </FloatingLabel>
      </Form.Group>
    </Row>

    <Row className="entityForm">
      <Form.Group as={Col} controlId="city">
        <FloatingLabel controlId="city" label="City">
          <Form.Control />
        </FloatingLabel>
      </Form.Group>

      <Form.Group as={Col} controlId="state">
        <FloatingLabel controlId="state" label="State">
          <Form.Select defaultValue="Choose...">
            <option>TX</option>
            <option>NY</option>
          </Form.Select>
        </FloatingLabel>
      </Form.Group>

      <Form.Group as={Col} controlId="zip">
        <FloatingLabel controlId="zip" label="Zip Code">
          <Form.Control />
        </FloatingLabel>
      </Form.Group>
    </Row>


    <Button className="formButton" variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  )}

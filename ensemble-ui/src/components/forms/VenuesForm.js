import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function VenuesForm() {
  return ( 
    <Form>
    <Row className="mb-3">
      <Form.Group as={Col} controlId="venueID">
        <Form.Label>Venue ID</Form.Label>
        <Form.Control type="text" placeholder="Enter Venue ID" />
      </Form.Group>

      <Form.Group as={Col} controlId="capacity">
        <Form.Label>Capacity</Form.Label>
        <Form.Control type="text" placeholder="Enter Venue Capacity" />
      </Form.Group>
      
    <Form.Group as={Col} controlId="name">
        <Form.Label>Venue Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Venue Name" />
      </Form.Group>

      

     
    </Row>

    
  <Row className="mb-3">
    <Form.Group as={Col} className="mb-3" controlId="street">
      <Form.Label>Address</Form.Label>
      <Form.Control placeholder="1234 Main St" />
    </Form.Group>
    

   </Row>

    <Row className="mb-3">
      <Form.Group as={Col} controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control />
      </Form.Group>

      <Form.Group as={Col} controlId="state">
        <Form.Label>State</Form.Label>
        <Form.Select defaultValue="Choose...">
          <option>TX</option>
          <option>NY</option>
        </Form.Select>
      </Form.Group>

      <Form.Group as={Col} controlId="zip">
        <Form.Label>Zip</Form.Label>
        <Form.Control />
      </Form.Group>
    </Row>

    

    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  )}

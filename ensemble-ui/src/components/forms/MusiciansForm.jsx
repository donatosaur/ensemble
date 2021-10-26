import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";


export default function MusiciansForm() {
  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="musicianID">
          <Form.Label>Musician ID</Form.Label>
          <Form.Control type="text" placeholder="Enter Musician ID" />
        </Form.Group>

        <Form.Group as={Col} controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Musician First Name" />
        </Form.Group>
        
      <Form.Group as={Col} controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Musician Last Name" />
        </Form.Group>

        <Form.Group as={Col} controlId="birthdate">
          <Form.Label>Birthdate</Form.Label>
          <Form.Control type="date" placeholder="Enter Musician DOB" />
        </Form.Group>

        <Form.Group as={Col} controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="Enter Musician Phone Number" />
        </Form.Group>

         
        <Form.Group as={Col} className="mt-4" id="inEnsemble">
        <Form.Check type="checkbox" label="In Ensemble?" />
        
      </Form.Group>
      <Form.Group as={Col} className="mt-4" id="active">
        <Form.Check type="checkbox" label="Active?" />
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
  );
}

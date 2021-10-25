import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";


export default function MusiciansForm() {
  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="concertID">
          <Form.Label>Concert ID</Form.Label>
          <Form.Control type="text" placeholder="Enter Concert ID" />
        </Form.Group>

        <Form.Group as={Col} controlId="concertTitle">
          <Form.Label>Concert Title</Form.Label>
          <Form.Control type="text" placeholder="Enter Concert Title" />
        </Form.Group>
        
     

        <Form.Group as={Col} controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control type="date" />
        </Form.Group>

        <Form.Group as={Col} controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control type="date" />
        </Form.Group>

       
      </Row>

      
    <Row className="mb-3">
    <Form.Group as={Col} controlId="conductorFirstName">
          <Form.Label>Conductor First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Conductor's First Name" />
        </Form.Group>

        <Form.Group as={Col} controlId="conductorLastName">
          <Form.Label>Conductor Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Conductor's Last Name" />
        </Form.Group>
      

     </Row>
     <Row className= "mb-3">

     <Form.Group as={Col} controlId="soloistFirstName">
          <Form.Label>Soloist First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Soloist's First Name" />
        </Form.Group>

        <Form.Group as={Col} controlId="soloistLastName">
          <Form.Label>Soloist Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Soloist's Last Name" />
        </Form.Group>

       

    </Row>
      

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import Datetime from 'react-datetime';

import "react-datetime/css/react-datetime.css";



export default function ServicesForm(){

    return(
        <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="serviceID">
            <Form.Label>Service ID</Form.Label>
            <Form.Control type="text" placeholder="Enter Service ID" />
          </Form.Group>
          
       
  
          <Form.Group as={Col} controlId="startTime">
            <Form.Label>Start Time</Form.Label>
            <Datetime dateFormat="YYYY-MM-DD" timeFormat={true} />
          </Form.Group>
  
          <Form.Group as={Col} controlId="endTime">
            <Form.Label>End Time</Form.Label>
            <Datetime dateFormat="YYYY-MM-DD" timeFormat={true} />
        </Form.Group>

        <Form.Group as={Col} className="mt-4" id="isRehearsal">
        <Form.Check type="checkbox" label="isRehearsal?" />
      </Form.Group>
  
         
        </Row>
  
        
      <Row className="mb-3">
      <Form.Group as={Col} controlId="venueID">
            <Form.Label>Venue ID</Form.Label>
            <Form.Control type="text" placeholder="Enter Venue ID" />
          </Form.Group>
  
          <Form.Group as={Col} controlId="concertID">
            <Form.Label>Concert ID</Form.Label>
            <Form.Control type="text" placeholder="Enter Concert ID" />
          </Form.Group>
        
  
       </Row>
      
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
}
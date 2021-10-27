import React from "react";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import Datetime from 'react-datetime';

import "react-datetime/css/react-datetime.css";



export default function ServicesForm(){

    return(
      <Form>
        <Row className="entityForm">
          <Form.Label>Add a Service</Form.Label>
        </Row>

        <Row className="entityForm">
        <Form.Group as={Col} controlId="venueID">
          <FloatingLabel controlId="venueID" label="Venue ID">
            <Form.Control type="text" placeholder="Enter Venue ID" />
          </FloatingLabel>
          </Form.Group>

          <Form.Group as={Col} controlId="concertID">
            <FloatingLabel controlId="concertID" label="Concert ID">
              <Form.Control type="text" placeholder="Enter Concert ID" />
            </FloatingLabel>
          </Form.Group>
        </Row>

        <Row className="entityForm">
          {/* <Form.Group as={Col} controlId="serviceID">
            <FloatingLabel controlId="serviceID" label="Service ID">
              <Form.Control type="text" placeholder="Enter Service ID" />
            </FloatingLabel>
          </Form.Group> */}

          <Form.Group as={Col} controlId="startTime">
            {/*<FloatingLabel controlId="startTime" label="Start Date/Time">*/}
            <Form.Label>Start Date/Time</Form.Label>
              <Datetime dateFormat="YYYY-MM-DD" timeFormat={true} />
            {/*</FloatingLabel>*/}
          </Form.Group>

          <Form.Group as={Col} controlId="endTime">
            {/*<FloatingLabel controlId="endTime" label="End Date/Time">*/}
            <Form.Label>End Date/Time</Form.Label>
              <Datetime dateFormat="YYYY-MM-DD" timeFormat={true} />
            {/*</FloatingLabel>*/}
        </Form.Group>

        <Col>
        <br/> {/* todo replace with css */}
        <Form.Group as={Col} className="entityFormCheckbox" id="isRehearsal">
          <Form.Check type="checkbox" label="Rehearsal?" />
        </Form.Group>
        </Col>
        </Row>
      
        <Button className="formButton" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
}
import React from "react";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";

export default function PiecesForm(){

    return(
        <Form>
          <Row className="entityForm">
            <Form.Label>Add a Piece</Form.Label>
          </Row>


        <Row className="entityForm">
          {/* <Form.Group as={Col} controlId="pieceID">
            <FloatingLabel controlId="pieceID" label="Piece ID">
              <Form.Control type="text" placeholder="Enter Piece ID" />
            </FloatingLabel>
          </Form.Group> */}
  
          <Form.Group as={Col} controlId="pieceTitle">
            <FloatingLabel controlId="pieceTitle" label="Piece Title">
              <Form.Control type="text" placeholder="Enter Piece Title" />
            </FloatingLabel>
          </Form.Group>
        </Row>
  
        
      <Row className="entityForm">
        <Form.Group as={Col} controlId="composerFirstName">
          <FloatingLabel controlId="composerFirstName" label="Composer First Name">
            <Form.Control type="text" placeholder="Enter Composer's First Name" />
          </FloatingLabel>
          </Form.Group>
  
          <Form.Group as={Col} controlId="composerLastName">
            <FloatingLabel controlId="composerLastName" label="Composer Last Name">
              <Form.Control type="text" placeholder="Enter Composer's Last Name" />
            </FloatingLabel>
          </Form.Group>
      </Row>


      <Row className= "entityForm">
        <Form.Group as={Col} controlId="arrangerFirstName">
          <FloatingLabel controlId="arrangerFirstName" label="Arranger First Name">
            <Form.Control type="text" placeholder="Enter Arranger's First Name" />
          </FloatingLabel>
        </Form.Group>
  
        <Form.Group as={Col} controlId="arrangeLastName">
          <FloatingLabel controlId="arrangeLastName" label="Arranger Last Name">
            <Form.Control type="text" placeholder="Enter Arranger's Last Name" />
          </FloatingLabel>
        </Form.Group>
      </Row>

      <Row className= "entityForm">
        <Form.Group as={Col} controlId="instrumentation">
          <FloatingLabel controlId="instrumentation" label="Instrumentation">
            <Form.Control as="textarea" type="text" placeholder="Instrumentation" />
          </FloatingLabel>
        </Form.Group>
      </Row>
        
  
        <Button className="formButton" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
}
import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function PiecesForm(){

    return(
        <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="pieceID">
            <Form.Label>Piece ID</Form.Label>
            <Form.Control type="text" placeholder="Enter Piece ID" />
          </Form.Group>
  
          <Form.Group as={Col} controlId="pieceTitle">
            <Form.Label>Piece Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Piece Title" />
          </Form.Group>
          
        </Row>
  
        
      <Row className="mb-3">
      <Form.Group as={Col} controlId="composerFirstName">
            <Form.Label>Composer First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Composer's First Name" />
          </Form.Group>
  
          <Form.Group as={Col} controlId="composerLastName">
            <Form.Label>Composer Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Composer's Last Name" />
          </Form.Group>
        
  
       </Row>
       <Row className= "mb-3">
  
       <Form.Group as={Col} controlId="arrangerFirstName">
            <Form.Label>Arranger First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Arranger's First Name" />
          </Form.Group>
  
          <Form.Group as={Col} controlId="soloistLastName">
            <Form.Label>Arranger Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Arranger's Last Name" />
          </Form.Group>

          <Form.Group as={Col} controlId="instrumentation">
            <Form.Label>Instrumentation</Form.Label>
            <Form.Control type="text" placeholder="Instrumentation" />
          </Form.Group>
  
         
  
      </Row>
        
  
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
}
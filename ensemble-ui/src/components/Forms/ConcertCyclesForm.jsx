import React, { useContext } from "react";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { EntityContext, EntityDispatchContext } from "../../hooks/EntityContextProvider";


/**
 *
 * @param showID {boolean} true to show a (disabled) ID field; false to hide it
 * @param onSubmit {function(): void} handler for button click
 * @param formLabel a short text description for the form
 * @param buttonLabel text to display on the form button
 * @returns {JSX.Element}
 * @constructor
 */
export default function ConcertCyclesForm({ showID, onSubmit, formLabel, buttonLabel }){
  // reducer hook to hold form data: see https://reactjs.org/docs/hooks-reference.html#usereducer
  const concertCycle = useContext(EntityContext);
  const dispatch = useContext(EntityDispatchContext);

  const handleOnChange = (event) => {
    // slot the new value into the state
    dispatch({[event.target.id]: event.target.value});
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(concertCycle));
  }

  return (
    <Form>
      <Row className="entityForm">
        <Form.Label children={formLabel} />
      </Row>

      { showID &&
      <Form.Group as={Col} controlId="concertID">
        <FloatingLabel controlId="concertID" label="Concert ID">
          <Form.Control
            disabled
            type="number"
            value={concertCycle['id']}
          />
        </FloatingLabel>
      </Form.Group>
      }

      <Row className="entityForm">
        <Form.Group as={Col} controlId="concertTitle">
          <FloatingLabel controlId="concertTitle" label="Concert Title">
            <Form.Control
              required
              type="text"
              placeholder="Enter Concert Title"
              value={concertCycle['concertTitle']}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} controlId="startDate">
          <FloatingLabel controlId="startDate" label="Start Date">
            <Form.Control
              required
              type="date"
              value={concertCycle['startDate']}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} controlId="endDate">
          <FloatingLabel controlId="endDate" label="End Date">
            <Form.Control
              required
              type="date"
              value={concertCycle['endDate']}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>
      </Row>

      <Row className="entityForm">
        <Form.Group as={Col} controlId="conductorFirstName">
          <FloatingLabel controlId="conductorFirstName" label="Conductor First Name">
            <Form.Control
              required
              type="text"
              placeholder="Enter Conductor's First Name"
              value={concertCycle['conductorFirstName']}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} controlId="conductorLastName">
          <FloatingLabel controlId="conductorLastName" label="Conductor Last Name">
            <Form.Control
              required
              type="text"
              placeholder="Enter Conductor's Last Name"
              value={concertCycle['conductorLastName']}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>
      </Row>

      <Row className="entityForm">
        <Form.Group as={Col} controlId="soloistFirstName">
          <FloatingLabel controlId="soloistFirstName" label="Soloist First Name">
            <Form.Control
              type="text"
              placeholder="Enter Soloist's First Name"
              value={concertCycle['soloistFirstName']}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} controlId="soloistLastName">
          <FloatingLabel controlId="soloistLastName" label="Soloist Last Name">
            <Form.Control
              type="text"
              placeholder="Enter Soloist's Last Name"
              value={concertCycle['soloistLastName']}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>
      </Row>

      <Button className="mt-3" variant="primary" type="submit" onClick={handleOnSubmit}>
        {buttonLabel || 'Submit'}
      </Button>
    </Form>
  );
}

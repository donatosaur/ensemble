import React, { useContext } from "react";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { EntityContext, EntityDispatchContext } from "../EntityContextProvider";


/**
 *
 * @param showID {boolean} true to show a (disabled) ID field; false to hide it
 * @param onSubmit {function(): void} handler for button click
 * @param formLabel a short text description for the form
 * @param buttonLabel text to display on the form button
 * @returns {JSX.Element}
 * @constructor
 */
export default function ServicesForm({ showID, onSubmit, formLabel, buttonLabel }){
  // reducer hook to hold form data: see https://reactjs.org/docs/hooks-reference.html#usereducer
  const service = useContext(EntityContext);
  const dispatch = useContext(EntityDispatchContext);

  const handleOnChange = (event) => {
    // slot the new value into the state
    dispatch({[event.target.id]: event.target.value});
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(service));
  }

  return(
    <Form>
      <Row className="entityForm">
        <Form.Label children={formLabel} />
      </Row>

        <Row className="entityForm">
        { showID &&
          <Form.Group as={Col} controlId="serviceID">
            <FloatingLabel controlId="serviceID" label="Service ID">
              <Form.Control
                disabled
                type="number"
                value={service['id']}
              />
            </FloatingLabel>
          </Form.Group>
        }

        <Form.Group as={Col} controlId="venueID">
          <FloatingLabel controlId="venueID" label="Venue ID">
            <Form.Control
              type="text"
              placeholder="Enter Venue ID"
              value={service['venueID']}
              onChange={handleOnChange}
            />
          </FloatingLabel>
          </Form.Group>

          <Form.Group as={Col} controlId="concertID">
            <FloatingLabel controlId="concertID" label="Concert ID">
              <Form.Control
                type="text"
                placeholder="Enter Concert ID"
                value={service['concertID']}
                onChange={handleOnChange}
              />
            </FloatingLabel>
          </Form.Group>
        </Row>

        <Row className="entityForm">
          <Form.Group as={Col} controlId="startTime">
            <FloatingLabel controlId="startTime" label="Start Date/Time">
            <Form.Control
              type="text"
              placeholder="Enter Start Time"
              value={service['startTime']}
              onChange={handleOnChange}
            />
            </FloatingLabel>
          </Form.Group>

          <Form.Group as={Col} controlId="endTime">
            <FloatingLabel controlId="endTime" label="End Date/Time">
              <Form.Control
                type="text"
                placeholder="Enter End Time"
                value={service['endTime']}
                onChange={handleOnChange}
              />
              {/*<Form.Label>End Date/Time</Form.Label>*/}
            {/*<Datetime*/}
              {/*  inputProps={{required:true}}*/}
              {/*  dateFormat="YYYY-MM-DD"*/}
              {/*  timeFormat={true}*/}
              {/*  value={service['endTime']}*/}
              {/*/>*/}
            </FloatingLabel>
        </Form.Group>

        <Col>
        <br/> {/* todo replace with css */}
        <Form.Group as={Col} className="entityFormCheckbox" id="isRehearsal">
          <Form.Check
            type="checkbox"
            label="Rehearsal?"
            value={service['isRehearsal']}
            onChange={handleOnChange}
          />
        </Form.Group>
        </Col>
        </Row>

        <Button className="formButton" variant="primary" type="submit" onClick={handleOnSubmit}>
          {buttonLabel || 'Submit'}
        </Button>
      </Form>
    )
}

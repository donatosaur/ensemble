import React, { useContext } from "react";
import { EntityContext, EntityDispatchContext } from "../../hooks/EntityContextProvider";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import {useEntity} from "../../hooks/useEntity";
import {useHistory} from "react-router-dom";

/**
 * Creates a form for create and update operations
 *
 * @param mode {"create"}
 * @param formLabel a short text description for the form
 * @param buttonLabel text to display on the form button
 * @returns {JSX.Element}
 * @constructor
 */
export default function MusiciansInstrumentsForm({ mode, formLabel, buttonLabel }){
  // reducer hook to hold form data: see https://reactjs.org/docs/hooks-reference.html#usereducer
  const musiciansInstruments = useContext(EntityContext);
  const dispatch = useContext(EntityDispatchContext);

  const { createEntity } = useEntity();
  const history = useHistory();

  const handleOnSubmit = (event) => {
    event.preventDefault();

    void async function submitForm(){
      if (mode === "create") {
        try {
          const response = await createEntity(musiciansInstruments);
          console.log(response);
          // refresh the page; history[0] is the current path
          history.go(0);
        } catch (error) {
          alert(error['sqlMessage']);
        }
      }
    }();
  }

  const handleOnChange = (event) => {
    // slot the new value into the state
    dispatch({[event.target.id]: event.target.value});
  }
  return (
    <Form>
      <Row className="entityForm">
        <Form.Label children={formLabel} />
      </Row>

      <Row className="entityForm">
        <Form.Group as={Col} controlId="musicianID">
          <FloatingLabel controlId="musicianID" label="Musician ID">
            <Form.Control
              required
              type="number"
              placeholder="Enter Musician ID"
              value={musiciansInstruments['musicianID']}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} controlId="instrumentID">
          <FloatingLabel controlId="instrumentID" label="Instrument ID">
            <Form.Control
              required
              type="number"
              placeholder="Enter Instrument ID"
              value={musiciansInstruments['instrumentID']}
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

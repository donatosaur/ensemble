import React, { useReducer } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import { SelectField } from './FormComponents/Fields';
import { MusicianOptions, InstrumentOptions } from './FormComponents/SelectOptions';
import { entityFormReducer, entityFormInitializer } from "../../utils/reducers";
import { useEntity } from "../../hooks/useEntity";
import { useHistory } from "react-router-dom";

/**
 * Generates a form for CREATE operations.
 *
 * @param initialFormValues initial values to pass to entityFormReducer (see useEntity.js)
 * @returns {JSX.Element}
 */
export default function MusiciansInstrumentsForm({ initialFormValues }){
  // get API calls from context hook and create reducer; dispatch signature is {field, value, isInvalid, modified}
  const { createEntity } = useEntity();
  const [entity, dispatch] = useReducer(entityFormReducer, initialFormValues, entityFormInitializer);
  const history = useHistory();

  // define validation regex checks
  const validation = {};

  // construct default props for each input field; these will be the same for each entity
  const defaultProps = {
    onBlur: (event) => dispatch({
      field: event.target.name,
      // isInvalid: !validation[event.target.name]?.test(`${event.target.value}`),
      modified: true
    }),
    onChange: (event) => dispatch({
      field: event.target.name,
      // if onBlur fired at least once AND there's a validation check AND the validation check fails
      // isInvalid: entity[event.target.name].modified && !validation[event.target.name]?.test(`${event.target.value}`),
      value: event.target.value
    })
  }

  // override default form submit behavior
  const handleOnSubmit = (event) => {
    event.preventDefault();
    void async function submitForm(){
      try {
        const response = await createEntity(entity);
        console.log(response);
        history.go(0);  // refresh the page; history[0] is the current path
      } catch (error) {
        alert(error?.sqlMessage);
      }
    }();
  }

  return (
    <Form noValidate className="entityForm">
      <Row>
        <Col className="mb-3">
          <SelectField
            name="musicianID"
            label="Musician"
            value={entity.musicianID.value}
            isInvalid={entity.musicianID.isInvalid}
            errorText="Please select a musician."
            {...defaultProps}
          >
            <MusicianOptions />
          </SelectField>
        </Col>
        <Col className="mb-3">
          <SelectField
            name="instrumentID"
            label="Instrument"
            value={entity.instrumentID.value}
            isInvalid={entity.instrumentID.isInvalid}
            errorText="Please select an instrument."
            {...defaultProps}
          >
            <InstrumentOptions />
          </SelectField>
        </Col>
      </Row>

      <Button className="m-1" variant="primary" type="submit" onClick={handleOnSubmit}>
        Submit
      </Button>
    </Form>
  );
}

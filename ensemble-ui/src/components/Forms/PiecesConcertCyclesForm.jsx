import React, { useEffect, useReducer, useState } from 'react';
import { Col, Row, Form, Alert } from "react-bootstrap";
import { SelectField } from './FormComponents/Fields';
import { entityFormReducer, entityFormInitializer } from "../../utils/reducers";
import { useGetConcertOptions, useGetPieceOptions } from '../../hooks/useGetOptions';
import { useEntity } from "../../hooks/useEntity";
import { useHistory } from "react-router-dom";
import SpinnerButton from './FormComponents/SpinnerButton';


/**
 * Generates a form for CREATE operations.
 *
 * @param initialFormValues initial values to pass to entityFormReducer (see useEntity.js)
 * @returns {JSX.Element}
 */
export default function PiecesConcertCyclesForm({ initialFormValues }){
  // get API calls from context hook and create reducer; dispatch signature is {field, value, isInvalid, modified}
  const { createEntity } = useEntity();
  const [entity, dispatch] = useReducer(entityFormReducer, initialFormValues, entityFormInitializer);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [formAlert, setFormAlert] = useState(null);
  const { pieceOptions, error: pieceError } = useGetPieceOptions();
  const { concertOptions, error: concertError } = useGetConcertOptions();

  // if fetching musicians or concerts failed, let the user know
  useEffect(() => {
    if (!!pieceError || !!concertError) {
      setFormAlert(pieceError ?? concertError);
    }
  }, [pieceError, concertError]);

  // define validation regex checks
  // const validation = {};

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
    setLoading(true);  // set the submit button to its "loading" state to prevent multiple identical requests

    void async function submitForm(){
      let validated = true;
      const request = {};
  
      try {
        // map fields and check whether any value is marked as invalid before submitting      
        Object.entries(entity).forEach(([field, fieldObject]) => {
          if (fieldObject.isInvalid) { 
            validated = false; 
          }
          request[field] = fieldObject.value;
        })  

        // check whether the form is in a valid state
        if (validated) {
          const response = await createEntity(request);
          console.log(response);
          history.go(0); // refresh the page; history[0] represents the current path
        } else {
          // let the user know something went wrong
          setFormAlert('At least one input field is invalid; please check the instructions under each field.');
        }
      } catch (error) {
        // rejected promises should already be parsed; if the backend send back an error message from
        // the sql database, we can display that error here, otherwise we should display whatever other
        // error message the backend sends instead
        setFormAlert(error?.sqlMessage ?? error);
      }
    }();
    setLoading(false);  // no matter what, we should return the button to its "not loading" state
  }

  return (
    <Form noValidate className="entityForm">
      { formAlert &&
        <Alert 
          key="formAlert" 
          variant="danger"
          onClose={() => setFormAlert(null)}
          children={formAlert}
          dismissible
        />
      }

      <Row>
        <Col className="mb-3">
          <SelectField
            disabled={pieceOptions === null}
            name="pieceID"
            label="Piece"
            value={entity.pieceID.value}
            isInvalid={entity.pieceID.isInvalid}
            errorText="Please select a Piece."
            {...defaultProps}
          >
            { pieceOptions ?? <option>Loading...</option> }
          </SelectField>
        </Col>
        <Col className="mb-3">
          <SelectField
            disabled={concertOptions === null}
            name="concertID"
            label="Concert Cycle"
            value={entity.concertID.value}
            isInvalid={entity.concertID.isInvalid}
            errorText="Please select a Concert Cycle."
            {...defaultProps}
          >
            { concertOptions ??  <option>Loading...</option> }
          </SelectField>
        </Col>
      </Row>

      <SpinnerButton loading={loading} className="mt-4" variant="primary" onClick={handleOnSubmit} />
    </Form>
  );
}

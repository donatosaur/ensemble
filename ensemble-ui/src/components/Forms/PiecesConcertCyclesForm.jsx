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
 * @param {Object} props
 * @param {Object} props.initialFormValues initial values to pass to entityFormReducer (see useEntity.js)
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

  // define validation checks
  const validate = new Map([
    ['pieceID', /./],       // required
    ['concertID', /./],     // required
  ]);

  /**
   * Returns true only if *all* the following hold:
   *   - the field was modified at least once AND
   *   - there is a **valid** regex check defined on the field (this is why we null coalesce to false) AND
   *   - the regex check fails (because the regex is defined on valid states)
   * @returns {boolean} true if the input is invalid
   */
  const setIsInvalid = (field, value) => validate.has(field) && (!validate.get(field)?.test(`${value}`) ?? false);

  /**
   * Construct default props for each entity (these are event handlers that will be identical for all fields).
   * Since this may be a bit difficult to follow:
   *  - `event.target.name` should match the field's name since `name` is a required attribute on our elements
   *  - `event.target.value` will hold the value of each input element, since these are all controlled components
   *  - `modified` is set if the input element was entered at least once (i.e., if onBlur has fired on it)
   */
  const defaultProps = {
    onBlur: (event) => dispatch({
      field: event.target.name,
      isInvalid: setIsInvalid(event.target.name, event.target.value),
      modified: true
    }),
    onChange: (event) => dispatch({
      field: event.target.name,
      value: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      isInvalid: entity[event.target.name].modified  && setIsInvalid(event.target.name, event.target.value)
    })
  }



  // override default form submit behavior
  const handleOnSubmit = (event) => {
    event.preventDefault();
    setLoading(true);  // set the submit button to its "loading" state to prevent multiple identical requests

    // validate input and construct the request object (this way we only iterate over entity at most once)
    let validated = true;
    const request = {};
    Object.entries(entity).forEach(([field, fieldObject]) => {
      // map to request object so that it contains field-value pairs
      request[field] = fieldObject.value;

      // check validation state
      const fieldIsInvalid = setIsInvalid(field, fieldObject.value);
      if (fieldIsInvalid) {
        dispatch({ field: field, isInvalid: fieldIsInvalid });
        validated = false;
      }
    });

    // if the input was invalid, let the user know; otherwise immediately submit the request
    if (!validated) {
      setFormAlert('At least one input field is invalid. Please check the instructions under each field.');
    } else {
      void async function submitForm(){
        try {
          const response = await createEntity(request)
          console.log(response);
          history.go(0);  // refresh the page; history[0] represents the current path
        } catch (error) {
          // rejected promises should already be parsed: if the backend send back an error message from
          // the sql database, we can display that error here, otherwise we should display whatever other
          // error message the backend sends instead
          setFormAlert(error?.sqlMessage ?? error);
        }
      }();
    }
    setLoading(false);  // no matter what, we should return the button to its "not loading" state
  }

  return (
    <Form noValidate className="entityForm" onSubmit={handleOnSubmit}>
      { formAlert &&
        <Alert 
          key="formAlert" 
          variant="danger"
          onClose={() => setFormAlert(null)}
          children={formAlert}
          dismissible
        />
      }

      <Row xs={1} md={2}>
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

      <SpinnerButton loading={loading} className="mt-4" variant="primary" type="submit" />
    </Form>
  );
}

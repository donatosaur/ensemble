import React, { useReducer, useState, useEffect } from 'react';
import { Col, Row, Form, Alert } from "react-bootstrap";
import { CheckboxField, InputField, SelectField } from './FormComponents/Fields';
import { useEntity } from "../../hooks/useEntity";
import { useHistory } from "react-router-dom";
import { entityFormInitializer, entityFormReducer } from '../../utils/reducers';
import { useGetConcertOptions, useGetVenueOptions } from '../../hooks/useGetOptions';
import SpinnerButton from './FormComponents/SpinnerButton';


/**
 * Generates a form for CREATE and UPDATE operations with fields pre-populated with initialFormValues.
 *
 * @param {Object} props
 * @param {Object} props.initialFormValues initial values to pass to entityFormReducer (see useEntity.js)
 * @param {"create" | "update"} props.mode
 * @returns {JSX.Element}
 */
export default function ServicesForm({ initialFormValues, mode }){
  // get API calls from context hook and create reducer; dispatch signature is {field, value, isInvalid, modified}
  const { createEntity, updateEntity } = useEntity();
  const [entity, dispatch] = useReducer(entityFormReducer, initialFormValues, entityFormInitializer);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [formAlert, setFormAlert] = useState(null);
  const { venueOptions, error: venueError } = useGetVenueOptions();
  const { concertOptions, error: concertError } = useGetConcertOptions();

  // if fetching venues or concerts failed, let the user know
  useEffect(() => {
    if (!!venueError || !!concertError) {
      setFormAlert(venueError ?? concertError);
    }
  }, [venueError, concertError]);

  // define validation checks
  const validate = new Map([
    ['startTime', /./],           // required; the input field will handle formatting
    ['endTime', /./],             // required
    ['concertID', /./],           // required
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
    } else if (mode === 'create' || mode === 'update') {
      void async function submitForm(){
        try {
          const response = mode === 'create' ? await createEntity(request) : await updateEntity(request);
          console.log(response);
          history.go(0);  // refresh the page; history[0] represents the current path
        } catch (error) {
          // rejected promises for call API are guaranteed to be strings
          setFormAlert(`${error}`);
        }
      }();
    }
    setLoading(false);  // no matter what, we should return the button to its "not loading" state
  }


  return(
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

      <Row>
        { mode === "update" &&
          <Col className="mb-3" xs={12} lg={2}>
            <InputField
              disabled
              name="id"
              label="ID"
              value={entity.id.value}
              isInvalid={entity.id.isInvalid}
              {...defaultProps}
            />
          </Col>
        }

        <Col className="mb-3" lg={5}>
          <InputField
            name="startTime"
            label="Start Date/Time"
            type="datetime-local"
            value={entity.startTime.value}
            isInvalid={entity.startTime.isInvalid}
            errorText="Please enter a start date and time."
            {...defaultProps}
          />
        </Col>
        <Col className="mb-3" lg={5}>
          <InputField
            name="endTime"
            label="End Date/Time"
            type="datetime-local"
            value={entity.endTime.value}
            isInvalid={entity.endTime.isInvalid}
            errorText="Please enter an end date and time."
            {...defaultProps}
          />
        </Col>
      </Row>

      <Row xs={1} lg={3}>
        <Col className="mb-3">
          <SelectField
            disabled={venueOptions === null}
            name="venueID"
            label="Venue"
            value={entity.venueID.value}
            isInvalid={entity.venueID.isInvalid}
            {...defaultProps}
          >
            {venueOptions ?? <option>Loading...</option> }
          </SelectField>
          {/* make it clear that selecting NULL by default is intended  */}
          <small className="text-muted small-caps">This relationship is nullable.</small>
        </Col>
        <Col className="mb-3">
          <SelectField
            disabled={concertOptions === null}
            name="concertID"
            label="ConcertCycle"
            value={entity.concertID.value}
            isInvalid={entity.concertID.isInvalid}
            errorText="Please select a Concert Cycle."
            {...defaultProps}
          >
            { concertOptions ?? <option>Loading...</option> }
          </SelectField>
        </Col>
      <Col className="mb-3 mt-lg-3">
        <CheckboxField
          inline
          name="isRehearsal"
          label="Rehearsal?"
          checked={entity.isRehearsal.value}
          isInvalid={entity.isRehearsal.isInvalid}
          {...defaultProps}
        />
      </Col>
    </Row>

    <SpinnerButton loading={loading} className="mt-4" variant="primary" type="submit" />
    </Form>
  )
}

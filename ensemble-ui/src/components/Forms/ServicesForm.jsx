import React, { useReducer } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import { CheckboxField, InputField, SelectField } from './FormComponents/Fields';
import { VenueOptions, ConcertCycleOptions } from './FormComponents/SelectOptions';
import { useEntity } from "../../hooks/useEntity";
import { useHistory } from "react-router-dom";
import { entityFormInitializer, entityFormReducer } from '../../utils/reducers';


/**
 * Generates a form for CREATE and UPDATE operations with fields pre-populated with initialFormValues.
 *
 * @param {object} initialFormValues initial values to pass to entityFormReducer (see useEntity.js)
 * @param {"create" | "update"} mode
 * @returns {JSX.Element}
 */
export default function ServicesForm({ initialFormValues, mode }){
  // get API calls from context hook and create reducer; dispatch signature is {field, value, isInvalid, modified}
  const { createEntity, updateEntity } = useEntity();
  const [entity, dispatch] = useReducer(entityFormReducer, initialFormValues, entityFormInitializer);
  const history = useHistory();

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
      value: event.target.type === 'checkbox' ? event.target.checked : event.target.value
    })
  }

  // override default form submit behavior
  const handleOnSubmit = (event) => {
    event.preventDefault();

    void async function submitForm(){
      if (mode === "create" || mode ==="update") {
        try {
          const response = mode === "create" ? await createEntity(entity) : await updateEntity(entity);
          console.log(response);
          history.go(0);  // refresh the page; history[0] is the current path
        } catch (error) {
          alert(error?.sqlMessage);
        }
      }
    }();
  }


  return(
    <Form noValidate className="entityForm">
      <Row>
        { mode === "update" &&
          <Col className="mb-3" xs="2">
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

        <Col className="mb-3">
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
        <Col className="mb-3">
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

      <Row>
        <Col className="mb-3">
          <SelectField
            name="venueID"
            label="Venue"
            value={entity.venueID.value}
            isInvalid={entity.venueID.isInvalid}
            {...defaultProps}
          >
            <VenueOptions />
          </SelectField>
          {/* make it clear that selecting NULL by default is intended  */}
          <small className="text-muted small-caps">This relationship is nullable.</small>
        </Col>
        <Col className="mb-3">
          <SelectField
            name="concertID"
            label="ConcertCycle"
            value={entity.concertID.value}
            isInvalid={entity.concertID.isInvalid}
            errorText="Please select a Concert Cycle."
            {...defaultProps}
          >
            <ConcertCycleOptions />
          </SelectField>
        </Col>
      <Col>
        <CheckboxField
          inline
          name="isRehearsal"
          label="Rehearsal?"
          value={entity.isRehearsal.value}
          isInvalid={entity.isRehearsal.isInvalid}
          {...defaultProps}
        />
      </Col>
    </Row>

      <Button className="mt-3" variant="primary" type="submit" onClick={handleOnSubmit}>
        { mode === 'create' ? 'Submit' : 'Commit'}
      </Button>
    </Form>
  )
}

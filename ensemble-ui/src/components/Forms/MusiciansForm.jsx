import { useReducer, useState } from "react";
import {
  Col,
  Row,
  Form,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { InputField, CheckboxField } from "./FormComponents/Fields";
import { entityFormReducer, entityFormInitializer } from "../../utils/reducers";
import { useEntity } from "../../hooks/useEntity";
import SpinnerButton from "./FormComponents/SpinnerButton";
import { generateSetIsInvalid, generateDefaultProps } from "./helpers";

/**
 * Generates a form for CREATE and UPDATE operations with fields pre-populated with initialFormValues.
 *
 * @param {Object} props
 * @param {Object} props.initialFormValues initial values to pass to entityFormReducer (see useentity?.js)
 * @param {"create" | "update"} props.mode
 * @returns {JSX.Element}
 */
export default function MusiciansForm({ initialFormValues, mode }) {
  // get API calls from context hook and create reducer; dispatch signature is {field, value, isInvalid, modified}
  const { createEntity, updateEntity } = useEntity();
  const [entity, dispatch] = useReducer(entityFormReducer, initialFormValues, entityFormInitializer);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formAlert, setFormAlert] = useState(null);

  // define validation checks
  const validate = new Map([
    ["birthdate", /./],                 // required; the input field will handle formatting
    ["firstName", /./],                 // required
    ["lastName", /./],                  // required
    ["street", /./],                    // required
    ["city", /./],                      // required
    ["state", /./],                     // required
    ["phoneNumber", /(^\d{10}$)|(^$)/], // either empty or exactly ten digits
    ["zip", /^\d{5}$/],                 // exactly five digits
  ]);
  const setIsInvalid = generateSetIsInvalid(validate);
  const defaultProps = generateDefaultProps(entity, setIsInvalid, dispatch);

  // override default form submit behavior
  const handleOnSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // set the submit button to its "loading" state to prevent multiple identical requests

    // validate input and construct the request object (this way we only iterate over entity at most once)
    let validated = true;
    const request = {};
    Object.entries(entity).forEach(([field, fieldObject]) => {
      // map to request object so that it contains field-value pairs
      request[field] = fieldObject.value;

      // check validation state
      const fieldIsInvalid = setIsInvalid(field, fieldObject.value);
      if (fieldIsInvalid) {
        dispatch({ field, isInvalid: fieldIsInvalid });
        validated = false;
      }
    });

    // // debug mode
    //   const validValues = {};
    //   const invalidValues = {};
    //   for (const [field, obj] of Object.entries(entity)) {
    //     obj.isInvalid ? invalidValues[field] = obj.value: validValues[field] = obj.value;
    //   }
    //   alert(`Valid:\n${JSON.stringify(validValues, null, " ")}\n\n` +
    //         `Invalid:"\n${JSON.stringify(invalidValues, null, " ")}`);
    //   setLoading(false);
    //   return;

    // if the input was invalid, let the user know; otherwise immediately submit the request
    if (!validated) {
      setFormAlert("At least one input field is invalid. Please check the instructions under each field.");
    } else if (mode === "create" || mode === "update") {
      void (async function submitForm() {
        try {
          const response = mode === "create" ? await createEntity(request) : await updateEntity(request);
          console.log(response);
          navigate();  // refresh the page; history[0] represents the current path
        } catch (error) {
          // rejected promises for call API are guaranteed to be strings
          setFormAlert(`${error}`);
        }
      }());
    }
    setLoading(false);  // no matter what, we should return the button to its "not loading" state
  };

  return initialFormValues && (
    <Form noValidate className="entityForm" onSubmit={handleOnSubmit}>
      { formAlert && (
        <Alert
          key="formAlert"
          variant="danger"
          onClose={() => setFormAlert(null)}
          dismissible
        >
          { formAlert }
        </Alert>
      )}

      <Row>
        { mode === "update" && (
          <Col className="mb-3">
            <InputField
              disabled
              name="id"
              label="ID"
              value={entity?.id.value}
              isInvalid={entity?.id.isInvalid}
              {...defaultProps}
            />
          </Col>
        )}

        <Col className="mb-3">
          <InputField
            name="birthdate"
            type="date"
            label="Birthdate"
            value={entity?.birthdate.value}
            isInvalid={entity?.birthdate.isInvalid}
            errorText="Please enter a birthdate."
            {...defaultProps}
          />
        </Col>
      </Row>

      <Row xs={1} lg={2}>
        <Col className="mb-3">
          <InputField
            name="firstName"
            label="First Name"
            value={entity?.firstName.value}
            isInvalid={entity?.firstName.isInvalid}
            errorText="Please enter a first name."
            {...defaultProps}
          />
        </Col>
        <Col className="mb-3">
          <InputField
            name="lastName"
            label="Last Name"
            value={entity?.lastName.value}
            isInvalid={entity?.lastName.isInvalid}
            errorText="Please enter a last name."
            {...defaultProps}
          />
        </Col>
      </Row>

      <Row xs={1}>
        <Col className="mb-3" lg={5}>
          <InputField
            name="email"
            type="email"
            label="Email"
            value={entity?.email.value}
            isInvalid={entity?.email.isInvalid}
            maxLength={100}
            {...defaultProps}
          />
        </Col>
        <Col className="mb-3" lg={4}>
          <InputField
            name="phoneNumber"
            label="Phone"
            type="tel"
            value={entity?.phoneNumber.value}
            isInvalid={entity?.phoneNumber.isInvalid}
            errorText="Please either leave blank or enter exactly 10 digits."
            maxLength={10}
            {...defaultProps}
          />
          {/* make it clear that selecting NULL by default is intended  */}
          <small className="text-muted small-caps">Do not enter parentheses or dashes.</small>
        </Col>

        <Col className="mb-3" lg={3}>
          <CheckboxField
            inline
            name="inEnsemble"
            label="In Ensemble?"
            checked={entity?.inEnsemble.value}
            isInvalid={entity?.inEnsemble.isInvalid}
            {...defaultProps}
          />
          <CheckboxField
            inline
            className="ms-5 ms-lg-0"
            name="active"
            label="Active?"
            checked={entity?.active.value}
            isInvalid={entity?.active.isInvalid}
            {...defaultProps}
          />
        </Col>
      </Row>

      <Row>
        <Col className="mb-3">
          <InputField
            name="street"
            type="street"
            label="Street Address"
            value={entity?.street.value}
            isInvalid={entity?.street.isInvalid}
            errorText="Please enter a street address."
            maxLength={100}
            {...defaultProps}
          />
        </Col>
      </Row>

      <Row xs={1}>
        <Col className="mb-3" lg={7}>
          <InputField
            name="city"
            label="City"
            value={entity?.city.value}
            isInvalid={entity?.city.isInvalid}
            errorText="Please enter a city."
            maxLength={50}
            {...defaultProps}
          />
        </Col>
        <Col className="mb-3" xs={4} lg={2}>
          <InputField
            name="state"
            label="State"
            value={entity?.state.value}
            isInvalid={entity?.state.isInvalid}
            errorText="Please enter a state."
            maxLength={2}
            {...defaultProps}
          />
        </Col>
        <Col className="mb-3" xs={8} lg={3}>
          <InputField
            name="zip"
            label="Zip Code"
            type="tel"
            value={entity?.zip.value}
            isInvalid={entity?.zip.isInvalid}
            errorText="Please enter exactly 5 digits."
            maxLength={5}
            {...defaultProps}
          />
        </Col>
      </Row>

      <SpinnerButton loading={loading} className="mt-4" variant="primary" type="submit" />
    </Form>
  );
}

import React from "react";
import {Col, InputGroup, FloatingLabel, Form, Row} from "react-bootstrap";

/**
 * Creates a 2-row block of form input elements to record a full street address.
 *
 * @param showHelpText true to display help text tooltips under each field
 * @param handleOnChange reducer function to record changes to input
 * @param streetValue state hook for the street address field
 * @param cityValue state hook for the city field
 * @param stateValue state hook for the state field
 * @param zipValue state hook for the zip field
 * @returns {JSX.Element}
 * @constructor
 */
export default function AddressInput({
  showHelpText,
  handleOnChange,
  streetValue,
  cityValue,
  stateValue,
  zipValue
}){

  return (
    <React.Fragment key="addressBlock">

      {/* Street Address */}
      <Row className="mb-3">

        <Form.Group controlId="street">
          <InputGroup hasValidation>
            <FloatingLabel as={Col} controlId="street" label="Street Address">
              <Form.Control
                required
                name="street"
                placeholder="1 Main Street"
                value={streetValue}
                onChange={handleOnChange}
                // isInvalid={streetValue === ''}
              />
              { showHelpText &&
              <Form.Text muted>
                Enter up to 100 characters.
              </Form.Text>
              }
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
            </FloatingLabel>
          </InputGroup>
        </Form.Group>

      </Row>

      {/* City, State, Zip */}
      <Row className="mb-3">
        <Form.Group as={Col} md="8" controlId="city">
          <InputGroup hasValidation>
          <FloatingLabel as={Col} controlId="city" label="City">
            <Form.Control
              required
              name="city"
              placeholder="Chicago"
              value={cityValue}
              onChange={handleOnChange}
              // isInvalid={cityValue === ''}
            />
          { showHelpText &&
            <Form.Text muted>
              Enter up to 50 characters.
            </Form.Text>
          }
          <Form.Control.Feedback type="invalid">
            Please enter a city.
          </Form.Control.Feedback>
          </FloatingLabel>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} md="2" controlId="state">
          <InputGroup hasValidation>
            <FloatingLabel as={Col} controlId="state" label="State">
              <Form.Control
                required
                maxLength={2}
                name="state"
                placeholder="IL"
                value={stateValue}
                onChange={handleOnChange}
                // isInvalid={stateValue === ''}
              />
            <Form.Control.Feedback type="invalid">
              Please enter a state.
            </Form.Control.Feedback>
            { showHelpText &&
              <Form.Text muted>
                Enter a 2-letter abbreviation
              </Form.Text>
            }
            </FloatingLabel>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} md="2" controlId="zip">
          <InputGroup hasValidation>
            <FloatingLabel as={Col} controlId="zip" label="Zip">
              <Form.Control
                required
                maxLength={5}
                name="zip"
                placeholder="98765"
                value={zipValue}
                onChange={handleOnChange}
                // isInvalid={!`${zipValue}`.match(/^\d{5}$/)} // exactly 5 digits
              />
              { showHelpText &&
                <Form.Text muted>
                  Enter a 5-digit zip code.
                </Form.Text>
              }
            <Form.Control.Feedback type="invalid">
              Please enter exactly 5 digits.
            </Form.Control.Feedback>
            </FloatingLabel>
          </InputGroup>
        </Form.Group>

      </Row>

    </React.Fragment>
  );
}

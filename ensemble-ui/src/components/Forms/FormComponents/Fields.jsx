import React from "react";
import { Form, FloatingLabel } from "react-bootstrap";


/**
 * Creates a react-bootstrap input form group
 *
 * @param {Object} props
 * @param {string} props.name a unique field name
 * @param {string} props.label a floating label
 * @param {string} [props.errorText] error text to display on isInvalid
 * @param props.props any other props to pass to Form.Control
 * @returns {JSX.Element}
 */
export function InputField({name, label, errorText, ...props}){
  const {placeholder, ...formControlProps} = props;
  return (
    <Form.Group controlId={name}>
      <FloatingLabel controlId={name} label={label ?? name}>
        <Form.Control
          name={name}
          placeholder={placeholder ?? label ?? name}
          {...formControlProps}
        />
        { errorText && <Form.Control.Feedback tooltip type="invalid" children={errorText} />
        }
      </FloatingLabel>
    </Form.Group>
  );
}


/**
 * Creates a react-bootstrap checkbox form group
 *
 * @param {Object} props
 * @param {string} props.name a unique field name
 * @param {string} props.label a floating label
 * @param {string} [props.errorText] error text to display on isInvalid
 * @param props.props any other props to pass to Form.Control
 * @returns {JSX.Element}
 */
export function CheckboxField({name, label, errorText, ...props}){
  return (
    <Form.Group className="float-start" controlId={name}>
      <Form.Check name={name} {...props} />
      <Form.Label>{label ?? name}</Form.Label>
      { errorText && <Form.Control.Feedback tooltip type="invalid" children={errorText} /> }
    </Form.Group>
  );
}


/**
 * Creates a react-bootstrap select form group
 *
 * @param {Object} props
 * @param {string} props.name a unique field name
 * @param {string} props.label a floating label
 * @param {string} [props.errorText] error text to display on isInvalid
 * @param props.props any other props to pass to Form.Control
 * @returns {JSX.Element}
 */
export function SelectField({name, label, errorText, ...props}){
  return (
    <Form.Group controlId={name}>
      <FloatingLabel controlId={name} label={label ?? name}>
        <Form.Select name={name} {...props}/>
        { errorText && <Form.Control.Feedback tooltip type="invalid" children={errorText} />}
      </FloatingLabel>
    </Form.Group>
  );
}


/**
 * Creates a react-bootstrap select form group
 *
 * @param {Object} props
 * @param {string} props.name a unique field name
 * @param {string} props.label a floating label
 * @param {string} [props.errorText] error text to display on isInvalid
 * @param props.props any other props to pass to Form.Control
 * @returns {JSX.Element}
 */
export function TextAreaField({name, label, errorText, ...props}){
  const {placeholder, ...formControlProps} = props;
  return (
    <Form.Group controlId={name}>
      <FloatingLabel controlId={name} label={label ?? name}>
        <Form.Control
          name={name}
          as="textarea"
          placeholder={placeholder ?? label ?? name}
          {...formControlProps}
        />
        { errorText && <Form.Control.Feedback type="invalid" children={errorText} />}
      </FloatingLabel>
    </Form.Group>
  );
}

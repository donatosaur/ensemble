import React from "react";
import { Modal } from 'react-bootstrap';

/**
 * Creates a modal intended to house a form. Only a close button is included, and should be passed
 * a boolean state.
 *
 * Generates a confirmation dialog box (modal) that requires the user to select an action.
 *
 * @param show {boolean} a state hook that toggles the display state of the dialog
 * @param title {string} a title for the form
 * @param form {JSX.Element}
 * @param cancelButtonText {string} text to display on the cancel button
 * @param handleCancel function that handles close or cancel button presses
 * @returns {JSX.Element}

 */
export default function FormModal({
  show,
  title,
  form,
  handleCancel,
}) {
  return (
    <Modal
      centered
      keyboard={false}       // prevent escape key from closing to avoid unintentional input loss
      fullscreen="sm-down"   // forms are large, so make this fullscreen on small devices
      size="lg"
      backdrop="static"      // disallow clicking outside to cancel
      show={show}
      onHide={handleCancel}  // onHide fires when the close button or escape key are pressed
    >
      <Modal.Header className="mb-4" closeButton >
        <Modal.Title children={title} />
      </Modal.Header>
      <Modal.Body as={form} />
      <Modal.Footer className="border-0" />
    </Modal>
  );
}

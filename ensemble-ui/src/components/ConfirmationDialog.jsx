import React from "react";
import {Button, Modal} from "react-bootstrap";

/**
 * Generates a confirmation dialog box (modal) that requires the user to select an action.
 *
 * @param show {boolean} a state hook that toggles the display state of the
 * @param title {string} a text title to show in the modal body
 * @param description {string} a text description to show in the modal body
 * @param cancelButtonText {string} text to display on the cancel button
 * @param confirmButtonText {string} text to display on the confirm button
 * @param handleCancel function that handles close or cancel button presses
 * @param handleConfirm function that handles confirmation button presses
 * @returns {JSX.Element}
 * @constructor
 */
export default function ConfirmationDialog({
  show,
  title,
  description,
  cancelButtonText,
  confirmButtonText,
  handleCancel,
  handleConfirm
}) {
  return (
    <Modal
      centered
      size="sm"
      backdrop="static"      // disallow clicking outside to cancel
      show={show}
      onHide={handleCancel}  // onHide fires when the close button or escape key are pressed
    >
      <Modal.Header closeButton >
      <Modal.Title children={title}  />
      </Modal.Header>
      <Modal.Body children={description} />
      <Modal.Footer className="border-0">
        <Button variant="secondary" onClick={handleCancel}>{cancelButtonText}</Button>
        <Button variant="primary" onClick={handleConfirm}>{confirmButtonText}</Button>
      </Modal.Footer>
    </Modal>
  );
}

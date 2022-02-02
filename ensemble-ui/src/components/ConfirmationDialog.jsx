import { Button, Modal } from "react-bootstrap";

/**
 * Generates a confirmation dialog box (modal) that requires the user to select an action.
 *
 * @param {Object} props
 * @param {boolean} props.show a state hook that toggles the display state of the
 * @param {string} props.title a text title to show in the modal body
 * @param {string} props.description  a text description to show in the modal body
 * @param {function(): void} props.handleCancel function that handles close or cancel button presses
 * @param {function(): void} props.handleConfirm function that handles confirmation button presses
 * @returns {JSX.Element}
 */
export default function ConfirmationDialog({
  show,
  title,
  description,
  handleCancel,
  handleConfirm,
}) {
  return (
    <Modal
      centered
      size="sm"
      backdrop="static"      // disallow clicking outside to cancel
      show={show}
      onHide={handleCancel}  // onHide fires when the close button or escape key are pressed
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {description}
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}

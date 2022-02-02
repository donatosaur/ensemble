import { Modal, Container } from "react-bootstrap";

/**
 * Creates a modal intended to house a form. Only a close button is included, and should be passed
 * a boolean state.
 *
 * @param {Object} props
 * @param {boolean} props.show a state hook that toggles the display state of the dialog
 * @param {string} props.title a title for the form
 * @param {JSX.Element} props.form
 * @param {function(): void} props.handleCancel function that handles close or cancel button presses
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
      size="lg"
      backdrop="static"      // disallow clicking outside to cancel
      show={show}
      onHide={handleCancel}
    >
      <Modal.Header className="mb-4" closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Container>
        <Modal.Body as={form} />
      </Container>
      <Modal.Footer className="border-0" />
    </Modal>
  );
}

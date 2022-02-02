import { Button } from "react-bootstrap";

/**
 * @param {Object} props
 * @param {function(): void} props.onClick
 * @returns {JSX.Element}
 */
export default function EditButton({ onClick }) {
  return (
    <Button
      className="actionButton"
      variant="outline-secondary"
      aria-label="Edit"
      onClick={onClick}
    >
      <i className="bi bi-pencil-fill" />
    </Button>
  );
}

import { Button } from "react-bootstrap";

/**
 * @param {Object} props
 * @param {function(): void} props.onClick
 * @returns {JSX.Element}
 */
export default function DeleteButton({ onClick }) {
  return (
    <Button
      className="actionButton"
      variant="outline-secondary"
      aria-label="Delete"
      onClick={onClick}
    >
      <i className="bi bi-trash" />
    </Button>
  );
}

import { Button } from "react-bootstrap";

/**
 * @param {Object} props
 * @param {(function(): void)} props.onClick
 * @returns {JSX.Element}
 */
export default function AddButton({ onClick }) {
  return (
    <Button
      className="actionButton"
      variant="primary"
      aria-label="Add Entity"
      onClick={onClick}
    >
      <i className="bi bi-plus-lg me-1" />
      Add New
    </Button>
  );
}

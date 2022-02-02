/* eslint-disable react/jsx-props-no-spreading */
import { Button, Spinner } from "react-bootstrap";

/**
 * A button that displays a spinner when loading
 *
 * @param {Object} props
 * @param {boolean} props.loading if true, disables the button and displays a spinner
 * @param {Object} props.buttonProps
 * @returns {JSX.Element}
 */
export default function SpinnerButton({ loading, ...buttonProps }) {
  return (
    <Button disabled={loading} {...buttonProps}>
      {
        loading
          ? (
            <>
              <Spinner as="span" className="me-2" animation="border" variant="light" size="sm" role="status" />
              Submitting...
            </>
          )
          : `Submit`
      }
    </Button>
  );
}

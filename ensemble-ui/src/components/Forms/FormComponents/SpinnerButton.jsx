import React from "react";
import { Button, Spinner } from 'react-bootstrap';

/**
 * A button that displays a spinner when loading
 *
 * @param {boolean} loading if true, disables the button and displays a spinner
 * @param buttonProps
 * @returns {JSX.Element}
 */
export default function SpinnerButton({loading, ...buttonProps}) {
  return (
    <Button disabled={loading} {...buttonProps}>
      {
        loading
          ? <>
              <Spinner as="span" className="me-2" animation="border" variant="light" size="sm" role="status"/>
              Submitting...
            </>
          : `Submit`
      }
    </Button>
  )
}

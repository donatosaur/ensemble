import React from "react";
import { Popover, Button, OverlayTrigger } from 'react-bootstrap';

export default function HelpButton() {
  return (
    <OverlayTrigger
      trigger="focus"
      placement="bottom"
      overlay={
        <Popover id="help-popover">
          <Popover.Body>
            <p>
              <strong>To add a row</strong>, press the <em><i className="bi bi-plus-lg" /> Add New</em> toolbar
              button.
            </p>
            <p>
              <strong>To edit a row</strong>, press the <em><i className="bi bi-pencil-fill" /> Edit</em> button in
              the actions column of the row you wish to edit. If you don't see it, scroll right.
            </p>
            <p>
              <strong>To delete a row</strong>, press the <em><i className="bi bi-trash-fill" /> Delete</em> button
              in the actions column of the row you wish to delete. If you don't see it, scroll right.
            </p>
            <p>
              <strong>To search</strong>, scroll  to search form below the table. This is currently only available
              for <em>Musicians</em>.
            </p>
          </Popover.Body>
        </Popover>
      }
    >
      <Button
        className="actionButton"
        variant="primary"
        aria-label="Toggle Help"
      >
        <i className="bi bi-question-circle-fill me-2" />
        {`Help`}
      </Button>
    </OverlayTrigger>
  );
}

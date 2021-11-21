import React from "react";
import { Popover, Button, OverlayTrigger } from 'react-bootstrap';

export default function HelpButton() {
  const HelpPopover = () => {
    return (
      <Popover
        id="help-popover"
        placement="bottom"
      >
        <Popover.Body>
          <p>
            <strong>To add a row</strong>, press the <em><i className="bi bi-plus-lg" /> Add New</em> toolbar button
            to toggle a form.
          </p>
          <p>
            <strong>To edit a row</strong>, press the <em><i className="bi bi-pencil-fill" /> Edit</em> button in the
            actions column of the row you wish to edit. If you don't see it, scroll right. This will toggle a form.
          </p>
          <p>
            <strong>To delete a row</strong>, press the <em><i className="bi bi-trash-fill" /> Delete</em> button in the
            actions column of the row you wish to delete. If you don't see it, scroll right.
          </p>
          <p>
            <strong>To search</strong>, press the <em><i className="bi bi-search" /> Search</em> toolbar button to
            toggle the search form. This is currently only available for <em>Musicians</em>.
          </p>
        </Popover.Body>
      </Popover>
    )
  }

  return (
    <OverlayTrigger
      trigger="focus"
      placement="bottom"
      overlay={HelpPopover}
    >
      <Button
        className="actionButton"
        variant="outline-secondary"
        aria-label="Toggle Help"
      >
        <i className="bi bi-question-circle-fill" />
        {`Help`}
      </Button>
    </OverlayTrigger>
  );
}

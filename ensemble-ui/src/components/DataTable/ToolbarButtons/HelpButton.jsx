import React, { useState } from "react";
import Popover from "@material-ui/core/Popover"
import Button from "@material-ui/core/Button";
import { Container } from "react-bootstrap";

export default function HelpButton() {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <Button
        className="toolbarButton"
        variant="text"
        color="primary"
        size="small"
        aria-label="Help"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <i className="bi bi-question-circle-fill" />
        {`Help`}
      </Button>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom',  horizontal: 'left'}}
      >
        <Container className="toolbarPopoverContainer">
        {/* Add */}
        <p>
          <strong>To add a row</strong>, press the <em><i className="bi bi-plus-lg" /> Add New</em> toolbar button
          to toggle a form.
        </p>
        {/* Edit/Update */}
        <p>
          <strong>To edit a row</strong>, press the <em><i className="bi bi-pencil-fill" /> Edit</em> button in the actions column of
          the row you wish to edit. If you don't see it, scroll right. This will toggle a form.
        </p>
        {/* Delete */}
        <p>
          <strong>To delete a row</strong>, press the <em><i className="bi bi-trash-fill" /> Delete</em> button in the actions column
          of the row you wish to delete. If you don't see it, scroll right.
        </p>
        {/* Search */}
        <p>
          <strong>To search</strong>, press the <em><i className="bi bi-search" /> Search</em> toolbar button to
          toggle the search form. This is currently only available for <em>Musicians</em>.
        </p>
        </Container>
      </Popover>
    </>
  );
}

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
          <strong>To add a row</strong>, click "Add New" to toggle the form.
        </p>
        {/* Edit/Update */}
        <p>
          <strong>To edit a row</strong>, double click on it, or click and press "Enter." When you're done
          editing, select the rows that you've edited <em>and</em> want to be updated. (<em>Note:</em> row ids
          are read-only.)
          <br />Then, press "Commit Edits."
        </p>
        {/* Search */}
        <p>
          <strong>To search</strong>, click "Search" to toggle the search panel.
        </p>
        {/* Delete */}
        <p>
          <strong>To delete a row</strong>, select it.
          <br />Then, press "Delete Selected."
        </p>
        </Container>
      </Popover>
    </>
  );
}

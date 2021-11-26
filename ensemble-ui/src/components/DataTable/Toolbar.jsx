import React from "react";
import { Container } from "react-bootstrap";

import HelpButton from "./ToolbarButtons/HelpButton";
import AddButton from "./ToolbarButtons/AddButton";

/**
 * Creates a toolbar with any combination of the following buttons: Add, Search, Density. To render a button, pass an
 * event handler for it. Any buttons with a missing or null event handler will *not* be rendered.
 *
 * @param handleAddButtonClick
 * @returns {JSX.Element}
 */
export default function Toolbar({ handleAddButtonClick }) {
  return (
    <Container className="text-start justify-content-left border-0 p-0 m-0">
      { handleAddButtonClick && <AddButton onClick={handleAddButtonClick}/> }
      <HelpButton/>
    </Container>
  );
}


import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import HelpButton from "./ToolbarButtons/HelpButton";
import SearchButton from "./ToolbarButtons/SearchButton";
import AddButton from "./ToolbarButtons/AddButton";
import DensityButton from './ToolbarButtons/DensityButton';

/**
 * Creates a toolbar with any combination of the following buttons: Add, Search, Density. To render a button, pass an
 * event handler for it. Any buttons with a missing or null event handler will *not* be rendered.
 *
 * @param {(Event) => void} [handleAddButtonClick]
 * @param {(Event) => void} [handleDensityButtonClick]
 * @returns {JSX.Element}
 */
export default function Toolbar({
  handleAddButtonClick,
  handleDensityButtonClick,
}) {

  return (
    <Container fluid style ={{textAlign: 'left'}} className="justify-content-left border-0 p-0 m-0">
        { handleAddButtonClick && <AddButton onClick={handleAddButtonClick}/> }
        { handleDensityButtonClick && <DensityButton/> }
        {/*<HelpButton/>*/}
    </Container>
  )
}


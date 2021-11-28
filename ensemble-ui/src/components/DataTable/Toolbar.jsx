import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import HelpButton from "./ToolbarButtons/HelpButton";
import AddButton from "./ToolbarButtons/AddButton";
import ReloadButton from './ToolbarButtons/ReloadButton';

/**
 * Creates a toolbar with any combination of the following buttons: Add, Search, Reload.
 *
 * @param handleAddButtonClick
 * @param handleReloadButtonClick
 * @returns {JSX.Element}
 */
export default function Toolbar({ handleAddButtonClick, handleReloadButtonClick }) {
  return (
    <Container className="justify-content-left border-0 p-0 m-0">
      <Row className="text-start">
        <Col xs={8}>
          { handleAddButtonClick && <AddButton onClick={handleAddButtonClick}/> }
          <HelpButton/>
        </Col>
        <Col xs={4} className="text-end">
          { handleReloadButtonClick && <ReloadButton onClick={handleReloadButtonClick} /> }
        </Col>
      </Row>
    </Container>
  );
}

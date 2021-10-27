import React from "react";
import { Container } from "react-bootstrap";
import EntityFormProvider from "../components/EntityFormProvider.jsx";
import DataTableProvider from "../components/DataTableProvider";

export default function EntityPage({ match }) {
  const {
    params: { entityName },
  } = match;
 
  return (
    <>
      <h1>{entityName}</h1>
     
      <Container>
        <DataTableProvider entityName={entityName}/>
      </Container>

      <Container className={"entityFormContainer"}>
        <EntityFormProvider entityName={entityName} />
      </Container>

      <Container fluid style={{
        textAlign: "left"
      }}>
        <h5>Instructions:</h5>
        <ul>
          <li>Add a new element using the form at the bottom</li>
          <li>Make edits by double-clicking a row, then press "Commit Edits" when you're done</li>
        </ul>
        <br />
      </Container>
    </>
  );
}


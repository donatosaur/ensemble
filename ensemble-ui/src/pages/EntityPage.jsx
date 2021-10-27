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
    </>
  );
}


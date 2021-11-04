import React, { useState } from "react";
import { Container } from "react-bootstrap";
import EntityFormProvider from "../components/EntityFormProvider.jsx";
import DataTableProvider from "../components/DataTableProvider";

export default function EntityPage({ match }) {
  const {
    params: { entityName },
  } = match;

  /* -------------------------------- State Hooks -------------------------------- */

  // display state for entity form
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const createFormToggle = (newState) => setCreateFormOpen(newState === undefined ? !createFormOpen : newState);

  //

  return (
    <>
      <h1>{entityName}</h1>
     
      <Container>
        <DataTableProvider entityName={entityName} createFormToggle={createFormToggle}/>
      </Container>

      { createFormOpen &&
        <>
          <Container className={"entityFormContainer"}>
            <EntityFormProvider entityName={entityName} />
          </Container>
        </>
      }
    </>
  );
}


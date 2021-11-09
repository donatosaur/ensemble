import React, { useState } from "react";
import { Container } from "react-bootstrap";
import DataTableProvider from "../src/components/DataTableProvider";

export default function EntityProvider({ entityName }) {



  /* -------------------------------- State Hooks -------------------------------- */

  // display state for entity form
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const createFormToggle = (newState) => setCreateFormOpen(newState === undefined ? !createFormOpen : newState);

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


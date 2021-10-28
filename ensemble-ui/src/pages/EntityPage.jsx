import React, { useState } from "react";
import { Container } from "react-bootstrap";
import EntityFormProvider from "../components/EntityFormProvider.jsx";
import DataTableProvider from "../components/DataTableProvider";

export default function EntityPage({ match }) {
  const {
    params: { entityName },
  } = match;

  // state hook to set the display state of the entity form
  const [entityFormOpen, setEntityFormOpen] = useState(false);
  const entityFormToggle = (newState) => {
    setEntityFormOpen(newState === undefined ? !entityFormOpen : newState);
  }

  return (
    <>
      <h1>{entityName}</h1>
     
      <Container>
        <DataTableProvider entityName={entityName} entityFormToggle={entityFormToggle}/>
      </Container>

      { entityFormOpen &&
        <>
          <Container className={"entityFormContainer"}>
            <EntityFormProvider entityName={entityName} />
          </Container>
        </>
      }
    </>
  );
}


import React, { useState } from "react";
import { Container } from "react-bootstrap";
import EntityContextProvider from "../components/EntityContextProvider";


import DataTableProvider from "../components/DataTableProvider";
import InstrumentsForm from "../components/Forms/InstrumentsForm";


export default function InstrumentsPage() {
  const entityName = "Instruments";
  const createFormLabel = "Add an Instrument";
  const createButtonLabel = "Submit";

  // state hooks for form display state
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const createFormToggle = (newState) => setCreateFormOpen(newState === undefined ? !createFormOpen : newState);

  const [editFormOpen, setEditFormOpen] = useState(false);
  const editFormToggle = (newState) => setEditFormOpen(newState === undefined ? !createFormOpen : newState);


  return (
    <>
      <h1>{entityName}</h1>

      <EntityContextProvider key={1}>
        <Container>
          <DataTableProvider
            entityName={entityName}
            createFormToggle={createFormToggle}
            editFormToggle={editFormToggle}
          />
        </Container>

        { editFormOpen &&
          <Container className={"entityFormContainer"}>
            <InstrumentsForm
              showID={true}
              formLabel={"Edit"}
              buttonLabel={"Commit"}
            />
          </Container>
        }
      </EntityContextProvider>

      <EntityContextProvider key={2}>
      { createFormOpen &&
        <Container className={"entityFormContainer"}>
          <InstrumentsForm
            showID={false}
            formLabel={createFormLabel}
            buttonLabel={createButtonLabel}
          />
        </Container>
      }
      </EntityContextProvider>
    </>
  );
}

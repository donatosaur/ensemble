import React, { useState } from "react";
import { Container } from "react-bootstrap";
import EntityContextProvider from "../hooks/EntityContextProvider";

import InstrumentsForm from "../components/Forms/InstrumentsForm";
import DataTable from "../components/DataTable/DataTable";


export default function InstrumentsPage() {
  const entityName = "Instruments";

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
          <DataTable
            createFormToggle={createFormToggle}
            editFormToggle={editFormToggle}
            allowSearch={false}
            allowEdit={true}
          />
        </Container>

        { editFormOpen &&
          <Container className={"entityFormContainer"}>
            <InstrumentsForm
              mode="update"
              formLabel="Edit"
              buttonLabel="Commit"
            />
          </Container>
        }
      </EntityContextProvider>

      <EntityContextProvider key={2}>
      { createFormOpen &&
        <Container className={"entityFormContainer"}>
          <InstrumentsForm
            mode="create"
            formLabel="Add an Instrument"
            buttonLabel="Submit"
          />
        </Container>
      }
      </EntityContextProvider>
    </>
  );
}

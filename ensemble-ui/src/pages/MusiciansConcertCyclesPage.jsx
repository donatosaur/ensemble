import React, { useState } from "react";
import { Container } from "react-bootstrap";
import DataTableProvider from "../components/DataTableProvider";
import MusiciansConcertCyclesForm from "../components/Forms/MusiciansConcertCyclesForm";
import EntityContextProvider from "../components/EntityContextProvider";

export default function MusiciansConcertCyclesPage() {
  const entityName = "MusiciansConcertCycles";
  const createFormLabel = "Link a Musician to a Concert Cycle";
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
          <p>Edits are disabled for this entity. Use add new/delete instead.</p>
        </Container>
        }
      </EntityContextProvider>

      <EntityContextProvider key={2}>
        { createFormOpen &&
        <Container className={"entityFormContainer"}>
          <MusiciansConcertCyclesForm
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

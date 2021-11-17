import React, { useState } from "react";
import { Container } from "react-bootstrap";

import PiecesConcertCyclesForm from "../components/Forms/PiecesConcertCyclesForm";
import EntityContextProvider from "../hooks/EntityContextProvider";
import DataTable from "../components/DataTable/DataTable";

export default function PiecesConcertCyclesPage() {
  const entityName = 'PiecesConcertCycles';

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
            allowEdit={false}
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
          <PiecesConcertCyclesForm
            mode="create"
            formLabel="Link a Piece to a ConcertCycle"
            buttonLabel="Submit"
          />
        </Container>
        }
      </EntityContextProvider>
    </>
  );
}

import React, { useState } from "react";
import { Container } from "react-bootstrap";
import DataTableProvider from "../components/DataTableProvider";
import PiecesForm from "../components/Forms/PiecesForm";
import EntityContextProvider from "../hooks/EntityContextProvider";


export default function PiecesPage() {
  const entityName = "Pieces";
  const createFormLabel = "Add a Piece";
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
          <PiecesForm
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
          <PiecesForm
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

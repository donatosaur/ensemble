import React, { useState } from "react";
import { Container } from "react-bootstrap";
import PiecesForm from "../components/Forms/PiecesForm";
import EntityContextProvider from "../hooks/EntityContextProvider";
import DataTable from "../components/DataTable/DataTable";


export default function PiecesPage() {
  const entityName = "Pieces";

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
          <PiecesForm
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
          <PiecesForm
            mode="create"
            formLabel="Add a Piece"
            buttonLabel="Submit"
          />
        </Container>
        }
      </EntityContextProvider>
    </>
  );
}

import React, { useState} from "react";
import { Container } from "react-bootstrap";
import MusiciansForm from "../components/Forms/MusiciansForm";
import EntityContextProvider from "../hooks/EntityContextProvider";
import DataTable from "../components/DataTable/DataTable";


export default function MusiciansPage() {
  const entityName = "Musicians";

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
            allowSearch={true}
            allowEdit={true}
          />
        </Container>

        { editFormOpen &&
        <Container className="entityFormContainer">
          <MusiciansForm
            mode="update"
            formLabel="Edit"
            buttonLabel="Commit"
          />
        </Container>
        }
      </EntityContextProvider>

      <EntityContextProvider key={2}>
        { createFormOpen &&
        <Container className="entityFormContainer">
          <MusiciansForm
            mode="create"
            formLabel="Add a Musician"
            buttonLabel="Submit"
          />
        </Container>
        }
      </EntityContextProvider>
    </>
  );
}

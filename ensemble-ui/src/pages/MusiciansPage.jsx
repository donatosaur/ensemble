import React, { useState} from "react";
import { Container } from "react-bootstrap";
import DataTableProvider from "../components/DataTableProvider";
import MusiciansForm from "../components/Forms/MusiciansForm";
import EntityContextProvider from "../hooks/EntityContextProvider";


export default function MusiciansPage() {
  const entityName = "Musicians";
  const createFormLabel = "Add a Musician";
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
        <Container fluid>
          <DataTableProvider
            entityName={entityName}
            createFormToggle={createFormToggle}
            editFormToggle={editFormToggle}
          />
        </Container>

        { editFormOpen &&
        <Container className={"entityFormContainer"}>
          <MusiciansForm
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
          <MusiciansForm
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

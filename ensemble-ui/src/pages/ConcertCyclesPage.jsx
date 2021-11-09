import React, { useState} from "react";
import { Container } from "react-bootstrap";
import DataTableProvider from "../components/DataTableProvider";
import ConcertCyclesForm from "../components/Forms/ConcertCyclesForm";
import EntityContextProvider from "../components/EntityContextProvider";


export default function ConcertCyclesPage() {
  const entityName = "ConcertCycles";
  const createFormLabel = "Add a Concert Cycle";
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
          <ConcertCyclesForm
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
          <ConcertCyclesForm
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

import { useState } from "react";
import { Container } from "react-bootstrap";
import ConcertCyclesForm from "../../components/Forms/ConcertCyclesForm";

import DataTable from "../../components/DataTable/DataTable";
import FormModal from "../../components/FormModal";
import getInitialFormValues from "./getForm";

export default function ConcertCyclesPage() {
  const entityName = "ConcertCycles";

  // form display states
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editFormValues, setEditFormValues] = useState({});

  const createForm = () => (
    <ConcertCyclesForm
      mode="create"
      initialFormValues={getInitialFormValues(entityName)}
    />
  );

  return (
    <>
      <h1>{entityName}</h1>

      <Container>
        <DataTable
          setEditFormValues={setEditFormValues}
          setCreateFormOpen={setCreateFormOpen}
          setEditFormOpen={setEditFormOpen}
        />
      </Container>

      {/* render the create form modal */}
      { createFormOpen && (
        <FormModal
          show={createFormOpen}
          title="Create a ConcertCycle"
          form={createForm}
          handleCancel={() => setCreateFormOpen(false)}
        />
      )}

      {/* render the edit form modal */}
      { editFormOpen && (
        <FormModal
          show={editFormOpen}
          title="Edit ConcertCycle"
          form={(
            <ConcertCyclesForm
              mode="update"
              initialFormValues={editFormValues}
            />
          )}
          handleCancel={() => setEditFormOpen(false)}
        />
      )}
    </>
  );
}

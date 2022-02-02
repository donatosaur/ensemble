import { useState } from "react";
import { Container } from "react-bootstrap";
import InstrumentsForm from "../../components/Forms/InstrumentsForm";

import DataTable from "../../components/DataTable/DataTable";
import FormModal from "../../components/FormModal";
import getInitialFormValues from "./getForm";

export default function InstrumentsPage() {
  const entityName = "Instruments";

  // form display states
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editFormValues, setEditFormValues] = useState({});

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
          title="Create an Instrument"
          form={(
            <InstrumentsForm
              mode="create"
              initialFormValues={getInitialFormValues(entityName)}
            />
          )}
          handleCancel={() => setCreateFormOpen(false)}
        />
      )}

      {/* render the edit form modal */}
      { editFormOpen && (
        <FormModal
          show={editFormOpen}
          title="Edit Instrument"
          form={(
            <InstrumentsForm
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

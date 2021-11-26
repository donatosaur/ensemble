import React, { useState } from "react";
import { Container } from "react-bootstrap";
import InstrumentsForm from "../components/Forms/InstrumentsForm";
import DataTable from "../components/DataTable/DataTable";
import FormModal from '../components/FormModal';


export default function InstrumentsPage() {
  const entityName = "Instruments";

  // state hooks for form display state
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editFormValues, setEditFormValues] = useState({});

  // forms
  const CreateForm = () => (
  <InstrumentsForm
  mode="create"
  initialFormValues={{
    name: ''
  }}
  />
);

  const EditForm = () => (
  <InstrumentsForm
    mode="update"
    initialFormValues={editFormValues}
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
            allowSearch={false}
            allowEdit={true}
          />
        </Container>

      {/* render the create form modal */}
      { createFormOpen &&
      <FormModal
        show={createFormOpen}
        title="Create an Instrument"
        form={CreateForm}
        handleCancel={() => setCreateFormOpen(false)}
      />
      }

      {/* render the edit form modal */}
      { editFormOpen &&
      <FormModal
        show={editFormOpen}
        title="Edit Instrument"
        form={EditForm}
        handleCancel={() => setEditFormOpen(false)}
      />
      }
    </>
  );
}

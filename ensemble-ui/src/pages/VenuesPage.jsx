import React, { useState } from "react";
import { Container } from "react-bootstrap";
import VenuesForm from "../components/Forms/VenuesForm";
import DataTable from "../components/DataTable/DataTable";
import FormModal from '../components/FormModal';


export default function VenuesPage() {
  const entityName = "Venues";

  // state hooks for form display state
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editFormValues, setEditFormValues] = useState(null);

  // forms
  const CreateForm = () => (
    <VenuesForm
      mode="create"
      initialFormValues={{
        capacity: '',
        name: '',
        street: '',
        city: '',
        state: '',
        zip: ''
      }}
    />
  );

  const EditForm = () => (
    <VenuesForm
      mode="edit"
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
          title="Create a Venue"
          form={CreateForm}
          handleCancel={() => setCreateFormOpen(false)}
        />
      }

      {/* render the edit form modal */}
      { editFormOpen &&
        <FormModal
          show={editFormOpen}
          title="Edit Venue"
          form={EditForm}
          handleCancel={() => setEditFormOpen(false)}
        />
      }
    </>
  );
}

import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ServicesForm from "../components/Forms/ServicesForm";
import DataTable from "../components/DataTable/DataTable";
import FormModal from '../components/FormModal';


export default function ServicesPage() {
  const entityName = "Services";

  // state hooks for form display state
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editFormValues, setEditFormValues] = useState({});

  // forms
  const CreateForm = () => (
    <ServicesForm
      mode="create"
      initialFormValues={{
        startTime: '',
        endTime: '',
        isRehearsal: false,
        venueID: '',
        concertID: ''
      }}
    />
  );

  const EditForm = () => (
    <ServicesForm
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
        title="Create a Service"
        form={CreateForm}
        handleCancel={() => setCreateFormOpen(false)}
      />
      }

      {/* render the edit form modal */}
      { editFormOpen &&
      <FormModal
        show={editFormOpen}
        title="Edit Service"
        form={EditForm}
        handleCancel={() => setEditFormOpen(false)}
      />
      }
    </>
  );
}
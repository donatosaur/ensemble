import React, { useState} from "react";
import { Container } from "react-bootstrap";
import MusiciansForm from "../components/Forms/MusiciansForm";
import DataTable from "../components/DataTable/DataTable";
import FormModal from '../components/FormModal';


export default function MusiciansPage() {
  const entityName = "Musicians";

  // state hooks for forms & display state
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editFormValues, setEditFormValues] = useState({});

  // forms
  const CreateForm = () => (
     <MusiciansForm
       mode="create"
       initialFormValues={{
         birthdate: '',
         firstName: '',
         lastName: '',
         email: '',
         phoneNumber: '',
         inEnsemble: false,
         active: false,
         street: '',
         city: '',
         state: '',
         zip: '',
       }}
     />
  );

  const EditForm = () => (
    <MusiciansForm
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
          allowSearch={true}
          allowEdit={true}
        />
      </Container>

      {/* render the create form modal */}
      { createFormOpen &&
        <FormModal
          show={createFormOpen}
          title="Create a Musician"
          form={CreateForm}
          handleCancel={() => setCreateFormOpen(false)}
        />
      }

      {/* render the edit form modal */}
      { editFormOpen &&
        <FormModal
          show={editFormOpen}
          title="Edit Musician"
          form={EditForm}
          handleCancel={() => setEditFormOpen(false)}
        />
      }
    </>
  );
}

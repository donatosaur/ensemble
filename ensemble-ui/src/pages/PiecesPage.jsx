import React, { useState } from "react";
import { Container } from "react-bootstrap";
import PiecesForm from "../components/Forms/PiecesForm";
import DataTable from "../components/DataTable/DataTable";
import FormModal from '../components/FormModal';


export default function PiecesPage() {
  const entityName = "Pieces";

  // state hooks for form display state
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editFormValues, setEditFormValues] = useState({});

  // forms
  const CreateForm = () => (
    <PiecesForm
      mode="create"
      initialFormValues={{
        pieceTitle: '',
        composerFirstName: '',
        composerLastName: '',
        arrangerFirstName: '',
        arrangerLastName: '',
        instrumentation: ''
    }}
    />
  );

  const EditForm = () => (
    <PiecesForm
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
        title="Create a Piece"
        form={CreateForm}
        handleCancel={() => setCreateFormOpen(false)}
      />
      }

      {/* render the edit form modal */}
      { editFormOpen &&
      <FormModal
        show={editFormOpen}
        title="Edit Piece"
        form={EditForm}
        handleCancel={() => setEditFormOpen(false)}
      />
      }
    </>
  );
}
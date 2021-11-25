import React, { useState } from "react";
import { Container } from "react-bootstrap";
import PiecesConcertCyclesForm from "../components/Forms/PiecesConcertCyclesForm";
import DataTable from "../components/DataTable/DataTable";
import FormModal from '../components/FormModal';

export default function PiecesConcertCyclesPage() {
  const entityName = 'PiecesConcertCycles';

  // state hooks for form display state
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);

  // forms
  const CreateForm = () => (
  <PiecesConcertCyclesForm
      mode="create"
      initialFormValues={{
        pieceID: '',
        concertID: ''
      }}
    />
  );

  return (
    <>
      <h1>{entityName}</h1>

      <Container>
        <DataTable
          setCreateFormOpen={setCreateFormOpen}
          setEditFormOpen={setEditFormOpen}
          allowSearch={false}
          allowEdit={false}
        />
      </Container>

      {/* this should never be rendered, but is here for safety */}
      { editFormOpen &&
        <Container>
          <p>Edits are disabled for this entity. Use add new/delete instead.</p>
        </Container>
      }

      {/* render the create form modal */}
      { createFormOpen &&
        <FormModal
          show={createFormOpen}
          title="Link a Piece to a ConcertCycle"
          form={CreateForm}
          handleCancel={() => setCreateFormOpen(false)}
        />
      }
    </>
  );
}

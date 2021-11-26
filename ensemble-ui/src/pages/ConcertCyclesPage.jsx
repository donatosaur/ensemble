import React, { useState} from "react";
import { Container } from "react-bootstrap";
import ConcertCyclesForm from "../components/Forms/ConcertCyclesForm";
import DataTable from "../components/DataTable/DataTable";
import FormModal from '../components/FormModal';


export default function ConcertCyclesPage() {
  const entityName = "ConcertCycles";

  // state hooks for form display state
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editFormValues, setEditFormValues] = useState({});

  // forms
  const CreateForm = () => (
    <ConcertCyclesForm
      mode="create"
      initialFormValues={{
        concertTitle: '',
        startDate: '',
        endDate: '',
        conductorFirstName: '',
        conductorLastName: '',
        soloistFirstName: '',
        soloistLastName: ''
      }}
    />
  );

  const EditForm = () => (
    <ConcertCyclesForm
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
        title="Create a ConcertCycle"
        form={CreateForm}
        handleCancel={() => setCreateFormOpen(false)}
      />
      }

      {/* render the edit form modal */}
      { editFormOpen &&
      <FormModal
        show={editFormOpen}
        title="Edit ConcertCycle"
        form={EditForm}
        handleCancel={() => setEditFormOpen(false)}
      />
      }
    </>
  );
}
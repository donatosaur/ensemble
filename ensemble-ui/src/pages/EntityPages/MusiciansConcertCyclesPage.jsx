import { useState } from "react";
import { Container } from "react-bootstrap";
import MusiciansConcertCyclesForm from "../../components/Forms/MusiciansConcertCyclesForm";

import DataTable from "../../components/DataTable/DataTable";
import FormModal from "../../components/FormModal";
import getInitialFormValues from "./getForm";

export default function MusiciansConcertCyclesPage() {
  const entityName = "MusiciansConcertCycles";

  // form display states
  const [createFormOpen, setCreateFormOpen] = useState(false);

  return (
    <>
      <h1>{entityName}</h1>

      <Container>
        <DataTable setCreateFormOpen={setCreateFormOpen} />
      </Container>

      {/* render the create form modal */}
      { createFormOpen && (
        <FormModal
          show={createFormOpen}
          title="Link a Musician to a ConcertCycle"
          form={(
            <MusiciansConcertCyclesForm
              mode="create"
              initialFormValues={getInitialFormValues(entityName)}
            />
          )}
          handleCancel={() => setCreateFormOpen(false)}
        />
      )}
    </>
  );
}

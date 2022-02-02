import { useState } from "react";
import { Container } from "react-bootstrap";
import MusiciansInstrumentsForm from "../../components/Forms/MusiciansInstrumentsForm";

import DataTable from "../../components/DataTable/DataTable";
import FormModal from "../../components/FormModal";
import getInitialFormValues from "./getForm";

export default function MusiciansInstrumentsPage() {
  const entityName = "MusiciansInstruments";

  // form display states
  const [createFormOpen, setCreateFormOpen] = useState(false);

  return (
    <>
      <h1>{entityName}</h1>

      <Container>
        <DataTable setCreateFormOpen={setCreateFormOpen} />
      </Container>

      { createFormOpen && (
        <FormModal
          show={createFormOpen}
          title="Link a Musician to an Instrument"
          form={(
            <MusiciansInstrumentsForm
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

import { useState } from "react";
import { Container } from "react-bootstrap";
import PiecesConcertCyclesForm from "../../components/Forms/PiecesConcertCyclesForm";

import DataTable from "../../components/DataTable/DataTable";
import FormModal from "../../components/FormModal";
import getInitialFormValues from "./getForm";

export default function PiecesConcertCyclesPage() {
  const entityName = "PiecesConcertCycles";

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
          title="Link a Piece to a ConcertCycle"
          form={(
            <PiecesConcertCyclesForm
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

import React from "react";
import EntityFormProvider from "../components/EntityFormProvider.js";
import DataTableProvider from "../components/DataTableProvider";

export default function EntityPage({ match }) {
  const {
    params: { entityName },
  } = match;
 

  return (
    <>
      <h1>{entityName}</h1>
      <br />

      <DataTableProvider entityName={entityName}/>

      <br />
      <EntityFormProvider entityName={entityName} />
    </>
  );
}


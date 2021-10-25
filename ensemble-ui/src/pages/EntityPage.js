import React from "react";
import NavigationBar from "../components/NavigationBar";
import EntityFormProvider from "../components/EntityFormProvider.js";

export default function EntityPage({ match }) {
  const {
    params: { entityName },
  } = match;
 

  return (
    <>
      <NavigationBar></NavigationBar>
      
      <h1>{entityName}</h1>   
      <EntityFormProvider entityName={entityName}></EntityFormProvider>     
    </>
  );
}


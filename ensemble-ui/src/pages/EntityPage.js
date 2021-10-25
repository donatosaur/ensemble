import React from "react";
import NavigationBar from "../components/NavigationBar";

export default function EntityPage({ match }) {
  const {
    params: { entityName },
  } = match;
 

  return (
    <>
      <NavigationBar></NavigationBar>
      <h1>{entityName}</h1>        
    </>
  );
}


import React, { createContext, useReducer } from "react";

// create a context hook for the entity object and its dispatch function
export const EntityContext = createContext(null);
export const EntityDispatchContext = createContext(null);

export default function EntityContextProvider({ children }) {
  // create a reducer hook: this will let us re-render only components that depend on a key-value pair
  // in the entity object, instead of causing every input field to be re-rendered
  const [entity, dispatch] = useReducer(
    // overwrite only the new fields that are passed in
    (oldEntityState, newEntityState) => ({...oldEntityState, ...newEntityState}),
    {}
  );
  
  // these are provided separately, otherwise every time dispatch is called it will force a re-render on
  // any element that depends on entity (which runs counter to the point of using a reducer here: we
  // only want entities whose values actually change to be re-rendered )
  return(
    <EntityContext.Provider value={entity}>
      <EntityDispatchContext.Provider value={dispatch}>
          {children}
        </EntityDispatchContext.Provider>
    </EntityContext.Provider>
  )
}

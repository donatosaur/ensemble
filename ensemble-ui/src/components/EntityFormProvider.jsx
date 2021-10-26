import React from "react";
import ConcertCyclesForm from "./forms/ConcertCyclesForm";
import InstrumentsForm from "./forms/InstrumentsForm";
import MusiciansForm from "./forms/MusiciansForm";
import PiecesForm from "./forms/PiecesForm"
import ServicesForm from "./forms/ServicesForm"
import VenuesForm from "./forms/VenuesForm";


export default function EntityForm({entityName}){

    switch(entityName) {
        case 'Musicians':
          return <MusiciansForm/>
        case 'Instruments':
          return <InstrumentsForm/>
        case 'Pieces':
          return <PiecesForm/>
        case 'Services':
            return <ServicesForm/>
        case 'Venues':
            return <VenuesForm/>
        case 'ConcertCycles':
            return <ConcertCyclesForm/>
        default:
          return null
      }
    }

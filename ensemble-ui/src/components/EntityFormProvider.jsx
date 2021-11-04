import React from "react";

import ConcertCyclesForm from "./AddForms/ConcertCyclesForm";
import InstrumentsForm from "./AddForms/InstrumentsForm";
import MusiciansForm from "./AddForms/MusiciansForm";
import PiecesForm from "./AddForms/PiecesForm"
import ServicesForm from "./AddForms/ServicesForm"
import VenuesForm from "./AddForms/VenuesForm";
import MusiciansInstrumentsForm from "./AddForms/MusiciansInstrumentsForm";
import MusiciansConcertCyclesForm from "./AddForms/MusiciansConcertCyclesForm";
import PiecesConcertCyclesForm from "./AddForms/PiecesConcertCyclesForm";


export default function EntityForm({entityName}){

  switch(entityName) {
    case 'Musicians':
      return <MusiciansForm />
    case 'Instruments':
      return <InstrumentsForm />
    case 'Pieces':
      return <PiecesForm />
    case 'Services':
      return <ServicesForm />
    case 'Venues':
      return <VenuesForm />
    case 'ConcertCycles':
      return <ConcertCyclesForm />
    case 'MusiciansInstruments':
      return <MusiciansInstrumentsForm />
    case 'MusiciansConcertCycles':
      return <MusiciansConcertCyclesForm />
    case 'PiecesConcertCycles':
      return <PiecesConcertCyclesForm />
    default:
        return null;
    }
  }

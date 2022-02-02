export default function getInitialFormValues(entityName) {
  switch (entityName) {
  case "Musicians": {
    return {
      birthdate: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      inEnsemble: false,
      active: false,
      street: "",
      city: "",
      state: "",
      zip: "",
    };
  }
  case "Instruments": {
    return {
      name: "",
    };
  }
  case "Venues": {
    return {
      capacity: "",
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
    };
  }
  case "ConcertCycles": {
    return {
      concertTitle: "",
      startDate: "",
      endDate: "",
      conductorFirstName: "",
      conductorLastName: "",
      soloistFirstName: "",
      soloistLastName: "",
    };
  }
  case "Services": {
    return {
      startTime: "",
      endTime: "",
      isRehearsal: false,
      venueID: "",
      concertID: "",
    };
  }
  case "Pieces": {
    return {
      pieceTitle: "",
      composerFirstName: "",
      composerLastName: "",
      arrangerFirstName: "",
      arrangerLastName: "",
      instrumentation: "",
    };
  }
  case "MusiciansInstruments": {
    return {
      musicianID: "",
      instrumentID: "",
    };
  }
  case "MusiciansConcertCycles": {
    return {
      musicianID: "",
      concertID: "",
    };
  }
  case "PiecesConcertCycles": {
    return {
      pieceID: "",
      concertID: "",
    };
  }
  default: return null;
  }
}

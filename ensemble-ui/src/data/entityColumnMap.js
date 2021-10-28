const entityColumnMap = new Map([
  ["Musicians", [
    { field: "id", headerName: "ID", width: 90, editable: false },
    { field: "firstName", headerName: "First Name", minWidth: 180, editable: true },
    { field: "lastName", headerName: "Last Name", minWidth: 180, editable: true },
    { field: "birthdate", headerName: "Date of Birth", type: "date", minWidth: 180, editable: true },
    { field: "email", headerName: "Email", minWidth: 180, editable: true },
    { field: "phoneNumber", headerName: "Phone", minWidth: 180, editable: true},
    { field: "street", headerName: "Street", minWidth: 180, editable: true },
    { field: "city", headerName: "City", minWidth: 180, editable: true },
    { field: "state", headerName: "State", minWidth: 90, editable: true },
    { field: "zip", headerName: "Zip", minWidth: 90, editable: true },
    { field: "inEnsemble", headerName: "Ensemble", type: "boolean", minWidth: 120, editable: true },
    { field: "active", headerName: "Active", type: "boolean", minWidth: 120, editable: true}
  ]],
  ["Instruments", [
    { field: "id", headerName: "ID", width: 90, editable: false },
    { field: "name", headerName: "Name", minWidth: 180, editable: true }
  ]],
  ["Venues", [
    { field: "id", headerName: "ID", width: 90, editable: false },
    { field: "capacity", headerName: "Capacity", type: "number", minWidth: 180, editable: true },
    { field: "name", headerName: "Name", minWidth: 180, editable: true },
    { field: "city", headerName: "City", minWidth: 180, editable: true },
    { field: "state", headerName: "State", minWidth: 180, editable: true },
    { field: "zip", headerName: "Zip", minWidth: 180, editable: true }
  ]],
  ["ConcertCycles", [
    { field: "id", headerName: "ID", width: 90, editable: false },
    { field: "concertTitle", headerName: "Concert Title", minWidth: 180, editable: true },
    { field: "startDate", headerName: "Start Date", type: "date", minWidth: 180, editable: true },
    { field: "endDate", headerName: "End Date", type: "date", minWidth: 180, editable: true },
    { field: "conductorFirstName", headerName: "Conductor First Name", minWidth: 180, editable: true },
    { field: "conductorLastName", headerName: "Conductor Last Name", minWidth: 180, editable: true },
    { field: "soloistFirstName", headerName: "Soloist First Name", minWidth: 180, editable: true },
    { field: "soloistLastName", headerName: "Soloist Last Name", minWidth: 180, editable: true }
  ]],
  ["Services", [
    { field: "id", headerName: "ID", width: 90, editable: false },
    { field: "startTime", headerName: "Starts", type: "dateTime", minWidth: 180, editable: true },
    { field: "endTime", headerName: "Ends", type: "dateTime", minWidth: 180, editable: true },
    { field: "venueID", headerName: "Venue", minWidth: 180, editable: true },
    { field: "concertID", headerName: "Concert Cycle", minWidth: 180, editable: true },
    { field: "isRehearsal", headerName: "Rehearsal", type: "boolean", minWidth: 180, editable: true }
  ]],
  ["Pieces", [
    { field: "id", headerName: "ID", width: 90, editable: false },
    { field: "pieceTitle", headerName: "Title", minWidth: 180, editable: true },
    { field: "composerFirstName", headerName: "Composer First Name", minWidth: 180, editable: true },
    { field: "composerLastName", headerName: "Composer Last Name", minWidth: 180, editable: true },
    { field: "arrangerFirstName", headerName: "Arranger First Name", minWidth: 180, editable: true },
    { field: "arrangerLastName", headerName: "Arranger Last Name", minWidth: 180, editable: true },
    { field: "instrumentation", headerName: "Instrumentation", minWidth: 180, editable: true }
  ]],
  ["MusiciansInstruments", [
    { field: "id", headerName: "Row #", width: 100, editable: false, hidden: true },
    { field: "musicianID", headerName: "Musician", width: 100, editable: false },
    { field: "instrumentID", headerName: "Instrument", width: 100, editable: false }
  ]],
  ["MusiciansConcertCycles", [
    { field: "id", headerName: "Row #", width: 100, editable: false, hidden: true },
    { field: "musicianID", headerName: "Musician", width: 100, editable: false },
    { field: "concertID", headerName: "Concert Cycle", width: 100, editable: false }
  ]],
  ["PiecesConcertCycles", [
    { field: "id", headerName: "Row #", width: 100, editable: false, hidden: true },
    { field: "pieceID", headerName: "Piece", width: 100, editable: false },
    { field: "concertID", headerName: "Concert Cycle", width: 100, editable: false }
  ]]
]);

export default entityColumnMap;

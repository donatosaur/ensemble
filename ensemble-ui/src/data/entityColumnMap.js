const entityColumnMap = new Map([
  ["Musicians", [
    { field: "id", headerName: "ID", flex: 0, width: 90, editable: false },
    { field: "firstName", headerName: "First Name", flex: 1, minWidth: 180, editable: true },
    { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 180, editable: true },
    { field: "birthdate", headerName: "Date of Birth", type: "date", flex: 1, minWidth: 180, editable: true },
    { field: "email", headerName: "Email", flex: 1, minWidth: 180, editable: true },
    { field: "phoneNumber", headerName: "Phone", flex: 1, minWidth: 180, editable: true},
    { field: "street", headerName: "Street", flex: 1, minWidth: 180, editable: true },
    { field: "city", headerName: "City", flex: 1, minWidth: 180, editable: true },
    { field: "state", headerName: "State", flex: 1, minWidth: 90, editable: true },
    { field: "zip", headerName: "Zip", flex: 1, minWidth: 90, editable: true },
    { field: "inEnsemble", headerName: "Ensemble", type: "boolean", flex: 1, minWidth: 120, editable: true },
    { field: "active", headerName: "Active", type: "boolean", flex: 1, minWidth: 120, editable: true}
  ]],
  ["Instruments", [
    { field: "id", headerName: "ID", flex: 0, width: 90, editable: false },
    { field: "name", headerName: "Name", flex: 1, minWidth: 180, editable: true }
  ]],
  ["Venues", [
    { field: "id", headerName: "ID", flex: 0, width: 90, editable: false },
    { field: "capacity", headerName: "Capacity", type: "number", flex: 1, minWidth: 180, editable: true },
    { field: "name", headerName: "Name", flex: 1, minWidth: 180, editable: true },
    { field: "city", headerName: "City", flex: 1, minWidth: 180, editable: true },
    { field: "state", headerName: "State", flex: 1, minWidth: 180, editable: true },
    { field: "zip", headerName: "Zip", flex: 1, minWidth: 180, editable: true }
  ]],
  ["ConcertCycles", [
    { field: "id", headerName: "ID", flex: 0, width: 90, editable: false },
    { field: "concertTitle", headerName: "Concert Title", flex: 1, minWidth: 180, editable: true },
    { field: "startDate", headerName: "Start Date", type: "date", flex: 1, minWidth: 180, editable: true },
    { field: "endDate", headerName: "End Date", type: "date", flex: 1, minWidth: 180, editable: true },
    { field: "conductorFirstName", headerName: "Conductor First Name", flex: 1, minWidth: 180, editable: true },
    { field: "conductorLastName", headerName: "Conductor Last Name", flex: 1, minWidth: 180, editable: true },
    { field: "soloistFirstName", headerName: "Soloist First Name", flex: 1, minWidth: 180, editable: true },
    { field: "soloistLastName", headerName: "Soloist Last Name", flex: 1, minWidth: 180, editable: true }
  ]],
  ["Services", [
    { field: "id", headerName: "ID", flex: 0, width: 90, editable: false },
    { field: "startTime", headerName: "Starts", type: "dateTime", flex: 1, minWidth: 180, editable: true },
    { field: "endTime", headerName: "Ends", type: "dateTime", flex: 1, minWidth: 180, editable: true },
    { field: "venueID", headerName: "Venue", flex: 1, minWidth: 180, editable: true },
    { field: "concertID", headerName: "Concert Cycle", flex: 1, minWidth: 180, editable: true },
    { field: "isRehearsal", headerName: "Rehearsal", type: "boolean", flex: 1, minWidth: 180, editable: true }
  ]],
  ["Pieces", [
    { field: "id", headerName: "ID", flex: 0, width: 90, editable: false },
    { field: "pieceTitle", headerName: "Title", flex: 1, minWidth: 180, editable: true },
    { field: "composerFirstName", headerName: "Composer First Name", flex: 1, minWidth: 180, editable: true },
    { field: "composerLastName", headerName: "Composer Last Name", flex: 1, minWidth: 180, editable: true },
    { field: "arrangerFirstName", headerName: "Arranger First Name", flex: 1, minWidth: 180, editable: true },
    { field: "arrangerLastName", headerName: "Arranger Last Name", flex: 1, minWidth: 180, editable: true },
    { field: "instrumentation", headerName: "Instrumentation", flex: 1, minWidth: 180, editable: true }
  ]],
  ["MusiciansInstruments", [
    { field: "id", headerName: "Row #", flex: 0, width: 100, editable: false, hidden: true },
    { field: "musicianID", headerName: "Musician", flex: 1, width: 100, editable: false },
    { field: "instrumentID", headerName: "Instrument", flex: 1, width: 100, editable: false }
  ]],
  ["MusiciansConcertCycles", [
    { field: "id", headerName: "Row #", flex: 0, width: 100, editable: false, hidden: true },
    { field: "musicianID", headerName: "Musician", flex: 1, width: 100, editable: false },
    { field: "concertID", headerName: "Concert Cycle", flex: 1, width: 100, editable: false }
  ]],
  ["PiecesConcertCycles", [
    { field: "id", headerName: "Row #", flex: 0, width: 100, editable: false, hidden: true },
    { field: "pieceID", headerName: "Piece", flex: 1, width: 100, editable: false },
    { field: "concertID", headerName: "Concert Cycle", flex: 1, width: 100, editable: false }
  ]]
]);

export default entityColumnMap;

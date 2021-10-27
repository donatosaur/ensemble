const entityDemoDataMap = new Map([
   ["Musicians", [
    {
      id: 1,
      firstName: "Kinzo",
      lastName: "Ushiromiya",
      birthdate: new Date(1984, 1, 15),
      email: "test_email@test.com",
      phoneNumber: "(555) 867-5309",
      street: "1234 Main Street",
      city: "Nowhere",
      state: "KS",
      zip: '12345',
      inEnsemble: true,
      active: true
    },
    {
      id: 2,
      firstName: "Erika",
      lastName: "Furudo",
      birthdate: new Date(1986, 9, 4),
      email: "test_email@test.com",
      phoneNumber: "(555) 867-5309",
      street: "1234 Main Street",
      city: "Nowhere",
      state: "KS",
      zip: '12345',
      inEnsemble: true,
      active: true
    },
    {
      id: 3,
      firstName: "Featherine",
      lastName: "Augustus Aurora",
      birthdate: new Date(1992, 5, 8),
      email: "test_email@test.com",
      phoneNumber: "(555) 867-5309",
      street: "1234 Main Street",
      city: "Nowhere",
      state: "KS",
      zip: '12345',
      inEnsemble: false,
      active: false
    },
    {
      id: 4,
      firstName: "Willard",
      lastName: "Wright",
      birthdate: new Date(1992, 5, 8),
      email: "test_email@test.com",
      street: "1234 Main Street",
      city: "Nowhere",
      state: "KS",
      zip: '12345',
      inEnsemble: false,
      active: true
    },
    {
      id: 5,
      firstName: "Dlanor",
      lastName: "Knox",
      birthdate: new Date(1992, 5, 8),
      phoneNumber: "(555) 867-5309",
      street: "1234 Main Street",
      city: "Nowhere",
      state: "KS",
      zip: '12345',
      inEnsemble: false,
      active: true
    },
    {
      id: 6,
      firstName: "Lambda",
      lastName: "Delta",
      birthdate: new Date(1992, 5, 8),
      email: "test_email@test.com",
      street: "1234 Main Street",
      city: "Nowhere",
      state: "KS",
      zip: '12345',
      inEnsemble: false,
      active: true
    },
    {
      id: 7,
      firstName: "Lambda",
      lastName: "Delta",
      birthdate: new Date(1992, 5, 8),
      email: "test_email@test.com",
      street: "1234 Main Street",
      city: "Nowhere",
      state: "KS",
      zip: '12345',
      inEnsemble: true,
      active: true
    },
    {
      id: 8,
      firstName: "Publius",
      lastName: "Virgilia",
      birthdate: new Date(1992, 5, 8),
      email: "test_email@test.com",
      street: "1234 Main Street",
      city: "Nowhere",
      state: "KS",
      zip: '12345',
      inEnsemble: true,
      active: true
    },


   ]],
   ["Instruments", [
    //  { field: "id", headerName: "ID", flex: 0, width: 90, editable: false },
    //  { field: "name", headerName: "Name", flex: 1, minWidth: 180, editable: true }
   ]],
   ["Venues", [
    //  { field: "id", headerName: "ID", flex: 0, width: 90, editable: false },
    //  { field: "capacity", headerName: "Capacity", type: "number", flex: 1, minWidth: 180, editable: true },
    //  { field: "name", headerName: "Name", flex: 1, minWidth: 180, editable: true },
    //  { field: "city", headerName: "City", flex: 1, minWidth: 180, editable: true },
    //  { field: "state", headerName: "State", flex: 1, minWidth: 180, editable: true },
    //  { field: "zip", headerName: "Zip", flex: 1, minWidth: 180, editable: true }
   ]],
   ["ConcertCycles", [
    {
       id: 1,
       concertTitle: "Concert 1",
       startDate: "YYYY-MM-DD",
       endDate: "YYYY-MM-DD",
       conductorFirstName: "Name",
       conductorLastName: "Name",
       soloistFirstName: "Name",
       soloistLastName: "Name"
     },
     {
       id: 2,
       concertTitle: "Concert 2",
       startDate: "YYYY-MM-DD",
       endDate: "YYYY-MM-DD",
       conductorFirstName: "Name",
       conductorLastName: "Name",
       soloistFirstName: "Name",
       soloistLastName: "Name"
     },
     {
       id: 4,
       concertTitle: "Concert 4",
       startDate: "YYYY-MM-DD",
       endDate: "YYYY-MM-DD",
       conductorFirstName: "Name",
       conductorLastName: "Name",
       soloistFirstName: "Name",
       soloistLastName: "Name"
     },
     {
       id: 5,
       concertTitle: "Concert 5",
       startDate: "YYYY-MM-DD",
       endDate: "YYYY-MM-DD",
       conductorFirstName: "Name",
       conductorLastName: "Name",
       soloistFirstName: "Name",
       soloistLastName: "Name"
     },
     {
      id: 30,
      concertTitle: "Concert 3",
      startDate: "YYYY-MM-DD",
      endDate: "YYYY-MM-DD",
      conductorFirstName: "Name",
      conductorLastName: "Name",
      soloistFirstName: "Name",
      soloistLastName: "Name"
    }
   ]],
   ["Services", [
    //  { field: "id", headerName: "ID", flex: 0, width: 90, editable: false },
    //  { field: "startTime", headerName: "Starts", type: "dateTime", flex: 1, minWidth: 180, editable: true },
    //  { field: "endTime", headerName: "Ends", type: "dateTime", flex: 1, minWidth: 180, editable: true },
    //  { field: "venueID", headerName: "Venue", flex: 1, minWidth: 180, editable: true },
    //  { field: "concertID", headerName: "Concert Cycle", flex: 1, minWidth: 180, editable: true },
    //  { field: "isRehearsal", headerName: "Rehearsal", type: "boolean", flex: 1, minWidth: 180, editable: true }
   ]],
   ["Pieces", [
    //  { field: "id", headerName: "ID", flex: 0, width: 90, editable: false },
    //  { field: "pieceTitle", headerName: "Title", flex: 1, minWidth: 180, editable: true },
    //  { field: "composerFirstName", headerName: "Composer First Name", flex: 1, minWidth: 180, editable: true },
    //  { field: "composerLastName", headerName: "Composer Last Name", flex: 1, minWidth: 180, editable: true },
    //  { field: "arrangerFirstName", headerName: "Arranger First Name", flex: 1, minWidth: 180, editable: true },
    //  { field: "arrangerLastName", headerName: "Arranger Last Name", flex: 1, minWidth: 180, editable: true },
    //  { field: "instrumentation", headerName: "Instrumentation", flex: 1, minWidth: 180, editable: true }
   ]],


   ["MusiciansInstruments", [

   ]],
   ["MusiciansConcertCycles", [

   ]],
   ["PiecesConcertCycles", [

   ]]
  ]);
  
  export default entityDemoDataMap;
  
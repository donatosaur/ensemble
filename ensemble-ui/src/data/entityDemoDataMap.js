const entityDemoDataMap = new Map([
   ["Musicians", [
    {
      id: 1,
      firstName: "Kinzo",
      lastName: "Ushiromiya",
      birthdate: "1984-01-15",
      email: "test_email@test.com",
      phoneNumber: 5558675309,
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
      birthdate: "1986-10-04",
      email: "test_email@test.com",
      phoneNumber: 5558675309,
      street: "1234 Main Street",
      city: "Nowhere",
      state: "KS",
      zip: 1205,
      inEnsemble: true,
      active: true
    },
    {
      id: 3,
      firstName: "Featherine",
      lastName: "Augustus Aurora",
      birthdate: "1992-06-08",
      email: "test_email@test.com",
      phoneNumber: 5558675309,
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
      birthdate: "1970-06-08",
      email: "test_email@test.com",
      phoneNumber: "",
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
      birthdate: "1990-12-08",
      email: "",
      phoneNumber: 5558675309,
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
      birthdate: "1990-12-08",
      email: "test_email@test.com",
      phoneNumber: "",
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
      birthdate: "1990-12-08",
      email: "test_email@test.com",
      phoneNumber: "",
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
      birthdate: "1990-12-08",
      email: "test_email@test.com",
      phoneNumber: "",
      street: "1234 Main Street",
      city: "Nowhere",
      state: "KS",
      zip: '12345',
      inEnsemble: true,
      active: true
    },
   ]],
   ["Instruments", [
     { id: 1,   name: "Piano" },
     { id: 2,   name: "Harpsichord" },
     { id: 3,   name: "Clavichord" },
     { id: 4,   name: "Violin" },
     { id: 5,   name: "Guitar" },
     { id: 16,  name: "Flute" },
     { id: 17,  name: "Harp" },
     { id: 18,  name: "Cello" },
     { id: 19,  name: "Sitar" },
     { id: 20,  name: "Ocarina" },
     { id: 21,  name: "Hurdy-gurdy"},
     { id: 22,  name: "Hammond"},
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
       concertTitle: "New Year's Concert",
       startDate: "2021-12-30",
       endDate: "2022-01-02",
       conductorFirstName: "Emma",
       conductorLastName: "Millstein",
       soloistFirstName: "Vita",
       soloistLastName: "Clotilde"
     },
     {
       id: 2,
       concertTitle: "Soaring with the Wind",
       startDate: "2022-01-18)",
       endDate: "2022-01-25",
       conductorFirstName: "Estelle",
       conductorLastName: "Bright",
       soloistFirstName: "Tita",
       soloistLastName: "Russell"
     },
     {
       id: 4,
       concertTitle: "Journey to Arteria",
       startDate:"2022-05-18",
       endDate: "2022-06-25",
       conductorFirstName: "Kevin",
       conductorLastName: "Graham",
       soloistFirstName: "",
       soloistLastName: ""
     },
     {
       id: 18,
       concertTitle: "Bardic Masterpieces",
       startDate: "2022-04-18",
       endDate: "2022-07-25",
       conductorFirstName: "Olivier",
       conductorLastName: "Lenheim",
       soloistFirstName: "",
       soloistLastName: ""
     }
   ]],
   ["Services", [
     {
       id: 1,
       serviceID: "Bardic Masterpieces Service 1",
       startTime: "2022-04-18 11:00:00",
       endTime: "2022-04-18 23:00:00",
       venueID: "",
       concertID: 18,
       isRehearsal: false
     }
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
     { id: 1,   musicianID: 1,   instrumentID: 21},
     { id: 2,   musicianID: 2,   instrumentID: 16},
     { id: 3,   musicianID: 3,   instrumentID: 3},
     { id: 4,   musicianID: 4,   instrumentID: 1},
     { id: 5,   musicianID: 5,   instrumentID: 1},
     { id: 6,   musicianID: 6,   instrumentID: 1},
     { id: 7,   musicianID: 7,   instrumentID: 2},
     { id: 8,   musicianID: 8,   instrumentID: 5},
     { id: 9,   musicianID: 1,   instrumentID: 1},
     { id: 10,  musicianID: 1,   instrumentID: 2},
     { id: 11,  musicianID: 1,   instrumentID: 22},
   ]],
   ["MusiciansConcertCycles", [

   ]],
   ["PiecesConcertCycles", [

   ]]
  ]);
  
  export default entityDemoDataMap;
  
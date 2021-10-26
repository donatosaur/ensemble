const entityDescriptions = [
    {Musicians: "records the details and contact records of all musicians contracted for service by the orchestra"},
    {Instruments: "records the instruments that may be played by musicians in the orchestra"},
    {Venues: "records the details of venues where the orchestra may perform"},
    {ConcertCycles: "records the details of a group (cycle) of concerts"},
    {Services: "records the details of specific services (i.e., performances) made by the orchestra"},
    {Pieces: "records details about the musical pieces that are performed by the orchestra during concert cycles"},
    {MusiciansInstruments: "an intersection table that implements M:M relationships between Musicians and Instruments"},
    {MusiciansConcertCycles: "an intersection table that implements M:M relationships between Musicians and ConcertCycles"},
    {PiecesConcertCycles: "an intersection table that implements M:M relationships between Pieces and ConcertCycles"}
]

export default entityDescriptions;
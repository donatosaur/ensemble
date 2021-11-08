-- ------------------------------------ Musicians -----------------------------------
-- CREATE
INSERT INTO musicians (
    firstName,
    lastName,
    birthdate,
    email,
    phoneNumber,
    street,
    city,
    state,
    zip,
    inEnsemble,
    active
)
VALUES (
    :firstName,
    :lastName,
    :birthdate,
    :email,
    :phoneNumber,
    :street,
    :city,
    :state,
    :zip,
    :inEnsemble,
    :active
);

-- SELECT (all)
SELECT * FROM musicians;


-- SELECT (filtered)


-- UPDATE


-- DELETE



-- ----------------------------------- Instruments -----------------------------------
-- CREATE
INSERT INTO instruments (name)
VALUE (:name);


-- SELECT
SELECT * FROM instruments;

-- UPDATE


-- DELETE


-- ------------------------------------- Venues --------------------------------------
-- CREATE
INSERT INTO venues (capacity, name, street, city, state, zip)
VALUES (:capacity, :name, :street, :city, :state, :zip);


-- SELECT
SELECT * from venues;


-- UPDATE


-- DELETE


-- ---------------------------------- ConcertCycles ----------------------------------
-- CREATE
INSERT INTO concert_cycles (
    concertTitle,
    startDate,
    endDate,
    conductorFirstName,
    conductorLastName,
    soloistFirstName,
    soloistLastName
)
VALUES (
    :concertTitle,
    :startDate,
    :endDate,
    :conductorFirstName,
    :conductorLastName,
    :soloistFirstName,
    :soloistLastName
);


-- SELECT
SELECT * FROM concert_cycles;


-- UPDATE


-- DELETE


-- ------------------------------------- Services ------------------------------------
-- CREATE
INSERT INTO services (startTime, endTime, isRehearsal, venueID, concertID)
VALUES (:startTime, :endTime, :isRehearsal, :venueID, :concertID);


-- SELECT
SELECT * FROM services;


-- UPDATE


-- DELETE


-- -------------------------------------- Pieces -------------------------------------
-- CREATE
INSERT INTO pieces (
    pieceTitle,
    composerFirstName,
    composerLastName,
    arrangerFirstName,
    arrangerLastName,
    instrumentation
)
VALUES (
    :pieceTitle,
    :composerFirstName,
    :composerLastName,
    :arrangerFirstName,
    :arrangerLastName,
    :instrumentation
);


-- SELECT
SELECT * FROM pieces;


-- UPDATE


-- DELETE


-- ------------------------------ MusiciansInstruments -------------------------------
-- CREATE
INSERT INTO musicians_instruments (musicianID, instrumentID)
VALUES (:musicianID, :instrumentID);


-- SELECT
SELECT * FROM musicians_instruments;


-- UPDATE


-- DELETE


-- ------------------------------ MusiciansConcertCycles ------------------------------
-- CREATE
INSERT INTO musicians_concert_cycles (musicianID, concertID)
VALUES (:musicianID, :concertID);

-- SELECT
SELECT * FROM musicians_concert_cycles;


-- UPDATE


-- DELETE


-- ------------------------------- PiecesConcertCycles --------------------------------
-- CREATE
INSERT INTO pieces_concert_cycles (pieceID, concertID)
VALUES (:pieceID, :concertID);


-- SELECT
SELECT * FROM pieces_concert_cycles;


-- UPDATE


-- DELETE

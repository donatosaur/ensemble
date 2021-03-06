-- CS-340 Project Step 4
-- Group 42: Team Mango - Fahad Awan, Donato Quartuccia
-- Last Modified: 2021-11-27
-- NOTE: A colon (:) denotes a variable that represents data from the backend

-- ------------------------------------ Musicians -----------------------------------
-- CREATE
INSERT INTO Musicians (
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
SELECT * FROM Musicians;


-- SELECT (filtered)
SELECT * FROM Musicians WHERE firstName LIKE :firstName;
SELECT * FROM Musicians WHERE lastName LIKE :lastName;
SELECT * FROM Musicians WHERE birthdate = :birthdate;
SELECT * FROM Musicians WHERE email LIKE :email;
SELECT * FROM Musicians WHERE phoneNumber LIKE :phoneNumber;
SELECT * FROM Musicians WHERE street LIKE :street;
SELECT * FROM Musicians WHERE city LIKE :city;
SELECT * FROM Musicians WHERE state LIKE :state;
SELECT * FROM Musicians WHERE zip LIKE :zip;
SELECT * FROM Musicians WHERE inEnsemble = :inEnsemble;
SELECT * FROM Musicians WHERE active = :active;


-- UPDATE
UPDATE Musicians
SET firstName = :firstName,
    lastName = :lastName,
    birthdate = :birthdate,
    email = :email,
    phoneNumber = :phoneNumber,
    street = :street,
    city = :city,
    state = :state,
    zip = :zip,
    inEnsemble = :inEnsemble,
    active =:active
WHERE id = :id;


-- DELETE
DELETE FROM Musicians WHERE id = :id;


-- ----------------------------------- Instruments -----------------------------------
-- CREATE
INSERT INTO Instruments (name)
VALUE (:name);


-- SELECT
SELECT * FROM Instruments;

-- UPDATE
UPDATE Instruments
SET name = :name
WHERE id = :id;

-- DELETE
DELETE FROM Instruments WHERE id = :id;


-- ------------------------------------- Venues --------------------------------------
-- CREATE
INSERT INTO Venues (capacity, name, street, city, state, zip)
VALUES (:capacity, :name, :street, :city, :state, :zip);


-- SELECT
SELECT * from Venues;


-- UPDATE
UPDATE Venues
SET capacity = :capacity,
    name = :name,
    street = :street,
    city = :city,
    state = :state,
    zip = :zip
WHERE id = :id;


-- DELETE
DELETE FROM Venues WHERE id = :id;


-- ---------------------------------- ConcertCycles ----------------------------------
-- CREATE
INSERT INTO ConcertCycles (
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
SELECT * FROM ConcertCycles;


-- UPDATE
UPDATE ConcertCycles
SET concertTitle = :concertTitle,
    startDate = :startDate,
    endDate = :endDate,
    conductorFirstName = :conductorFirstName,
    conductorLastName = :conductorLastName,
    soloistFirstName = :soloistFirstName,
    soloistLastName = :soloistLastName
WHERE id = :id;

-- DELETE
DELETE FROM ConcertCycles WHERE id = :id;



-- ------------------------------------- Services ------------------------------------
-- CREATE
INSERT INTO Services (startTime, endTime, isRehearsal, venueID, concertID)
VALUES (:startTime, :endTime, :isRehearsal, :venueID, :concertID);


-- SELECT
SELECT * FROM Services;


-- UPDATE
UPDATE Services
SET startTime = :startTime,
    endTime = :endTime,
    isRehearsal = :isRehearsal,
    venueID = :venueID,
    concertID = :concertID
WHERE id = :id;


-- DELETE
DELETE FROM Services WHERE id = :id;

-- -------------------------------------- Pieces -------------------------------------
-- CREATE
INSERT INTO Pieces (
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
SELECT * FROM Pieces;


-- UPDATE
UPDATE Pieces
SET pieceTitle = :pieceTitle,
    composerFirstName = :composerFirstName,
    composerLastName = :composerLastName,
    arrangerFirstName = :arrangerFirstName,
    arrangerLastName = :arrangerLastName,
    instrumentation = :instrumentation
WHERE id = :id;


-- DELETE
DELETE FROM Pieces WHERE id = :id;


-- ------------------------------ MusiciansInstruments -------------------------------
-- CREATE
INSERT INTO MusiciansInstruments (musicianID, instrumentID)
VALUES (:musicianID, :instrumentID);


-- SELECT
SELECT * FROM MusiciansInstruments;


-- UPDATE is disallowed on this entity: delete then create instead


-- DELETE
DELETE FROM MusiciansInstruments WHERE musicianID = :musicianID AND instrumentID = :instrumentID;


-- ------------------------------ MusiciansConcertCycles ------------------------------
-- CREATE
INSERT INTO MusiciansConcertCycles (musicianID, concertID)
VALUES (:musicianID, :concertID);

-- SELECT
SELECT * FROM MusiciansConcertCycles;


-- UPDATE is disallowed on this entity: delete then create instead


-- DELETE
DELETE FROM MusiciansConcertCycles WHERE musicianID = :musicianID AND concertID = :concertID;


-- ------------------------------- PiecesConcertCycles --------------------------------
-- CREATE
INSERT INTO PiecesConcertCycles (pieceID, concertID)
VALUES (:pieceID, :concertID);


-- SELECT
SELECT * FROM PiecesConcertCycles;


-- UPDATE is disallowed on this entity: delete then create instead


-- DELETE
DELETE FROM PiecesConcertCycles WHERE pieceID = :pieceID AND concertID = :concertID;


-- ------------------------------- INTERSECTION TABLE QUERIES --------------------------------
-- These are JOIN queries to display intersection table data in a more user-friendly format.
-- For an explanation on what CONCAT_WS does, see https://mariadb.com/kb/en/concat_ws/

-- MusiciansInstruments
SELECT Musicians.id AS musicianID,
       CONCAT_WS(' ', Musicians.firstName, Musicians.lastName) AS musician,
       Instruments.id AS instrumentID,
       Instruments.name AS instrument
FROM Musicians
INNER JOIN MusiciansInstruments ON Musicians.id = MusiciansInstruments.musicianID
INNER JOIN Instruments ON MusiciansInstruments.instrumentID = Instruments.id;


-- MusiciansConcertCycles
SELECT Musicians.id AS musicianID,
       CONCAT_WS(' ', Musicians.firstName, Musicians.lastName) AS musician,
       ConcertCycles.id AS concertID,
       ConcertCycles.concertTitle AS concertCycle
FROM Musicians
INNER JOIN MusiciansConcertCycles ON Musicians.id = MusiciansConcertCycles.musicianID
INNER JOIN ConcertCycles ON ConcertCycles.id = MusiciansConcertCycles.concertID;


-- PiecesConcertCycles
SELECT Pieces.id AS pieceID,
       Pieces.pieceTitle AS piece,
       ConcertCycles.id AS concertID,
       ConcertCycles.concertTitle AS concertCycle
FROM Pieces
INNER JOIN PiecesConcertCycles ON Pieces.id = PiecesConcertCycles.pieceID
INNER JOIN ConcertCycles ON ConcertCycles.id = PiecesConcertCycles.concertID;


-- This one is not currently in use; it's for a future implementation (it would show the instruments a
-- musician may be playing during a concert cycle in addition to the MusiciansConcertCycles relationship)
SELECT Musicians.id as musicianID,
       CONCAT_WS(' ', Musicians.firstName, Musicians.lastName) AS musician,
       Instruments.name AS instrument,
       ConcertCycles.concertTitle AS concertCycle
FROM Musicians
INNER JOIN MusiciansConcertCycles ON Musicians.id = MusiciansConcertCycles.musicianID
INNER JOIN Instruments ON Musicians.id = Instruments.id
INNER JOIN ConcertCycles ON ConcertCycles.id = MusiciansConcertCycles.concertID;

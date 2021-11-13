import express from "express";
import db from "../database/db_connector.mjs";

let venues = express.Router();

/**
 * CREATE  POST    /api/Venues
 * READ    GET     /api/Venues
 * UPDATE  PUT     /api/Venues?venueID=...
 * DELETE  DELETE  /api/Venues?venueID=...
 */

// CREATE
venues.post("/", async function (req, res) {
  // request parameter
  const queryObj = req.body;
  // Execute query async
  try {
    const createQuery =
      "INSERT INTO Venues (capacity, name, street, city, state, zip) VALUES (?, ?, ?, ?, ?, ?);";
    const fields=Object.values(queryObj)

    await db.execute(createQuery, fields);
    let [results, rows] = await db.query("SELECT * FROM Venues");
    res.send(results);

    // Log error if table doesn't exist, connection problem, etc
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Error: "Request failed",
    });
  }
});

// READ
venues.get("/", (req, res) => {
  db.query(`SELECT * FROM Venues;`, (error, rows) => {
    if (error) {
      // we should only get an error here if something's wrong with the database connection
      console.log(error);
      res.status(500).json({ error: error });
    } else {
      res.status(200).json({ status: "ok", data: rows });
    }
  });
});

// UPDATE
venues.put("/:id", async function (req, res) {
  // request parameter
  const queryObj = req.body;
  // Execute query async
  try {
    const updateQuery ="UPDATE Venues SET capacity = ?, name = ?, street = ?, city = ?, state = ?, zip = ? WHERE venueID = ?;"

    const fields = [
      queryObj.capacity,
      queryObj.name,
      queryObj.street,
      queryObj.city,
      queryObj.state,
      queryObj.zip,
      req.params.id,
    ];

    await db.execute(updateQuery, fields);
    let [results, rows] = await db.query("SELECT * FROM Venues");
    res.send(results);
    // Log error if table doesn't exist, connection problem, etc
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Error: "Request failed",
    });
  }
});

venues.delete("/:id", async function (req, res) {
  // request parameter
  // Execute query async
  try {
    // Define query
    const createQuery = "DELETE FROM Venues WHERE venueID = ?;";
    await db.execute(createQuery, [req.params.id]);
    let [results, rows] = await db.query("SELECT * FROM Venues");
    res.send(results);
    // Log error if table doesn't exist, connection problem, etc
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Error: "Request failed",
    });
  }
});

export default venues;

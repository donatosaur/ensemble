import express from "express";
import db from "../database/db_connector.mjs";

let venues = express.Router();

// POST /api/Venues/ (create)
// GET /api/Venues/ (get all)
// PUT /api/Venues/:id (update)
// DELETE /api/Venues/:id (delete)

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

// READ is universal for all entities (located in app.mjs)

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

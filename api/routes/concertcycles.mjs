venues.put("/:id", async function (req, res) {
    // request parameter
    const queryObj = req.body;
    // Execute query async
    try {
      const updateQuery =
        "UPDATE ConcertCycles SET concertTitle = ?, startDate = ?, endDate = ?, conductorFirstName = ?, conductorLastName = ?, soloistFirstName = ?, soloistLastName = ? WHERE concertID = ?;";
  
      const fields = [
        queryObj.concertTitle,
        queryObj.startDate,
        queryObj.endDate,
        queryObj.conductorFirstName,
        queryObj.conductorLastName,
        queryObj.soloistFirstName,
        queryObj.soloistLastName,
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
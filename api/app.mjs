import express from "express";
import path from "path";
import "dotenv/config";

import registerEventHandlers from "./event-handlers.mjs";

// middleware
import loggingMiddleware from "./logger.mjs";
import { sqlErrorHandler } from "./error-handlers.mjs";

// endpoints
import musicians from "./routes/musicians.mjs";
import instruments from "./routes/instruments.mjs";
import venues from "./routes/venues.mjs";
import concertCycles from "./routes/concertCycles.mjs";
import services from "./routes/services.mjs";
import pieces from "./routes/pieces.mjs";
import musiciansInstruments from "./routes/musiciansInstruments.mjs";
import musiciansConcertCycles from "./routes/musiciansConcertCycles.mjs";
import piecesConcertCycles from "./routes/piecesConcertCycles.mjs";

const PORT = process.env.PORT || 3332;
const STATIC_CONTENT_DIR = "./public";

registerEventHandlers();

const app = express();

process.on('SIGINT')

// log responses
app.use(loggingMiddleware);

// treat empty strings as null
app.use(
  express.json({
      reviver: (key, value) => (value === "" ? null : value),
  })
);

// attach table endpoint routes
app.use("/api/Musicians", musicians);
app.use("/api/Instruments", instruments);
app.use("/api/Venues", venues);
app.use("/api/ConcertCycles", concertCycles);
app.use("/api/Services", services);
app.use("/api/Pieces", pieces);
app.use("/api/MusiciansInstruments", musiciansInstruments);
app.use("/api/MusiciansConcertCycles", musiciansConcertCycles);
app.use("/api/PiecesConcertCycles", piecesConcertCycles);

// serve react frontend
app.use(express.static(STATIC_CONTENT_DIR));
app.get("/*", function (req, res) {
  res.sendFile(path.resolve(STATIC_CONTENT_DIR, "index.html"));
});

app.use(sqlErrorHandler);

app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}. Press Ctrl + C to terminate.`);
});

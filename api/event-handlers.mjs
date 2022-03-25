import pool from "./database/db_connector.mjs";

export default function registerEventHandlers() {
  process.on("SIGTERM", cleanup);
  process.on("SIGINT", cleanup);
}

function cleanup() {
  console.log("Terminating server...");
  pool.end();
}

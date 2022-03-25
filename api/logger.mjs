import path from "path";
import fs from "fs";
import morgan from "morgan";
import chalk from "chalk";

// set directory for log file
const LOG_DIR = "./logs";
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR);

// set the log output file
const logFileStream = fs.createWriteStream(
  path.resolve(LOG_DIR, "responses.log"),
  { flags: "a" }
);

const morganConfig = (tokens, req, res) => {
  try {
    // PUT -> yellow; POST -> red; GET, DELETE, HEAD, OPTIONS -> green
    const requestColor = req.method === "PUT" ? "#EAEA1A" : req.method === "POST" ? "#EA461A" : "#19EA20";

    // color scheme adapted from Param Singh's post: https://github.com/expressjs/morgan/issues/53#issuecomment-393182002
    return [
      chalk.green(`${tokens["total-time"](req, res)?.padStart(8, " ")} ms`),    // total time (####.### is 8 chars)
      chalk.redBright(`@ ${tokens.date(req, res)}`),                            // date
      chalk.hex(requestColor)(tokens.method(req, res)),                         // method
      chalk.hex("#FCBA03")(tokens.status(req, res)),                            // status
      chalk.hex("#FF4040")(tokens.url(req, res)),                               // url
      chalk.hex("#FFDD00")(`from ${tokens["referrer"](req, res)}`),             // referrer url
      chalk.yellow(tokens["remote-addr"](req, res)),                            // ip
      chalk.blueBright(tokens["user-agent"](req, res)),                         // agent (browser, OS)
    ].join(" ");
  } catch (error) {
    // if something goes wrong, log it and just fall back to morgan's defaults (by not returning anything)
    console.error(error);
  }
};

// log requests for endpoints, but skip file requests
const loggingMiddleware = morgan(morganConfig, {
  skip: (req) => req.url?.includes("."),
  stream: logFileStream,
});

export default loggingMiddleware;

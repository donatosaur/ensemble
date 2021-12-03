import path from "path";
import fs from "fs";
import morgan from "morgan";
import chalk from "chalk";

// set directory for log file
const LOG_DIR = "./logs";

// create the directory if it doesn't exist
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR);

// set the log output file
const logFileStream = fs.createWriteStream(
  path.resolve(LOG_DIR, "responses.log"),
  { flags: "a" }
);

const morganConfig = (tokens, req, res) => {
  try {
    // color requests by CRUD type (PUT -> yellow, POST -> red, GET -> green, DELETE -> green)
    const requestColor = req.method === "PUT" ? "#EAEA1A" : req.method === "POST" ? "#EA461A" : "#1AEA20";

    /**
     * Customize the morgan logger by adding color to it. Using a slightly modified version of Morgan's dev
     * format (see https://www.npmjs.com/package/morgan) helps line up the log output nicely. Specifically,
     * our output is `date, request method, url, response status, time taken, ip address, user agent` which
     * 
     * For chalk colors, see https://www.npmjs.com/package/chalk
     * For the token formatting, see "using a custom format function" at https://github.com/expressjs/morgan#readme
     * For padding, our longest endpoint is /api/MusiciansConcertCycles which is 28 characters long
     * 
     * **NOTE** the color scheme was adapted from the following github issue post made by Param Singh (source url 
     * https://github.com/expressjs/morgan/issues/53#issuecomment-393182002) but with several color choices replaced
     * to remain as close to standard ANSI terminal output colors as possible.
     */
    return [
      chalk.redBright.bold(tokens.date(req, res)),                                    // date
      chalk.hex(requestColor).bold(tokens.method(req, res)),                          // method
      chalk.hex("#F74542").bold(tokens.url(req, res)?.toString().padEnd(28, " ")),    // url
      chalk.yellowBright.bold(tokens.status(req, res)),                               // status
      chalk.green.bold(`${tokens["response-time"](req, res)} ms`),                    // response time
      chalk.yellow.bold(tokens["remote-addr"](req, res)),                             // remote ip
      chalk.blue(tokens["user-agent"](req, res)),                                     // user agent
    ].join(" ");
  } catch (error) {
    // if something goes wrong, log it and just fall back to morgan's defaults (by not returning anything)
    console.error(error);
  }
};

/**
 * Create morgan logging middleware. We only want to log requests for an actual endpoint on the server, and not
 * for any files (JS, fonts, css, images etc). Our endpoints don't have a dot in them, but file extensions always
 * will, so we can accomplish this by simply checking for a dot character in the request url.
 */

const loggingMiddleware = morgan(morganConfig, {
  skip: (req) => req.url?.includes("."),
  stream: logFileStream,
});

export default loggingMiddleware;

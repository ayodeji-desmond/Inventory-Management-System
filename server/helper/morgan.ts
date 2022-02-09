import express from "express";
import morgan, { StreamOptions } from "morgan";
import {logger} from "./logger";
import moment from 'moment';
// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
  // Use the http severity
  write: (message) => logger.http(message),
};

morgan.token('ip', (request: express.Request, response: express.Response) => request.ip);
morgan.token('timestamp', ()=> moment().format());
// Build the morgan middleware
const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms :ip :timestamp",
  { stream }
);

export default morganMiddleware;

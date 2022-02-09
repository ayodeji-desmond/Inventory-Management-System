import express, { json, urlencoded, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import { logger } from "./helper";
import { NotFoundError, ApiError, InternalError } from "./helper/ApiError";
import morganMiddleware from "./helper/morgan";

import dotenv from 'dotenv';
//import appPath from "app-root-path";
//dotenv.config({ path: `${appPath}/.env` });


import path from'path';
dotenv.config({
    path: path.join(__dirname, '../../../.env'),
});

const PORT = Number(process.env.PORT) || 6000;
const app = express();

// run cron job

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morganMiddleware);

app.use((err:any, req: Request, res: Response, next: NextFunction) => {
    logger.error(
        `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );

    res.status(500).send("server error, this will be resolved shortly!");

    next();
});

app.get("/", (request, response) => {
    response.status(200).send("Welcome to Vendease Inventory Management Backend");
});

app.use("/api/v1", routes);

app.use("*", (request, response) => {
    response.status(404).send("Not Found");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        ApiError.handle(err, res);
    } else {
    if (process.env.NODE_ENV === 'development') {
        logger.error(err);
        return res.status(500).send(err.message);
    }
    ApiError.handle(new InternalError(), res);
}
});

app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));

export default app;
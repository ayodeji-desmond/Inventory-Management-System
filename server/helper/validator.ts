import Joi from '@hapi/joi';
import {logger} from './logger';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from './ApiError';

export enum ValidationSource {
    BODY = 'body',
    HEADER = 'headers',
    QUERY = 'query',
    PARAM = 'params',
}


export default (schema: Joi.ObjectSchema, source: ValidationSource = ValidationSource.BODY) => (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
        const { error } = schema.validate(req[source]);

        if (!error) return next();

        const { details } = error;
        const message = details.map((i) => i.message.replace(/['"]+/g, '')).join(',');
        logger.error(message);
        let errorObj = new BadRequestError(message);
        //res.json(new BadRequestError(message));
        next(errorObj);
    } catch (error) {
        next(error);
    }
};
  
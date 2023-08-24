import { Schema, ValidationOptions } from 'joi';
import { NextFunction, Request, Response } from 'express';
export declare function validateDto({ source, schema, validateOptions, replaceSource }: {
    source: 'body' | 'params' | 'query';
    schema: Schema;
    validateOptions?: ValidationOptions;
    replaceSource?: boolean;
}): (req: Request, res: Response, next: NextFunction) => void;
export declare const validateBody: (schema: Schema, validateOptions?: ValidationOptions) => (req: Request, res: Response, next: NextFunction) => void;
export declare const validateParams: (schema: Schema) => (req: Request, res: Response, next: NextFunction) => void;
export declare const validateQuery: (schema: Schema) => (req: Request, res: Response, next: NextFunction) => void;

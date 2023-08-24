import { ObjectSchema, ValidationOptions } from 'joi';
export declare const validateSchema: <T>({ schema, payload, validationOptions, replaceSource }: {
    schema: ObjectSchema;
    payload: T;
    validationOptions?: ValidationOptions | undefined;
    replaceSource?: boolean | undefined;
}) => T;

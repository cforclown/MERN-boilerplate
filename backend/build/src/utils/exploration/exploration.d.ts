import Joi from 'joi';
import { IPaginationPayload, IPaginationResponse } from './pagination';
export interface IExplorationPayload {
    query?: string;
    pagination: IPaginationPayload;
}
export interface IExplorationResponse<T> {
    data: T;
    exploration: IExplorationPayload & {
        pagination: IPaginationResponse;
    };
}
export declare const ExplorationDto: Joi.ObjectSchema<any>;
export declare const ExplorationSwaggerSchemas: {
    explorationPayload: {
        query: {
            type: string;
        };
        pagination: {
            paginationPayload: {
                page: {
                    type: string;
                    required: boolean;
                };
                limit: {
                    type: string;
                    required: boolean;
                };
                sort: {
                    type: string;
                    properties: {
                        by: {
                            type: string;
                            required: boolean;
                        };
                        order: {
                            type: string;
                            enum: number[];
                            required: boolean;
                        };
                    };
                };
            };
        };
    };
};

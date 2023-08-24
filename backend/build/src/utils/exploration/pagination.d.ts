import Joi from 'joi';
export declare enum IPaginationSortOrders {
    ASC = -1,
    DESC = 1
}
export interface IPaginationSort {
    by: string;
    order?: IPaginationSortOrders;
}
export interface IPaginationPayload {
    page: number;
    limit: number;
    sort: IPaginationSort;
}
export interface IPaginationResponse extends IPaginationPayload {
    pageCount: number;
}
export declare const PaginationDto: Joi.ObjectSchema<any>;
export declare const PaginationPayloadSwaggerSchemas: {
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

declare const _default: {
    definition: {
        openapi: string;
        info: {
            title: string;
            version: string;
            description: string;
            contact: {
                name: string;
                url: string;
                email: string;
            };
        };
        consumes: string[];
        produces: string[];
        schemes: string[];
        components: {
            schemas: {
                createSchedule: {
                    type: string;
                    properties: {
                        name: {
                            type: string;
                            required: boolean;
                        };
                        start: {
                            type: string;
                            required: boolean;
                        };
                        end: {
                            type: string;
                        };
                        desc: {
                            type: string;
                        };
                    };
                };
                updateSchedule: {
                    type: string;
                    properties: {
                        _id: {
                            type: string;
                        };
                        name: {
                            type: string;
                        };
                        start: {
                            type: string;
                        };
                        end: {
                            type: string;
                        };
                        desc: {
                            type: string;
                        };
                    };
                };
            } & {
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
        };
    };
    apis: string[];
};
export default _default;

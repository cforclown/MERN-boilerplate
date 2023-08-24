export declare const SchedulesSwaggerSchemas: {
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
};

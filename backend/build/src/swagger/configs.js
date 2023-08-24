"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = __importDefault(require("./schemas"));
exports.default = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API',
            version: '1.0.0',
            description: 'API Documentation',
            contact: {
                name: 'Hafis Alrizal',
                url: 'https://hafisalrizal.com',
                email: 'hafisalrizal@gmail.com'
            }
        },
        consumes: ['application/json'],
        produces: ['application/json'],
        schemes: ['http', 'https'],
        components: {
            schemas: schemas_1.default
        }
    },
    apis: ['./src/resources/**/*.ts']
};
//# sourceMappingURL=configs.js.map
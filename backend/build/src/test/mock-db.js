"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
class MockDB {
    constructor() {
        this.mongod = null;
    }
    async connect() {
        this.mongod = await mongodb_memory_server_1.MongoMemoryServer.create();
        const uri = this.mongod.getUri();
        await mongoose_1.default.connect(uri, { dbName: 'mock-db-name' });
    }
    async close() {
        await mongoose_1.default.connection.dropDatabase();
        await mongoose_1.default.connection.close();
        await this.mongod?.stop();
    }
    async clearDB() {
        const { collections } = mongoose_1.default.connection;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    }
}
exports.default = MockDB;
//# sourceMappingURL=mock-db.js.map
import { MongoMemoryServer } from 'mongodb-memory-server';
declare class MockDB {
    mongod: MongoMemoryServer | null;
    connect(): Promise<void>;
    close(): Promise<void>;
    clearDB(): Promise<void>;
}
export default MockDB;

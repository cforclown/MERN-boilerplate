declare class Database {
    constructor();
    connect(): Promise<void>;
    close(): void;
    registerModels(): void;
}
export default Database;

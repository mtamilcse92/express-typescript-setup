import {
    connect,
    clearDatabase,
    closeDatabase
} from "./db-helper";

beforeAll(async (): Promise<void> => await connect());

afterEach(async (): Promise<void> => await clearDatabase());

afterAll(async (): Promise<void> => await closeDatabase());

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongod = new MongoMemoryServer();

const connect = async (): Promise<void> => {
    const uri = await mongod.getConnectionString();

    const mongooseOpts = {
        useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
    };

    await mongoose.connect(uri, mongooseOpts);
}

const closeDatabase = async (): Promise<void> => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

const clearDatabase = async (): Promise<void> => {
    const collections: any = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}

export {
    connect,
    clearDatabase,
    closeDatabase
};
import chalk from "chalk";
import mongoose from "mongoose";
import path from "path";
import grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import bluebird from "bluebird";
import service from "./service/User";
import { MONGODB_URI } from "./util/secrets";
import { mongoConnectionFailed } from "./constants/messags";


const log = console.log;
mongoose.Promise = bluebird;

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}

const userProtoPath = path.join('..', 'protos', 'user.proto');
const userProtoDefinition = protoLoader.loadSync(userProtoPath, options);
const userPackageDefinition: any = grpc.loadPackageDefinition(userProtoDefinition).user;

const connectMongo = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
  } catch (err) {
    log(`${chalk.red(mongoConnectionFailed)} ${err}`);
    process.exit();
  }
}

async function main() {
  await connectMongo();
  const server = new grpc.Server();
  server.addService(userPackageDefinition.UserService.service, {
    listUsers: service.getUsers,
    createUser: service.saveUser,
    updateUser: service.updateUser,
    deleteUser: service.deleteUser,
  });
  // gRPC server
  server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log('gRPC server running at http://127.0.0.1:50051');
}

main();
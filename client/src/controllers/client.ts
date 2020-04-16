import path from "path";
import grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";


const options =  {keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }

const userProtoPath = path.join('..', 'protos', 'user.proto');
const userProtoDefinition = protoLoader.loadSync(userProtoPath, options);
const userPackageDefinition: any = grpc.loadPackageDefinition(userProtoDefinition).user;

const client = new userPackageDefinition.UserService(
  'localhost:50051', grpc.credentials.createInsecure());

export default client;
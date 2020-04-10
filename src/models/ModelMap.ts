import { User } from "./User";

export enum ModelName {
    User = "User"
}

const modelMap: object = {
    User
}

export default (modelName: string): any => {
    const Model: any = modelMap[modelName as keyof typeof modelMap];
    if(!Model) throw "Model not found";
    return Model;
};

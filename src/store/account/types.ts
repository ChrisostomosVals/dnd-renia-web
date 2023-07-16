import TokenModel from "../../dist/models/TokenModel";
import UserModel from "../../dist/models/UserModel"

export type AccountState = {
    user?: UserModel;
    authenticated: boolean;
    token?: TokenModel;
}
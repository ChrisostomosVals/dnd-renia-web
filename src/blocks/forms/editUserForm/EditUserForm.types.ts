import UserModel from "../../../dist/models/UserModel"

export type EditUserFormData = {
    user: UserModel;
    password: string | null;
}
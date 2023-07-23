import { FC } from "react";
import { EditUserForm } from "../../blocks/forms/editUserForm/EditUserForm";
import RequireGameMaster from "../../access/RequireGameMaster";
import RequireAuth from "../../access/RequireAuth";

const UserPage:FC = () => <EditUserForm/>;

const User = RequireGameMaster(RequireAuth(UserPage));

export default User;
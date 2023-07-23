import { FC } from "react";
import RequireGameMaster from "../../access/RequireGameMaster";
import RequireAuth from "../../access/RequireAuth";
import { NewCharacterForm } from "../../blocks/forms/newCharacterForm/NewCharacterForm";
const NewCharacterPage:FC = () => {

    return (
        <NewCharacterForm />
    )
}

const NewCharacter = RequireAuth(RequireGameMaster(NewCharacterPage));

export default NewCharacter;
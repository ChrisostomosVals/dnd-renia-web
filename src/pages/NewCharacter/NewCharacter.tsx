import { FC } from "react";
import GameMasterMiddleware from "../../middlewares/GameMasterMiddleware";
import AuthMiddleware from "../../middlewares/AuthMiddleware";
import { NewCharacterForm } from "../../blocks/forms/newCharacterForm/NewCharacterForm";
const NewCharacterPage:FC = () => {

    return (
        <NewCharacterForm />
    )
}

const NewCharacter = AuthMiddleware(GameMasterMiddleware(NewCharacterPage));

export default NewCharacter;
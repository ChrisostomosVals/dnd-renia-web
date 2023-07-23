import { FC } from "react";
import RequireAuth from "../../access/RequireAuth";
import RequireGameMaster from "../../access/RequireGameMaster";
import { FeatsForm } from "../../blocks/forms/featsForm/FeatsForm";

export const FeatsPage: FC = () => <FeatsForm />;

const CharacterFeats = RequireGameMaster(RequireAuth(FeatsPage));

export default CharacterFeats;

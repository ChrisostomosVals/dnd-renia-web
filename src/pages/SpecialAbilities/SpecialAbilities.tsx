import { FC } from "react";
import RequireAuth from "../../access/RequireAuth";
import RequireGameMaster from "../../access/RequireGameMaster";
import { SpecialAbilitiesForm } from "../../blocks/forms/specialAbilitiesForm/SpecialAbititiesForm";

export const SpecialAbilitiesPage: FC = () => <SpecialAbilitiesForm />;

const CharacterSpecialAbilities = RequireGameMaster(RequireAuth(SpecialAbilitiesPage));

export default CharacterSpecialAbilities;

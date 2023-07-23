import { FC } from "react";
import RequireAuth from "../../access/RequireAuth";
import RequireGameMaster from "../../access/RequireGameMaster";
import { GearForm } from "../../blocks/forms/gearForm/GearForm";

export const GearPage: FC = () => <GearForm />;

const CharacterGear = RequireGameMaster(RequireAuth(GearPage));

export default CharacterGear;

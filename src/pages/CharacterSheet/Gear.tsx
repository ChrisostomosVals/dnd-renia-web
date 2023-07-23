import { FC } from "react";
import RequireAuth from "../../access/RequireAuth";
import { GearForm } from "../../blocks/forms/playerForms/GearForm";

export const GearSheetPage: FC = () => <GearForm />;

const GearSheet = RequireAuth(GearSheetPage);

export default GearSheet;

import { FC } from "react";
import RequireAuth from "../../access/RequireAuth";
import { SpecialAbilitiesForm } from "../../blocks/forms/playerForms/SpecialAbilitiesForm";

export const SpecialAbilitiesSheetPage: FC = () => <SpecialAbilitiesForm />;

const SpecialAbilitiesSheet = RequireAuth(SpecialAbilitiesSheetPage);

export default SpecialAbilitiesSheet;

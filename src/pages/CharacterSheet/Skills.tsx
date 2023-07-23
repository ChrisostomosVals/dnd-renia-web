import { FC } from "react";
import RequireAuth from "../../access/RequireAuth";
import { SkillsForm } from "../../blocks/forms/playerForms/SkillsForm";

export const SkillsSheetPage: FC = () => <SkillsForm />;

const SkillsSheet = RequireAuth(SkillsSheetPage);

export default SkillsSheet;

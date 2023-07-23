import { FC } from "react";
import RequireAuth from "../../access/RequireAuth";
import { SkillsForm } from "../../blocks/forms/skillsForm/SkillsForm";
import RequireGameMaster from "../../access/RequireGameMaster";

export const SkillsPage: FC = () => <SkillsForm />;

const CharacterSkills = RequireGameMaster(RequireAuth(SkillsPage));

export default CharacterSkills;

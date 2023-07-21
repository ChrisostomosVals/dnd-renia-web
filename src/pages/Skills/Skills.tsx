import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { StatsForm } from "../../blocks/forms/statsForm/StatsForm";
import { Stats } from "../../blocks/stats/Stats";
import AuthMiddleware from "../../middlewares/AuthMiddleware";
import { SkillsForm } from "../../blocks/forms/skillsForm/SkillsForm";

export const SkillsPage:FC = () =>{
    const user = useSelector((state: RootState) => state.account.user);

    switch(user?.role){
        case 'GAME MASTER':
            return <SkillsForm/>
        case 'PLAYER':
        default:
            return <Stats/>
    }
}

const CharacterSkills = AuthMiddleware(SkillsPage);

export default CharacterSkills;
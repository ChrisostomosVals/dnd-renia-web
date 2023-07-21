import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { StatsForm } from "../../blocks/forms/statsForm/StatsForm";
import { Stats } from "../../blocks/stats/Stats";
import AuthMiddleware from "../../middlewares/AuthMiddleware";

export const StatsPage:FC = () =>{
    const user = useSelector((state: RootState) => state.account.user);

    switch(user?.role){
        case 'GAME MASTER':
            return <StatsForm/>
        case 'PLAYER':
        default:
            return <Stats/>
    }
}

const CharacterStats = AuthMiddleware(StatsPage);

export default CharacterStats;
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Paths } from "./paths";
import Home from "../pages/Home";
import { Login } from "../pages/Login";
import Settings from "../pages/Settings/Settings";
import Layout from "../layout/Layout";
import Characters from "../pages/Characters/Characters";
import Character from "../pages/Character/Character";
import CharacterStats from "../pages/Stats/Stats";
import NewCharacter from "../pages/NewCharacter/NewCharacter";
import CharacterSkills from "../pages/Skills/Skills";
import Account from "../pages/Account/Account";
import CharacterGear from "../pages/Gear/Gear";
import CharacterFeats from "../pages/Feats/Feats";
import CharacterSpecialAbilities from "../pages/SpecialAbilities/SpecialAbilities";
import CharacterImages from "../pages/CharacterImages/CharacterImages";
import Chapters from "../pages/Chapters/Chapters";
import Chapter from "../pages/Chapter/Chapter";
import NewChapter from "../pages/NewChapter/NewChapter";
import Users from "../pages/Users/Users";
import User from "../pages/User/User";
import AccountCharacter from "../pages/AccountCharacter/AccountCharacter";
import StatsSheet from "../pages/CharacterSheet/Stats";
import SkillsSheet from "../pages/CharacterSheet/Skills";
import GearSheet from "../pages/CharacterSheet/Gear";
import FeatsSheet from "../pages/CharacterSheet/Feats";
import SpecialAbilitiesSheet from "../pages/CharacterSheet/SpecialAbilities";
import ImagesSheet from "../pages/CharacterSheet/Images";


export const AppRouter:FC = () => {
    return(
        <Routes>
            <Route element={<Layout/>}>
                <Route path={Paths.Home} element={<Home />}/>
                <Route path={Paths.Settings} element={<Settings />}/>
                <Route path={Paths.Characters} element={<Characters />}/>
                <Route path={`${Paths.Characters}/:id`} element={<Character />}/>
                <Route path={`${Paths.Characters}/:id${Paths.Stats}`} element={<CharacterStats />}/>
                <Route path={`${Paths.Characters}/:id${Paths.Skills}`} element={<CharacterSkills />}/>
                <Route path={`${Paths.Characters}/:id${Paths.Gear}`} element={<CharacterGear />}/>
                <Route path={`${Paths.Characters}/:id${Paths.Feats}`} element={<CharacterFeats />}/>
                <Route path={`${Paths.Characters}/:id${Paths.SpecialAbilities}`} element={<CharacterSpecialAbilities />}/>
                <Route path={`${Paths.Characters}/:id${Paths.Images}`} element={<CharacterImages />}/>
                <Route path={`${Paths.Chapters}`} element={<Chapters />}/>
                <Route path={`${Paths.Chapters}/:id`} element={<Chapter />}/>
                <Route path={`${Paths.Users}`} element={<Users />}/>
                <Route path={`${Paths.Users}/:id`} element={<User />}/>
                <Route path={`${Paths.Chapters}/:id`} element={<Chapter />}/>
                <Route path={`${Paths.NewCharacter}`} element={<NewCharacter />}/>
                <Route path={`${Paths.NewChapter}`} element={<NewChapter />}/>
                <Route path={`${Paths.Account}`} element={<Account />}/>
                <Route path={`${Paths.AccountCharacter}`} element={<AccountCharacter />}/>
                <Route path={`${Paths.AccountCharacter}${Paths.Stats}`} element={<StatsSheet />}/>
                <Route path={`${Paths.AccountCharacter}${Paths.Skills}`} element={<SkillsSheet />}/>
                <Route path={`${Paths.AccountCharacter}${Paths.Gear}`} element={<GearSheet />}/>
                <Route path={`${Paths.AccountCharacter}${Paths.Feats}`} element={<FeatsSheet/>}/>
                <Route path={`${Paths.AccountCharacter}${Paths.SpecialAbilities}`} element={<SpecialAbilitiesSheet />}/>
                <Route path={`${Paths.AccountCharacter}${Paths.Images}`} element={<ImagesSheet />}/>
            </Route>
            <Route path={Paths.Login} element={<Login />}/>
        </Routes>
    )
}
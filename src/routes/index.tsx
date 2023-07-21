import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Paths } from "./paths";
import Home from "../pages/Home";
import { Login } from "../pages/Login";
import Settings from "../pages/Settings/Settings";
import Layout from "../layout/Layout";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Characters from "../pages/Characters/Characters";
import Character from "../pages/Character/Character";
import CharacterStats from "../pages/Stats/Stats";
import NewCharacter from "../pages/NewCharacter/NewCharacter";
import CharacterSkills from "../pages/Skills/Skills";
import Account from "../pages/Account/Account";


export const AppRouter:FC = () => {
    return(
        <>
        
        <Routes>
            <Route element={<Layout/>}>
                <Route path={Paths.Home} element={<Home />}/>
                <Route path={Paths.Settings} element={<Settings />}/>
                <Route path={Paths.Characters} element={<Characters />}/>
                <Route path={`${Paths.Characters}/:id`} element={<Character />}/>
                <Route path={`${Paths.Characters}/:id${Paths.Stats}`} element={<CharacterStats />}/>
                <Route path={`${Paths.Characters}/:id${Paths.Skills}`} element={<CharacterSkills />}/>
                <Route path={`${Paths.NewCharacter}`} element={<NewCharacter />}/>
                <Route path={`${Paths.Account}`} element={<Account />}/>
            </Route>
            <Route path={Paths.Login} element={<Login />}/>
        </Routes>
        </>
    )
}
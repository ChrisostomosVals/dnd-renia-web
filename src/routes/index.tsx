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


export const AppRouter:FC = () => {
    return(
        <>
        
        <Routes>
            <Route element={<Layout/>}>
                <Route path={Paths.Home} element={<Home />}/>
                <Route path={Paths.Settings} element={<Settings />}/>
                <Route path={Paths.Characters} element={<Characters />}/>
                <Route path={`${Paths.Characters}/:id`} element={<Character />}/>
            </Route>
            <Route path={Paths.Login} element={<Login />}/>
        </Routes>
        </>
    )
}
import { Route, Routes } from "react-router-dom"
import { FC } from "react"
import { ROUTES } from "../utils/routes"
import { GamePage } from "../pages/GamePage/GamePage"
import { HomePage } from "../pages/HomePage/HomePage"


export const AppRoutes:FC = () => {
    return (
        <Routes>
            <Route index element={ <HomePage /> }/>
            <Route path={ROUTES.GAME} element={ <GamePage /> }/>
        </Routes>
    )
}
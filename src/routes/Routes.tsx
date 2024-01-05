import { Route, Routes as RouterRoutes } from 'react-router-dom';
import {FC} from "react";
import {RoutePaths} from "./paths";
import {HomeContainer} from "../screens/Home/Home.container";

export const Routes: FC = () => {
    return (
        <RouterRoutes>
            <Route path={RoutePaths.ROOT} element={<HomeContainer/>}/>
        </RouterRoutes>
    );
}
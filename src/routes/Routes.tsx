import { Route, Routes as RouterRoutes } from 'react-router-dom';
import {FC} from "react";
import {RoutePaths} from "./paths";
import {HomeContainer} from "../screens/Home/Home.container";
import {PaymentContainer} from "../screens/Payment/Payment.container";

export const Routes: FC = () => {
    return (
        <RouterRoutes>
            <Route path={RoutePaths.ROOT} element={<HomeContainer/>}/>
            <Route path={RoutePaths.PAYMENT} element={<PaymentContainer/>}/>
        </RouterRoutes>
    );
}
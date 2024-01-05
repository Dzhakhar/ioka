import {FC} from "react";
import {ActionCreator} from "redux";
import {OrderBookTableContainer} from "../../components/OrderBookTable/OrderBookTable.container";

export interface HomeProps {
    connectWs: ActionCreator<void>;
    abortWs: ActionCreator<void>;
    toggleThrottle: ActionCreator<void>;

    wsConnected: boolean;
    throttleTime: number;
}

export const Home: FC<HomeProps> = ({connectWs, abortWs, toggleThrottle, wsConnected, throttleTime}) => {
    return (
        <div>
            {wsConnected ? (
                <button onClick={abortWs}>Abort WS</button>
            ) : (
                <button onClick={connectWs}>Connect to WS</button>
            )}

            {throttleTime === 0 ? (
                <button onClick={toggleThrottle}>Throttle (5s)</button>
            ) : (
                <button onClick={toggleThrottle}>Real-Time</button>
            )}

            <OrderBookTableContainer/>
        </div>
    );
}
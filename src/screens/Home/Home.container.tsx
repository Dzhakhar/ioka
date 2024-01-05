import { connect } from 'react-redux';

import {Home} from "./Home";
import {appSlice} from "../../core/services/app/state";
import {getThrottleTime, isWsConnected} from "../../core/services/app/selectors";
import {RootState} from "../../core/services/store";

const mapStateToProps = (state: RootState) => {
    const wsConnected = isWsConnected(state);
    const throttleTime = getThrottleTime(state);

    return {
        wsConnected,
        throttleTime,
    };
}

const mapDispatchToProps = {
    connectWs: appSlice.actions.startWsConnection,
    abortWs: appSlice.actions.abortWsConnection,
    toggleThrottle: appSlice.actions.toggleThrottle,
}

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
import { connect } from 'react-redux';

import {Home} from "./Home";
import {RootState} from "../../core/services/store";
import {appSlice} from "../../core/services/app/state";

const mapStateToProps = ({app}: RootState) => {
    return {
        isOrderCreateInProgress: app.isOrderCreateInProgress,
        orderId: app.orderId,
    };
}

const mapDispatchToProps = {
    createOrder: appSlice.actions.createOrder,
}

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
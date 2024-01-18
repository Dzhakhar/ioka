import {connect} from "react-redux";
import {Payment} from "./Payment";
import {RootState} from "../../core/services/store";
import {appSlice} from "../../core/services/app/state";

const mapStateToProps = (state: RootState) => {
    return {
        isPaymentCreateInProgress: state.app.isPaymentCreateInProgress,

        order: state.app.order,
        paymentResult: state.app.paymentResult,
    };
}

const mapDispatchToProps = {
    createCardPayment: appSlice.actions.createCardPayment,
}

export const PaymentContainer = connect(mapStateToProps, mapDispatchToProps)(Payment);
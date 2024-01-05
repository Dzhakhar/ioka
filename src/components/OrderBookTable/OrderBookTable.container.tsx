import {connect} from "react-redux";
import {RootState} from "../../core/services/store";
import {getOrderBooks} from "../../core/services/app/selectors";
import {OrderBook} from "../../core/services/app/types";
import {OrderBookTable} from "./OrderBookTable";

const mapStateToProps = (state: RootState) => {
    const orderBooks: OrderBook[] = getOrderBooks(state);

    return {
        orderBooks,
    };
}

const mapDispatchToProps = {}
export const OrderBookTableContainer = connect(mapStateToProps, mapDispatchToProps)(OrderBookTable);
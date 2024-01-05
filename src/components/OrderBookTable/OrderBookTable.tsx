import {FC} from "react";
import {OrderBook} from "../../core/services/app/types";

export interface OrderBookTableProps {
    orderBooks: OrderBook[];
}
export const OrderBookTable: FC<OrderBookTableProps> = ({orderBooks}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Count</th>
                    <th>Amount</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
            {
                orderBooks.map((order: OrderBook) => (
                    <tr>
                        <td>{order.count}</td>
                        <td>{order.amount}</td>
                        <td>{order.price}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
}
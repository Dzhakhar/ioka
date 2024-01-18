import {FC, useCallback, useEffect} from "react";
import {Box, Button, Card} from "@mui/material";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {CreateOrderPayload} from "../../core/services/app/types";
import {useNavigate} from "react-router-dom";

export interface HomeProps {
    createOrder: ActionCreatorWithPayload<CreateOrderPayload>;
    isOrderCreateInProgress: boolean;
    orderId: string;
}

export const Home: FC<HomeProps> = ({
                                        createOrder,
                                        isOrderCreateInProgress,
                                        orderId,
                                    }) => {
    const createOrderCb = useCallback(() => {
        createOrder({
            amount: 10200 * 100,
            currency: 'KZT',
            captureMethod: 'AUTO',
        })
    }, [createOrder]);

    const navigate = useNavigate();

    useEffect(() => {
        if (Boolean(orderId)) {
            navigate('/payment');
        }
    }, [orderId]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: '1.3em',
        }}>
            <Box>
                <Card sx={{
                    padding: '20px',
                    mb: '20px',
                }}>
                    Margarita Pizza, 3x, 10200 kzt
                </Card>
            </Box>
            <Box>

            </Box>
                <Button size={'large'}
                        sx={{width: '100%'}}
                        onClick={createOrderCb}
                        disabled={isOrderCreateInProgress || Boolean(orderId)}
                        variant={'contained'}>Order</Button>
        </Box>
    );
}
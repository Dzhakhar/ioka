import {CardData, Order, OrderStatus} from '../../core/services/app/types';
import {ChangeEvent, FC, useCallback, useState} from 'react';
import {Box, Button, Checkbox, FormControlLabel, TextField, Typography} from '@mui/material';
import {PaymentSkeleton} from './Payment.skeleton';
import InputMask from 'react-input-mask';
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {PaymentSuccess} from "./PaymentSuccess";
import {PaymentError} from "./PaymentError";

export interface PaymentProps {
    isPaymentCreateInProgress: boolean;
    createCardPayment: ActionCreatorWithPayload<CardData>;

    order?: Order;
    paymentResult?: OrderStatus;
}

export const Payment: FC<PaymentProps> = ({
                                              order,
                                              paymentResult,
                                              createCardPayment,
                                              isPaymentCreateInProgress
}) => {
    const [cardData, setCardData] = useState<CardData>({
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        save: false,
    });

    const onNumberFieldChangeCb = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setCardData({
            ...cardData,
            number: event.target.value,
        });
    }, [cardData, setCardData]);

    const onNameFieldChangeCb = useCallback((event: ChangeEvent<HTMLInputElement>) => {
            setCardData({
                ...cardData,
                name: event.target.value,
            });
    }, [cardData, setCardData]);

    const onExpiryFieldChangeCb = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setCardData({
            ...cardData,
            expiry: event.target.value,
        });
    }, [cardData, setCardData]);

    const onCVCFieldChangeCb = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setCardData({
            ...cardData,
            cvc: event.target.value,
        });
    }, [cardData, setCardData]);

    const onSaveFieldChangeCb = useCallback((event: ChangeEvent<HTMLInputElement>) => {
            setCardData({
                ...cardData,
                save: event.target.checked,
            });
    }, [cardData, setCardData]);

    const createCardPaymentCb = useCallback(() => {
        createCardPayment({
            ...cardData,
            number: cardData.number.replace(/\s/g, ''),
        });
    }, [cardData, createCardPayment]);

    const allFieldsFilled: boolean = (
        cardData.cvc.length === 3
        && cardData.number.replace(/\s/g, '').length === 16
        && cardData.name.length > 0
        && cardData.expiry.length === 5
    );

    if (paymentResult === OrderStatus.CAPTURED) {
        return (
            <PaymentSuccess/>
        );
    }

    if (paymentResult === OrderStatus.DECLINED || paymentResult === OrderStatus.CANCELLED) {
        return (
            <PaymentError/>
        );
    }

    return order ? (
        <Box>
            <Typography sx={{marginBottom: 2}} variant={'h5'} align={'center'}>
                Payment
            </Typography>
            <Typography sx={{marginBottom: 2}} variant={'subtitle1'} align={'center'}>
                {order.amount / 100} {order.currency}
            </Typography>
            <Box mb={2}>
                <InputMask
                    mask={'9999 9999 9999 9999'}
                    maskChar={''}
                    alwaysShowMask={false}
                    formatChars={{
                        '9': '[0-9]',
                    }}
                    maskPlaceholder={null}
                    onChange={onNumberFieldChangeCb}
                    value={cardData.number}
                    disabled={isPaymentCreateInProgress}
                >
                    {
                        () => (
                            <TextField
                                label={'Credit Card Number'}
                                variant={'outlined'}
                                fullWidth
                                size={'small'}
                                inputProps={{
                                    autoComplete: 'cc-number',
                                }}
                            />
                        )
                    }
                </InputMask>
            </Box>
            <Box mb={2}>
                <TextField
                    label={'Cardholder Name'}
                    variant={'outlined'}
                    fullWidth
                    size={'small'}
                    disabled={isPaymentCreateInProgress}
                    inputProps={{
                        inputMode: 'text',
                        autoComplete: 'cc-name',
                        maxLength: 50,
                    }}
                    onChange={onNameFieldChangeCb}
                    value={cardData.name}
                />
            </Box>
            <Box mb={1} sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <InputMask
                    mask={'12/xy'}
                    alwaysShowMask={false}
                    maskChar={''}
                    formatChars={{
                        '1': '[0-1]',
                        '2': '[1-12]',
                        'x': '[2-9]',
                        'y': '[0-9]',
                    }}
                    maskPlaceholder={null}
                    onChange={onExpiryFieldChangeCb}
                    value={cardData.expiry}
                    disabled={isPaymentCreateInProgress}
                >
                    {() => (
                        <TextField
                            label={'Expiry Date'}
                            variant={'outlined'}
                            fullWidth
                            size={'small'}
                            sx={{marginRight: 2}}
                        />
                    )}
                </InputMask>
                <InputMask
                    mask={'xxx'}
                    alwaysShowMask={false}
                    maskChar={''}
                    formatChars={{
                        'x': '[0-9]',
                    }}
                    maskPlaceholder={null}
                    onChange={onCVCFieldChangeCb}
                    value={cardData.cvc}
                    disabled={isPaymentCreateInProgress}
                >
                    {() => (
                        <TextField
                            label={'CVC'}
                            variant={'outlined'}
                            fullWidth
                            size={'small'}
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                                maxLength: 3,
                                autoComplete: 'cc-csc',
                            }}
                        />
                    )}
                </InputMask>
            </Box>
            <Box mb={1}>
                <FormControlLabel
                    control={<Checkbox
                        checked={cardData.save}
                        onChange={onSaveFieldChangeCb}
                    />}
                    label={'Save the card\'s details'}
                />
            </Box>
            <Box>
                <Button fullWidth={true} variant={'contained'}
                        onClick={createCardPaymentCb}
                        disabled={!allFieldsFilled || isPaymentCreateInProgress}>
                    Pay
                </Button>
            </Box>
        </Box>
    ) : (
        <PaymentSkeleton/>
    );
};
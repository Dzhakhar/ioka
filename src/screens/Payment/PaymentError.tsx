import {Box, Button, Typography} from "@mui/material";

export const PaymentError = () => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            <Typography variant={'h5'} align={'center'} p={2}>
                Something went wrong
            </Typography>
            <Typography variant={'subtitle1'}>
                Check your card data and try again.
            </Typography>
            <Button href="/">Get back to the store</Button>
        </Box>
    );
}
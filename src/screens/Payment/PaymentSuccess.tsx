import {Box, Button, Typography} from "@mui/material";

export const PaymentSuccess = () => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            <Typography variant={'h5'} align={'center'} p={2}>
                Thank you!
            </Typography>
            <Typography variant={'subtitle1'} align={'center'} p={2}>
                Your payment has been successfully proceeded!
            </Typography>
            <Button href="/">Get back to the store</Button>
        </Box>
    );
}
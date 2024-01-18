import {Box, Skeleton, Typography} from "@mui/material";
import {FC} from "react";

export const PaymentSkeleton: FC = () => {
    return (
        <Box>
            <Typography variant={'h5'} align={'center'}>
                Preparing your payment
            </Typography>
            <Skeleton animation={'wave'} height={50} />
            <Skeleton animation={'wave'} height={50} />
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Skeleton animation={'wave'} sx={{flex: 1, marginRight: '20px'}} height={50} />
                <Skeleton animation={'wave'} sx={{flex: 1}} height={50}/>
            </Box>
            <Box sx={{display: 'flex'}}>
                <Skeleton animation={'wave'} sx={{marginRight: '20px'}} height={50} width={50} />
                <Skeleton animation={'wave'} height={50} width={200} />
            </Box>
            <Skeleton height={50}/>
        </Box>
    );
}
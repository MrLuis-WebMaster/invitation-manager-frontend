import React from 'react';
import { Card, Box, Typography } from '@mui/material';
import Link from 'next/link';
const WithoutData = ({ message, action }) => {
    return (
        <Card>
            <Box
                sx={{
                    minWidth: 800,
                    minHeight: 400,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ marginBottom: 1 }}>
                        {message}
                    </Typography>
                    {action && <Link href={action.url}>{action.message}</Link>}
                </Box>
            </Box>
        </Card>
    );
};
export default WithoutData;

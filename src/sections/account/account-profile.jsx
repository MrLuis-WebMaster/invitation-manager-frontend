import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';

export const AccountProfile = () => {
    const { data: session } = useSession();
    const user = {
        avatar: session?.user?.image,
        email: session?.user?.email,
        name: session?.user?.name,
    };
    return (
        <Card>
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Avatar
                        src={user.avatar}
                        sx={{
                            height: 80,
                            mb: 2,
                            width: 80,
                        }}
                    />
                    <Typography gutterBottom variant="h5">
                        {user.name}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                        {user.email}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

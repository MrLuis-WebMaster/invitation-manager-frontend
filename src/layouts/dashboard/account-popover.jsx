import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import {
    Box,
    Divider,
    MenuItem,
    MenuList,
    Popover,
    Typography,
} from '@mui/material';
import { useSession, signOut } from 'next-auth/react';

export const AccountPopover = props => {
    const { anchorEl, onClose, open } = props;
    const router = useRouter();
    const { data: session } = useSession();

    const handleSignOut = async () => {
        try {
            await signOut('google');
            router.push('/auth/login');
        } catch (error) {
            console.log(error);
        } finally {
            console.log('ready');
        }
    };

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom',
            }}
            onClose={onClose}
            open={open}
            PaperProps={{ sx: { width: 200 } }}
        >
            <Box
                sx={{
                    py: 1.5,
                    px: 2,
                }}
            >
                <Typography variant="overline">Cuenta</Typography>
                <Typography color="text.secondary" variant="body2">
                    {session?.user?.name}
                </Typography>
            </Box>
            <Divider />
            <MenuList
                disablePadding
                dense
                sx={{
                    p: '8px',
                    '& > *': {
                        borderRadius: 1,
                    },
                }}
            >
                <MenuItem onClick={() => router.push('/dashboard/account')}>
                    Perfil y configuracion
                </MenuItem>
                <MenuItem onClick={handleSignOut}>Cerrar Sesión</MenuItem>
            </MenuList>
        </Popover>
    );
};

AccountPopover.propTypes = {
    anchorEl: PropTypes.any,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
};

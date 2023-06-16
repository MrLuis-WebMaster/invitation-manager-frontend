import { useContext } from 'react';
import { Drawer, Box, Typography, IconButton } from '@mui/material';
import { EventContext } from '@/contexts/Event/EventProvider';
import CloseIcon from '@mui/icons-material/Close';
const DrawerComponent = ({ children, title }) => {
    const { stateDrawer, toggleDrawer, setStateDrawer } =
        useContext(EventContext);
    return (
        <>
            <Drawer
                anchor="right"
                variant="temporary"
                open={stateDrawer}
                onClose={toggleDrawer}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    width: '450px',
                    '& .MuiDrawer-paper': {
                        width: '450px',
                        boxSizing: 'border-box',
                        padding: 2,
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 1,
                    }}
                >
                    <Typography variant="h5">{title}</Typography>
                    <IconButton
                        color="primary"
                        aria-label="Cerrar"
                        component="label"
                        onClick={() => setStateDrawer(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                {children}
            </Drawer>
        </>
    );
};

export default DrawerComponent;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Snackbar, Alert } from '@mui/material';

const AlertComponent = ({ type, message }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);

        const timer = setTimeout(() => {
            setOpen(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            onClose={() => setOpen(false)}
            TransitionProps={{ timeout: 500 }}
        >
            <Alert severity={type}>{message}</Alert>
        </Snackbar>
    );
};

AlertComponent.propTypes = {
    type: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
    message: PropTypes.string.isRequired,
};

export default AlertComponent;

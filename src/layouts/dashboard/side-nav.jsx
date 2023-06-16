/* eslint-disable @next/next/no-img-element */
import { useState, useContext, useEffect } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import {
    Box,
    Button,
    Divider,
    Drawer,
    Stack,
    SvgIcon,
    Tooltip,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { items } from './configEvents';
import { SideNavItem } from './side-nav-item';
import Popover from '@mui/material/Popover';
import { useRouter } from 'next/router';
import { EventContext } from '@/contexts/Event/EventProvider';

export const SideNav = props => {
    const { open, onClose, menu } = props;
    const pathname = usePathname();
    const lgUp = useMediaQuery(theme => theme.breakpoints.up('lg'));
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);
    const {
        getEvents,
        events,
        handleSelectedEvent,
        eventSelected,
        getEventById,
    } = useContext(EventContext);
    const { eventId } = router.query;

    useEffect(() => {
        getEvents();
        if (eventId) {
            getEventById(eventId);
        }
    }, [eventId]);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'simple-popover' : undefined;

    const content = (
        <Scrollbar
            sx={{
                height: '100%',
                '& .simplebar-content': {
                    height: '100%',
                },
                '& .simplebar-scrollbar:before': {
                    background: 'neutral.400',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                <Box sx={{ p: 3 }}>
                    <Box
                        component={NextLink}
                        href="/"
                        sx={{
                            display: 'inline-flex',
                            height: 32,
                            width: 32,
                        }}
                    >
                        <Logo />
                    </Box>
                    <Box
                        sx={{
                            alignItems: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            borderRadius: 1,
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 2,
                            p: '12px',
                        }}
                    >
                        <div>
                            <Typography color="inherit" variant="subtitle1">
                                {eventSelected.name || 'Selecciona un evento'}
                            </Typography>
                            <Typography color="neutral.400" variant="body2">
                                {eventSelected.category || ''}
                            </Typography>
                        </div>
                        <Button onClick={handleClick}>
                            <SvgIcon
                                fontSize="small"
                                sx={{ color: 'neutral.500' }}
                            >
                                <ChevronUpDownIcon />
                            </SvgIcon>
                        </Button>
                        <Popover
                            id={id}
                            open={openPopover}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            sx={{
                                padding: '10px',
                            }}
                        >
                            <Stack
                                spacing={1}
                                direction="column"
                                sx={{
                                    maxWidth: 170,
                                    minWidth: 170,
                                    maxHeight: 200,
                                    padding: '10px',
                                }}
                            >
                                {events.map(event => {
                                    return (
                                        <Tooltip
                                            key={event.id}
                                            title={`${event.name}`}
                                            placement="right-start"
                                        >
                                            <Button
                                                variant="text"
                                                size="small"
                                                sx={{ minWidth: 0 }}
                                                onClick={() =>
                                                    handleSelectedEvent(event)
                                                }
                                            >
                                                <div className="text-truncate">
                                                    {event.name}
                                                </div>
                                            </Button>
                                        </Tooltip>
                                    );
                                })}
                                <Button
                                    variant="outlined"
                                    size="small"
                                    sx={{ marginBottom: 10 }}
                                    onClick={() =>
                                        router.push('/dashboard/create')
                                    }
                                >
                                    Crear Evento
                                </Button>
                            </Stack>
                        </Popover>
                    </Box>
                </Box>
                <Divider sx={{ borderColor: 'neutral.700' }} />
                <Box
                    component="nav"
                    sx={{
                        flexGrow: 1,
                        px: 2,
                        py: 3,
                    }}
                >
                    <Stack
                        component="ul"
                        spacing={0.5}
                        sx={{
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                    >
                        {items(eventId)[menu].map(item => {
                            const active = item.path
                                ? pathname === item.path
                                : false;

                            return (
                                <SideNavItem
                                    active={active}
                                    disabled={item.disabled}
                                    external={item.external}
                                    icon={item.icon}
                                    key={item.title}
                                    path={item.path}
                                    title={item.title}
                                />
                            );
                        })}
                    </Stack>
                </Box>
                <Divider sx={{ borderColor: 'neutral.700' }} />
                <Box
                    sx={{
                        px: 2,
                        py: 3,
                    }}
                >
                    <Typography color="neutral.100" variant="subtitle2">
                        Necesitas un servicio en particular?
                    </Typography>
                    <Typography color="neutral.500" variant="body2">
                        Ve a nuestro portal de servicios
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            mt: 2,
                            mx: 'auto',
                            width: '160px',
                            '& img': {
                                width: '100%',
                            },
                        }}
                    >
                        <img alt="Go to pro" src="/assets/devias-kit-pro.png" />
                    </Box>
                    <Button
                        component="a"
                        endIcon={
                            <SvgIcon fontSize="small">
                                <ArrowTopRightOnSquareIcon />
                            </SvgIcon>
                        }
                        fullWidth
                        href="https://material-kit-pro-react.devias.io/"
                        sx={{ mt: 2 }}
                        target="_blank"
                        variant="contained"
                    >
                        Ver portal
                    </Button>
                </Box>
            </Box>
        </Scrollbar>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: 'neutral.800',
                        color: 'common.white',
                        width: 280,
                    },
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: 'neutral.800',
                    color: 'common.white',
                    width: 280,
                },
            }}
            sx={{ zIndex: theme => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {content}
        </Drawer>
    );
};

SideNav.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
};

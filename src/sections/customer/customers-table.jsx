import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
    Avatar,
    Box,
    Card,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    Button,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import LaunchIcon from '@mui/icons-material/Launch';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import WithoutData from '@/components/WithoutData';
const StyledMenu = styled(props => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light'
                ? 'rgb(55, 65, 81)'
                : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));

export default function CustomizedMenus({ event: { id } }) {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                Opciones
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={() => router.push(`/dashboard/${id}/overview`)}
                    disableRipple
                >
                    <LaunchIcon />
                    Ir a evento
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <EditIcon />
                    Editar
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleClose} disableRipple>
                    <DeleteForeverIcon />
                    Borrar
                </MenuItem>
            </StyledMenu>
        </div>
    );
}

export const CustomersTable = props => {
    const {
        count = 0,
        items = [],
        onPageChange = () => {},
        onRowsPerPageChange,
        page = 0,
        rowsPerPage = 0,
        selected = [],
    } = props;

    if (!items.length)
        return (
            <WithoutData
                message={'No hay eventos'}
                action={{ message: 'Crear evento', url: '/dashboard/create' }}
            />
        );

    return (
        <Card>
            <Scrollbar>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Presupuesto</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Hora</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map(event => {
                                const isSelected = selected.includes(event.id);
                                const date = format(
                                    new Date(event.date),
                                    'd - MMMM - yyyy',
                                    { locale: es }
                                );
                                const time = format(
                                    new Date(
                                        event.date.replace(
                                            '00:00:00.000',
                                            event.time
                                        )
                                    ),
                                    'h:mm a'
                                );
                                return (
                                    <TableRow
                                        hover
                                        key={event.id}
                                        selected={isSelected}
                                    >
                                        <TableCell>
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                <Avatar src={event?.avatar}>
                                                    {getInitials(event.name)}
                                                </Avatar>
                                                <Typography variant="subtitle2">
                                                    {event.name}
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            $
                                            {Number(event.cost).toLocaleString(
                                                navigator.language
                                            )}
                                        </TableCell>
                                        <TableCell>{date}</TableCell>
                                        <TableCell>{time}</TableCell>
                                        <TableCell>
                                            <CustomizedMenus event={event} />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </Scrollbar>
            <TablePagination
                component="div"
                count={count}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

CustomersTable.propTypes = {
    count: PropTypes.number,
    items: PropTypes.array,
    onDeselectAll: PropTypes.func,
    onDeselectOne: PropTypes.func,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSelectOne: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array,
};

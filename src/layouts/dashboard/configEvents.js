import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import BookOpenIcon from '@heroicons/react/24/solid/BookOpenIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import HomeIcon from '@heroicons/react/24/solid/HomeIcon';
import PlusCircleIcon from '@heroicons/react/24/solid/PlusCircleIcon';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';
import { SvgIcon } from '@mui/material';

export const items = id => {
    return {
        event: [
            {
                title: 'Info General',
                path: `/dashboard/${id}/overview`,
                icon: (
                    <SvgIcon fontSize="small">
                        <ChartBarIcon />
                    </SvgIcon>
                ),
            },
            {
                title: 'Invitados',
                path: `/dashboard/${id}/guests`,
                icon: (
                    <SvgIcon fontSize="small">
                        <UsersIcon />
                    </SvgIcon>
                ),
            },
            {
                title: 'Tareas',
                path: `/dashboard/${id}/tasks`,
                icon: (
                    <SvgIcon fontSize="small">
                        <ListBulletIcon />
                    </SvgIcon>
                ),
            },
            {
                title: 'Gastos',
                path: `/dashboard/${id}/expenses`,
                icon: (
                    <SvgIcon fontSize="small">
                        <CurrencyDollarIcon />
                    </SvgIcon>
                ),
            },
            {
                title: 'Proveedores',
                path: `/dashboard/${id}/companies`,
                icon: (
                    <SvgIcon fontSize="small">
                        <ShoppingBagIcon />
                    </SvgIcon>
                ),
            },
            {
                title: 'Plantillas',
                path: `/dashboard/${id}/templates`,
                icon: (
                    <SvgIcon fontSize="small">
                        <BookOpenIcon />
                    </SvgIcon>
                ),
            },
        ],
        general: [
            {
                title: 'Eventos',
                path: '/dashboard',
                icon: (
                    <SvgIcon fontSize="small">
                        <HomeIcon />
                    </SvgIcon>
                ),
            },
            {
                title: 'Crear Evento',
                path: '/dashboard/create',
                icon: (
                    <SvgIcon fontSize="small">
                        <PlusCircleIcon />
                    </SvgIcon>
                ),
            },
            {
                title: 'Cuenta',
                path: '/dashboard/account',
                icon: (
                    <SvgIcon fontSize="small">
                        <UserIcon />
                    </SvgIcon>
                ),
            },
        ],
    };
};

import { useCallback, useMemo, useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
    Box,
    Button,
    Container,
    Stack,
    SvgIcon,
    Typography,
    Card,
} from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import DashboardLayout from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/guests/customers-table';
import { CustomersSearch } from 'src/sections/guests/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { EventContext } from '@/contexts/Event/EventProvider';
import DrawerComponent from '@/components/Drawer';
import FormComponent from '@/components/Form';
import FilterRadio from '@/sections/guests/Filter';

const Page = () => {
    const {
        getGuests,
        guests,
        guestsMeta,
        setStateDrawer,
        createGuest,
        updateGuest,
        enableEditOrCreate,
        guestSelected,
        setEnableEditOrCreate,
    } = useContext(EventContext);

    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
    const [filterByStatus, setFilterByStatus] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        getGuests(page, rowsPerPage, search, filterByStatus);
    }, [page, rowsPerPage, search, filterByStatus]);

    const useCustomers = (page, rowsPerPage) => {
        return useMemo(() => {
            return applyPagination(guests, page, rowsPerPage);
        }, [page, rowsPerPage]);
    };

    const useCustomerIds = customers => {
        return useMemo(() => {
            return customers.map(customer => customer.id);
        }, [customers]);
    };

    const customers = useCustomers(page, rowsPerPage);
    const customersIds = useCustomerIds(customers);
    const customersSelection = useSelection(customersIds);

    const handlePageChange = useCallback((event, value) => {
        setPage(value);
    }, []);
    const handleRowsPerPageChange = useCallback(event => {
        setRowsPerPage(event.target.value);
    }, []);
    const handleCreateGuest = () => {
        setStateDrawer(true);
        setEnableEditOrCreate(false);
    };

    return (
        <>
            <Head>
                <title>Invitados | Devias Kit</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">Invitados</Typography>
                                <Button
                                    color="inherit"
                                    startIcon={
                                        <SvgIcon fontSize="small">
                                            <ArrowDownOnSquareIcon />
                                        </SvgIcon>
                                    }
                                >
                                    Descargar Excel
                                </Button>
                            </Stack>
                            <div>
                                <Button
                                    startIcon={
                                        <SvgIcon fontSize="small">
                                            <PlusIcon />
                                        </SvgIcon>
                                    }
                                    onClick={handleCreateGuest}
                                    variant="contained"
                                >
                                    Crear
                                </Button>
                            </div>
                        </Stack>
                        <Card
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 5,
                                justifyContent: 'space-between',
                            }}
                        >
                            <CustomersSearch onSearch={setSearch} />
                            <FilterRadio onChange={setFilterByStatus} />
                        </Card>
                        <CustomersTable
                            count={guestsMeta?.pagination?.totalGuests}
                            items={guests}
                            onDeselectAll={customersSelection.handleDeselectAll}
                            onDeselectOne={customersSelection.handleDeselectOne}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            onSelectAll={customersSelection.handleSelectAll}
                            onSelectOne={customersSelection.handleSelectOne}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            selected={customersSelection.selected}
                        />
                    </Stack>
                </Container>
                <DrawerComponent
                    title={
                        enableEditOrCreate
                            ? 'Editar Invitado'
                            : 'Crear Invitado'
                    }
                >
                    <FormComponent
                        isEditing={enableEditOrCreate}
                        initialValues={
                            enableEditOrCreate ? guestSelected : null
                        }
                        onSubmit={
                            enableEditOrCreate ? updateGuest : createGuest
                        }
                    />
                </DrawerComponent>
            </Box>
        </>
    );
};

Page.getLayout = page => (
    <DashboardLayout menu={'event'}>{page}</DashboardLayout>
);

export default Page;

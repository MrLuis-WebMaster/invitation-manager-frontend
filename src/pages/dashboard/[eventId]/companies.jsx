import Head from 'next/head';
import {
    Box,
    Container,
    Pagination,
    Stack,
    Typography,
    Unstable_Grid2 as Grid,
} from '@mui/material';
import DashboardLayout from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/companies/company-card';
import { useEffect, useState } from 'react';
import api from '@/utils/requestApi';

const Page = () => {
    const [companies, setCompanies] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 6;

    useEffect(() => {
        const getProviders = async () => {
            const response = await api('GET', 'providers');
            setCompanies(response.body);
        };
        getProviders();
    }, []);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedCompanies = companies.slice(startIndex, endIndex);

    return (
        <>
            <Head>
                <title>Proveedores | Devias Kit</title>
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
                                <Typography variant="h4">
                                    Proveedores
                                </Typography>
                                <Typography variant="p">
                                    Aqui podras encontrar servicios que te
                                    pueden ayudar con tu evento
                                </Typography>
                            </Stack>
                        </Stack>
                        <Grid container spacing={3}>
                            {paginatedCompanies.map(company => (
                                <Grid xs={12} md={6} lg={4} key={company.id}>
                                    <CompanyCard company={company} />
                                </Grid>
                            ))}
                        </Grid>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Pagination
                                count={Math.ceil(companies.length / limit)}
                                page={page}
                                onChange={handlePageChange}
                                size="small"
                            />
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = page => (
    <DashboardLayout menu={'event'}>{page}</DashboardLayout>
);

export default Page;

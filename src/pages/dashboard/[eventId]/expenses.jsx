import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import DashboardLayout from 'src/layouts/dashboard/layout';
import ListExpenses from '@/sections/expenses/List';
import FormCreateExpense from '@/sections/expenses/Form';
const Page = () => {
    return (
        <>
            <Head>
                <title>Gastos | Devias Kit</title>
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
                                <Typography variant="h4">Gastos</Typography>
                                <Typography variant="span">
                                    Aqui podras crear y administrar los gastos
                                    del evento
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={4}
                    >
                        <FormCreateExpense />
                        <ListExpenses />
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

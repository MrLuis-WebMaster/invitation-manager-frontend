import Head from 'next/head';
import {
    Box,
    Container,
    Stack,
    Typography,
    Unstable_Grid2 as Grid,
} from '@mui/material';
import DashboardLayout from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import { SettingsWhatsapp } from 'src/sections/account/settings-whatsapp';

const Page = () => (
    <>
        <Head>
            <title>Perfil | Devias Kit</title>
        </Head>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={3}>
                    <div>
                        <Typography variant="h4">Perfil</Typography>
                    </div>
                    <div>
                        <Grid container spacing={3}>
                            <Grid xs={12} md={6} lg={4}>
                                <AccountProfile />
                            </Grid>
                            <Grid xs={12} md={6} lg={8}>
                                <AccountProfileDetails />
                            </Grid>
                        </Grid>
                    </div>
                    <Stack spacing={3}>
                        <Typography variant="h4">
                            Configuración de mensajeria
                        </Typography>
                        <SettingsWhatsapp />
                    </Stack>
                </Stack>
            </Container>
        </Box>
    </>
);

Page.getLayout = page => (
    <DashboardLayout menu={'general'}>{page}</DashboardLayout>
);

export default Page;

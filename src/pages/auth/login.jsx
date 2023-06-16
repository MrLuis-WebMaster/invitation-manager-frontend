import { useState } from 'react';
import Head from 'next/head';
import {
    Alert,
    Box,
    Button,
    Stack,
    Typography,
    Fade,
    CircularProgress,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from 'next-auth/react';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';

const Page = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        setIsLoading(true);
        try {
            await signIn('google', {
                callbackUrl: '/dashboard',
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <Head>
                <title>Iniciar Sesion | Devias Kit</title>
            </Head>
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        maxWidth: 550,
                        px: 3,
                        py: '100px',
                        width: '100%',
                    }}
                >
                    <div>
                        <Stack spacing={1} sx={{ mb: 3 }}>
                            <Typography variant="h4">Iniciar Sesión</Typography>
                        </Stack>

                        <Button
                            onClick={() => handleSignIn()}
                            variant="outlined"
                            size="large"
                            fullWidth={true}
                            startIcon={<GoogleIcon />}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Fade in={isLoading}>
                                    <CircularProgress size={16} />
                                </Fade>
                            ) : (
                                <Fade in={!isLoading}>
                                    <Typography color="primary">
                                        Iniciar sesión con Google
                                    </Typography>
                                </Fade>
                            )}
                        </Button>
                        <Alert variant="filled" severity="info" sx={{ mt: 3 }}>
                            <div>
                                <b>Importante</b> debes de tener una cuenta en
                                gmail para poder ingresar a la plataforma
                            </div>
                        </Alert>
                    </div>
                </Box>
            </Box>
        </>
    );
};

Page.getLayout = page => <AuthLayout>{page}</AuthLayout>;

export default Page;

import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    Container,
    Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const SubscriptionCard = () => {
    const router = useRouter();
    const { customerId } = router.query;
    const [orderClient, setOrderClient] = useState('');

    const handleRedirectCheckout = () => {
        router.push(`/payment/checkout/${orderClient}`);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const createOrder = async _session => {
        if (customerId) {
            const response = await fetch(
                'http://localhost:4000/stripe/create/order',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        customerId,
                    }),
                }
            );
            const data = await response.json();
            setOrderClient(data.body);
            return data;
        }
    };
    useEffect(() => {
        createOrder();
    }, [createOrder, customerId]);
    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <Card sx={{ maxWidth: 400 }}>
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Subscripción mensual
                        </Typography>
                        <Typography variant="body1" component="p" gutterBottom>
                            Por solo $10 al mes, obtienes acceso completo a
                            nuestra aplicación y todas sus características
                            premium.
                        </Typography>
                        <Typography variant="body1" component="p" gutterBottom>
                            Beneficios:
                        </Typography>
                        <ul>
                            <li>
                                Acceso completo a todas las características
                                premium
                            </li>
                            <li>Soporte técnico prioritario</li>
                            <li>
                                Nuevas funciones antes que cualquier otro
                                usuario
                            </li>
                        </ul>
                    </CardContent>
                    <CardActions>
                        <Button
                            onClick={handleRedirectCheckout}
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Pagar ahora
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    );
};

export default SubscriptionCard;

import api from '@/utils/requestApi';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Stack,
    Typography,
    Unstable_Grid2 as Grid,
} from '@mui/material';
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { useSession } from 'next-auth/react';
export const SettingsWhatsapp = () => {
    const { data: session } = useSession();
    const [valueQR, setValueQR] = useState('');
    const handleQrWs = async () => {
        const response = await api('POST', 'whatsapp/create/qr', {
            email: session?.user?.email,
        });
        setValueQR(response.body);
    };
    return (
        <Card>
            <CardHeader
                subheader="Inicia session en Whatsapp"
                title="Whatsapp"
            />
            <Divider />
            <CardContent>
                <Grid container spacing={6} wrap="wrap">
                    <Grid xs={12} sm={6}>
                        <Stack spacing={1}>
                            <div
                                style={{
                                    height: 'auto',
                                    margin: '0 auto',
                                    maxWidth: '60%',
                                    width: '100%',
                                    border: ' 1px solid #eee',
                                    padding: '10px',
                                    minHeight: 256,
                                }}
                            >
                                {valueQR && (
                                    <QRCode
                                        size={256}
                                        style={{
                                            height: 'auto',
                                            maxWidth: '100%',
                                            width: '100%',
                                        }}
                                        value={valueQR}
                                        viewBox={'0 0 256 256'}
                                    />
                                )}
                            </div>
                        </Stack>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Stack spacing={1}>
                            <Typography variant="h6">
                                Pasos para conectarse a Whatsapp
                            </Typography>
                            <Stack>
                                <li>
                                    Abre tu aplicacion de Whatsapp en tu celular
                                </li>
                                <li>Ve a configuracion</li>
                                <li>
                                    Selecciona la opcion de conectar
                                    dispositivos
                                </li>
                                <li>Dale al boton de generar codigo QR</li>
                                <li>
                                    Escanealo a traves de la aplicacion de
                                    whatsapp
                                </li>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="contained" onClick={handleQrWs}>
                    Generar QR
                </Button>
            </CardActions>
        </Card>
    );
};

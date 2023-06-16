import Head from 'next/head';
import {
    Box,
    Container,
    TextField,
    Select,
    MenuItem,
    Button,
    Stack,
    Typography,
} from '@mui/material';
import DashboardLayout from 'src/layouts/dashboard/layout';
import { useState, useContext, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { EventContext } from '@/contexts/Event/EventProvider';

const initialValues = {
    name: '',
    description: '',
    date: '',
    time: '',
    cost: '',
    location: '',
    category: '',
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es obligatorio'),
    description: Yup.string().required('La descripción es obligatoria'),
    date: Yup.date()
        .required('La fecha es obligatoria')
        .min(new Date(), 'La fecha no puede ser anterior al día de hoy'),
    time: Yup.string().required('La hora es obligatoria'),
    cost: Yup.number()
        .required('El presupuesto es obligatorio')
        .positive('El presupuesto debe ser mayor a cero'),
    category: Yup.string().required('La categoría es obligatoria'),
    location: Yup.string().required('La ubicación es obligatoria'),
});

const EventForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { categories, getEventsCategories, createEvent } =
        useContext(EventContext);

    useEffect(() => {
        getEventsCategories();
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        try {
            setIsLoading(true);
            createEvent(values);
            setIsLoading(false);
            resetForm();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}
                        >
                            <Box sx={{ width: '100%' }}>
                                <Field
                                    sx={{ width: '100%' }}
                                    name="name"
                                    as={TextField}
                                    label="Nombre del evento"
                                    error={errors.name && touched.name}
                                    helperText={touched.name && errors.name}
                                />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Field
                                    sx={{ width: '100%' }}
                                    name="description"
                                    as={TextField}
                                    label="Descripción del evento"
                                    multiline
                                    rows={4}
                                    error={
                                        errors.description &&
                                        touched.description
                                    }
                                    helperText={
                                        touched.description &&
                                        errors.description
                                    }
                                />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Field
                                    name="location"
                                    sx={{ width: '100%' }}
                                    as={TextField}
                                    label="Ubicación del evento"
                                    error={errors.location && touched.location}
                                    helperText={
                                        touched.location && errors.location
                                    }
                                />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Field
                                    sx={{ width: '100%' }}
                                    name="date"
                                    as={TextField}
                                    type="date"
                                    label="Fecha del evento"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={errors.date && touched.date}
                                    helperText={touched.date && errors.date}
                                />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Field
                                    sx={{ width: '100%' }}
                                    name="time"
                                    as={TextField}
                                    type="time"
                                    label="Hora del evento"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                    error={errors.time && touched.time}
                                    helperText={touched.time && errors.time}
                                />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Field
                                    sx={{ width: '100%' }}
                                    name="cost"
                                    as={TextField}
                                    label="Presupuesto del evento"
                                    type="number"
                                    error={errors.cost && touched.cost}
                                    helperText={touched.cost && errors.cost}
                                />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Field
                                    sx={{ width: '100%' }}
                                    name="category"
                                    as={Select}
                                    label="Categoría del evento"
                                    error={errors.category && touched.category}
                                    helperText={
                                        touched.category && errors.category
                                    }
                                >
                                    <MenuItem value="">
                                        <em>Seleccione una categoría</em>
                                    </MenuItem>
                                    {categories?.map(category => (
                                        <MenuItem
                                            key={category.id}
                                            value={category.name}
                                        >
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Box>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Enviando...' : 'Crear evento'}
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </>
    );
};

const Page = () => (
    <>
        <Head>
            <title>Crear Evento | Devias Kit</title>
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
                        <Typography variant="h4">Creacion de Evento</Typography>
                    </div>
                    <EventForm />
                </Stack>
            </Container>
        </Box>
    </>
);

Page.getLayout = page => (
    <DashboardLayout menu={'general'}>{page}</DashboardLayout>
);

export default Page;

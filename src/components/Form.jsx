import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';

const FormComponent = ({ isEditing, initialValues, onSubmit }) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            numberGuest: '',
            numberPhone: '',
            messageCustomize: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Este campo es obligatorio'),
            numberGuest: Yup.number()
                .min(1, 'Debes invitar al menos a una persona')
                .required('Este campo es obligatorio'),
            numberPhone: Yup.string().required('Este campo es obligatorio'),
            messageCustomize: Yup.string().required(
                'Este campo es obligatorio'
            ),
        }),
        onSubmit: () => {
            try {
                onSubmit(formik.values);
                formik.resetForm();
            } catch {}
        },
    });

    useEffect(() => {
        if (isEditing) {
            formik.setValues({
                name: initialValues.name,
                numberGuest: initialValues.numberGuest,
                numberPhone: initialValues.numberPhone,
                messageCustomize: initialValues.messageCustomize,
            });
        } else {
            formik.resetForm();
        }
        return () => {
            formik.resetForm();
        };
    }, [
        isEditing,
        initialValues?.name,
        initialValues?.numberGuest,
        initialValues?.numberPhone,
        initialValues?.messageCustomize,
    ]);

    return (
        <Box component="form" onSubmit={formik.handleSubmit}>
            <TextField
                fullWidth
                id="name"
                name="name"
                label="Nombre"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                margin="normal"
            />
            <TextField
                fullWidth
                id="numberGuest"
                name="numberGuest"
                label="Número de invitados"
                type="number"
                value={formik.values.numberGuest}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                    formik.touched.numberGuest &&
                    Boolean(formik.errors.numberGuest)
                }
                helperText={
                    formik.touched.numberGuest && formik.errors.numberGuest
                }
                margin="normal"
            />
            <TextField
                fullWidth
                id="numberPhone"
                name="numberPhone"
                label="Número de celular"
                value={formik.values.numberPhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                    formik.touched.numberPhone &&
                    Boolean(formik.errors.numberPhone)
                }
                helperText={
                    formik.touched.numberPhone && formik.errors.numberPhone
                }
                margin="normal"
            />
            <TextField
                fullWidth
                id="messageCustomize"
                name="messageCustomize"
                label="Mensaje personalizado"
                multiline
                rows={4}
                value={formik.values.messageCustomize}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                    formik.touched.messageCustomize &&
                    Boolean(formik.errors.messageCustomize)
                }
                helperText={
                    formik.touched.messageCustomize &&
                    formik.errors.messageCustomize
                }
                margin="normal"
            />
            <Button type="submit" variant="contained" fullWidth color="primary">
                {isEditing ? 'Actualizar' : 'Enviar'}
            </Button>
        </Box>
    );
};

export default FormComponent;

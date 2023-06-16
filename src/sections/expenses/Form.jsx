import { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button } from '@mui/material';
import { ExpenseContext } from '@/contexts/ExpenseEvent/ExpenseEventContext';

const initialValues = {
    name: '',
    amount: '',
    description: '',
};

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'El campo de nombre no puede estar vacío';
    }
    if (!values.amount) {
        errors.amount = 'El campo de monto no puede estar vacío';
    } else if (isNaN(Number(values.amount))) {
        errors.amount = 'El campo de monto debe ser un número';
    } else if (Number(values.amount) < 0) {
        errors.amount = 'El campo de monto no puede ser negativo';
    }
    return errors;
};

const FormCreateExpense = () => {
    const { createExpense } = useContext(ExpenseContext);

    const handleSubmit = values => {
        createExpense(values);
    };

    return (
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
        >
            {({ errors, touched }) => (
                <Form>
                    <Field
                        as={TextField}
                        label="Nombre"
                        name="name"
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <Field
                        as={TextField}
                        label="Monto"
                        name="amount"
                        error={touched.amount && Boolean(errors.amount)}
                        helperText={touched.amount && errors.amount}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <Field
                        as={TextField}
                        label="Descripción"
                        name="description"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={4}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                    >
                        Agregar Gasto
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default FormCreateExpense;

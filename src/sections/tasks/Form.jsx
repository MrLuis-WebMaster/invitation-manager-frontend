import { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button } from '@mui/material';
import { TaskContext } from '@/contexts/TasksEvent/TaskEventContext';

const initialValues = {
    title: '',
    description: '',
};

const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = 'El campo de título no puede estar vacío';
    }
    return errors;
};

const FormCreateTask = () => {
    const { createTask } = useContext(TaskContext);

    const handleSubmit = values => {
        createTask(values);
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
                        label="Título"
                        name="title"
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
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
                        Agregar Tarea
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default FormCreateTask;

import { createContext, useState } from 'react';
import api from '@/utils/requestApi';
import AlertComponent from '@/components/Alert';
import { useRouter } from 'next/router';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const router = useRouter();
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [tasksPercentage, setTasksPercentage] = useState(0);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const createTask = async dataTask => {
        try {
            const data = {
                id: dataTask.id,
                name: dataTask.title,
                description: dataTask.description,
                eventId: router.query.eventId,
            };
            const response = await api('POST', 'task/create', data);
            if (!response.body) {
                throw new Error('Ha ocurrido un error');
            }
            setShowAlert(true);
            setAlertType('success');
            setAlertMessage('Tarea creadad correctamente');
        } catch (error) {
            console.log(error.message);
            setShowAlert(true);
            setAlertType('error');
            setAlertMessage(error.message);
        }
    };
    const updateTask = async dataTask => {
        try {
            const data = {
                id: dataTask.id,
                name: dataTask.name,
                description: dataTask.description,
                status: dataTask.status,
            };
            const response = await api('PUT', 'task/update', data);
            if (!response.body) {
                throw new Error('Ha ocurrido un error');
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const deleteTask = async dataTask => {
        try {
            const response = await api('DELETE', 'task/delete', dataTask);
            if (!response.body) {
                throw new Error('Ha ocurrido un error');
            }
            setShowAlert(true);
            setAlertType('success');
            setAlertMessage('Borrado');
        } catch (error) {
            console.log(error.message);
            setShowAlert(true);
            setAlertType('error');
            setAlertMessage(error.message);
        }
    };
    const getTasks = async () => {
        try {
            const response = await api('GET', `task/${router.query.eventId}`);
            if (!response.body) {
                throw new Error('Ha ocurrido un error');
            }
            setTasks(response.body);
        } catch (error) {
            console.log(error.message);
        }
    };
    const getTasksPercentage = async () => {
        try {
            const response = await api(
                'GET',
                `task/${router.query.eventId}/percentage`
            );
            if (!response.body) {
                throw new Error('Ha ocurrido un error');
            }
            setTasksPercentage(response.body);
        } catch (error) {
            console.log(error.message);
        }
    };
    const state = {
        loading,
        setLoading,
        createTask,
        getTasks,
        updateTask,
        deleteTask,
        tasks,
        getTasksPercentage,
        tasksPercentage,
    };
    return (
        <TaskContext.Provider value={{ ...state }}>
            {children}
            {showAlert && (
                <AlertComponent
                    type={alertType}
                    message={alertMessage}
                    duration={3000}
                />
            )}
        </TaskContext.Provider>
    );
};

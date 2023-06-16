import { createContext, useState } from 'react';
import api from '@/utils/requestApi';
import AlertComponent from '@/components/Alert';
import { useRouter } from 'next/router';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const router = useRouter();
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [expensesTotal, setExpensesTotal] = useState(0);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const createExpense = async dataExpense => {
        try {
            const data = {
                name: dataExpense.name,
                amount: dataExpense.amount,
                description: dataExpense.description,
                eventId: router.query.eventId,
            };
            const response = await api('POST', 'expense/create', data);
            if (!response.body) {
                throw new Error('Ha ocurrido un error');
            }
            setShowAlert(true);
            setAlertType('success');
            setAlertMessage('Gasto registrado correctamente');
        } catch (error) {
            console.log(error.message);
            setShowAlert(true);
            setAlertType('error');
            setAlertMessage(error.message);
        }
    };

    const updateExpense = async dataExpense => {
        try {
            const data = {
                id: dataExpense.id,
                name: dataExpense.name,
                amount: dataExpense.amount,
                description: dataExpense.description,
            };
            const response = await api('PUT', 'expense/update', data);
            if (!response.body) {
                throw new Error('Ha ocurrido un error');
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const deleteExpense = async dataExpense => {
        try {
            const response = await api('DELETE', 'expense/delete', {
                expenseId: dataExpense.id,
            });
            if (!response.body) {
                throw new Error('Ha ocurrido un error');
            }
            setShowAlert(true);
            setAlertType('success');
            setAlertMessage('Gasto eliminado correctamente');
        } catch (error) {
            console.log(error.message);
            setShowAlert(true);
            setAlertType('error');
            setAlertMessage(error.message);
        }
    };

    const getExpenses = async () => {
        try {
            const response = await api(
                'GET',
                `expense/${router.query.eventId}`
            );
            if (!response.body) {
                throw new Error('Ha ocurrido un error');
            }
            setExpenses(response.body);
        } catch (error) {
            console.log(error.message);
        }
    };
    const getExpensesTotal = async () => {
        try {
            const response = await api(
                'GET',
                `expense/${router.query.eventId}/total-expenses`
            );
            if (!response.body) {
                throw new Error('Ha ocurrido un error');
            }
            setExpensesTotal(response.body);
        } catch (error) {
            console.log(error.message);
        }
    };

    const state = {
        loading,
        setLoading,
        createExpense,
        getExpenses,
        updateExpense,
        deleteExpense,
        expenses,
        getExpensesTotal,
        expensesTotal,
    };

    return (
        <ExpenseContext.Provider value={{ ...state }}>
            {children}
            {showAlert && (
                <AlertComponent
                    type={alertType}
                    message={alertMessage}
                    duration={3000}
                />
            )}
        </ExpenseContext.Provider>
    );
};

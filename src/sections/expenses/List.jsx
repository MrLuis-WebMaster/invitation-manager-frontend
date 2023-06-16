import { useState, useContext, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PaidIcon from '@mui/icons-material/Paid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Paper, Stack } from '@mui/material';
import { ExpenseContext } from '@/contexts/ExpenseEvent/ExpenseEventContext';
const ListExpenses = () => {
    const [checked, setChecked] = useState(false);
    const { getExpenses, expenses, deleteExpense } = useContext(ExpenseContext);

    useEffect(() => {
        getExpenses();
        console.log(expenses);
    }, [expenses.length, checked]);

    const handleDelete = id => () => {
        deleteExpense({ id });
        setChecked(state => !state);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
            }}
        >
            <List>
                {expenses.map(expense => {
                    const labelId = `checkbox-list-label-${expense?.id}`;
                    return (
                        <ListItem
                            key={expense.id}
                            secondaryAction={
                                <Stack>
                                    <IconButton
                                        onClick={handleDelete(expense.id)}
                                        edge="end"
                                        aria-label="Borrar"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>
                            }
                            disablePadding
                            {...(expense?.status && {
                                sx: { opacity: '.5' },
                            })}
                        >
                            <ListItemButton role={undefined} dense>
                                <ListItemIcon>
                                    <PaidIcon />
                                </ListItemIcon>
                                <ListItemText
                                    id={labelId}
                                    primary={`${Number(
                                        expense.amount
                                    ).toLocaleString(navigator.language)} - ${
                                        expense?.name
                                    }`}
                                    secondary={expense?.description}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );
};

export default ListExpenses;

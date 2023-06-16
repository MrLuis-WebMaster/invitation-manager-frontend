import { useState, useContext, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Paper } from '@mui/material';
import { TaskContext } from '@/contexts/TasksEvent/TaskEventContext';

const CheckboxList = () => {
    const [checked, setChecked] = useState(false);
    const { getTasks, tasks, updateTask, deleteTask } = useContext(TaskContext);

    useEffect(() => {
        getTasks();
    }, [tasks.length, checked]);

    const handleToggle = index => () => {
        const newTasks = [...tasks];
        newTasks[index].status = !newTasks[index].status;
        updateTask(newTasks[index]);
        setChecked(state => !state);
    };
    const handleDelete = id => () => {
        deleteTask({ id });
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
                {tasks.map((task, index) => {
                    const labelId = `checkbox-list-label-${task?.id}`;

                    return (
                        <ListItem
                            key={task?.id}
                            secondaryAction={
                                <IconButton
                                    onClick={handleDelete(task.id)}
                                    edge="end"
                                    aria-label="Borrar"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                            disablePadding
                            {...(task?.status && { sx: { opacity: '.5' } })}
                        >
                            <ListItemButton
                                role={undefined}
                                onClick={handleToggle(index)}
                                dense
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={task?.status}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    id={labelId}
                                    primary={task?.name}
                                    secondary={task?.description}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );
};

export default CheckboxList;

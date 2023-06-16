import React from 'react';
import { EventProvider } from './Event/EventProvider';
import { TaskProvider } from './TasksEvent/TaskEventContext';
import { ExpenseProvider } from './ExpenseEvent/ExpenseEventContext';
const AppContextProvider = ({ children }) => {
    return (
        <EventProvider>
            <TaskProvider>
                <ExpenseProvider>{children}</ExpenseProvider>
            </TaskProvider>
        </EventProvider>
    );
};

export default AppContextProvider;

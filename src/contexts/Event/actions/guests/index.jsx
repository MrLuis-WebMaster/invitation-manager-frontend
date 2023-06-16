import api from '@/utils/requestApi';
import { useState } from 'react';

export const createGuest = async info => {
    try {
        await api('POST', 'guests', info);
    } catch (error) {
        console.log(error.message);
    }
};

export const useSelectedGuestToEdit = (flag, guest = {}) => {
    const [editOrCreate, setEditOrCreate] = useState(false);
    const [selectedGuest, setSelectedGuest] = useState({});
    setEditOrCreate(flag);
    setSelectedGuest(guest);
    return {
        editOrCreate,
        selectedGuest,
    };
};

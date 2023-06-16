import { createContext, useState } from 'react';
import api from '@/utils/requestApi';
import { useSession } from 'next-auth/react';
import AlertComponent from '@/components/Alert';
import { useRouter } from 'next/router';
import { useSelectedGuestToEdit } from './actions/guests';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [showAlert, setShowAlert] = useState(false);
    const [enableEditOrCreate, setEnableEditOrCreate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [events, setEvents] = useState([]);
    const [guests, setGuests] = useState([]);
    const [guestsMeta, setGuestsMeta] = useState({});
    const [categories, setEventsCategories] = useState([]);
    const [eventSelected, setEventSelected] = useState({});
    const [guestSelected, setGuestSelected] = useState({});
    const [templateSelected, setTemplateSelected] = useState({});
    const getEvents = async () => {
        try {
            const response = await api(
                'GET',
                `event/${session.user.email}/events-by-user`
            );
            setEvents(response.body);
            setLoading(true);
            return true;
        } catch (error) {
            console.error('Error fetching events:', error);
            setLoading(false);
            return false;
        } finally {
            setLoading(true);
        }
    };
    const getEventById = async id => {
        try {
            const response = await api(
                'GET',
                `event/${session.user.email}/events-by-user?eventId=${id}`
            );
            const [event] = response.body;
            setEventSelected(event);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };
    const getEventsCategories = async () => {
        const response = await api('GET', 'event/categories');
        setEventsCategories(response.body);
    };
    const createEvent = async dataEvent => {
        try {
            const data = {
                ...dataEvent,
                email: session.user.email,
            };
            const response = await api('POST', 'event/create', data);
            if (!response.body) {
                throw new Error('Ha ocurrido un error');
            }
            setShowAlert(true);
            setAlertType('success');
            setAlertMessage('El evento se creó correctamente');
        } catch (error) {
            console.log(error.message);
            setShowAlert(true);
            setAlertType('error');
            setAlertMessage(error.message);
        }
    };
    const handleSelectedEvent = event => {
        router.push(`/dashboard/${event.id}/overview`);
        setEventSelected(event);
    };
    const createEventTemplate = async data => {
        try {
            const response = await api('POST', 'event/template', {
                userEmail: session.user.email,
                eventId: eventSelected.id,
                ...data,
            });
            setTemplateSelected(response.body);
            setShowAlert(true);
            setAlertType('success');
            setAlertMessage('Plantilla guardada');
            setTimeout(() => setShowAlert(false), 3000);
        } catch (error) {
            setShowAlert(true);
            setAlertType('error');
            setAlertMessage(error.message);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };
    const getEventTemplate = async id => {
        try {
            const response = await api('GET', `event/template/${id}`);
            setTemplateSelected(response.body);
        } catch (error) {
            setShowAlert(true);
            setAlertType('error');
            setAlertMessage(error.message);
        }
    };
    const getGuests = async (page, limit, search, FilterByStatus) => {
        try {
            const response = await api(
                'GET',
                `guests/${
                    session.user.email
                }?search=${search}&limit=${limit}&page=${
                    page + 1
                }&isConfirmed=${FilterByStatus}&eventId=${router.query.eventId}`
            );
            setGuests(response.body);
            setGuestsMeta(response.meta);
            return true;
        } catch (error) {
            setShowAlert(true);
            setAlertType('error');
            setAlertMessage(error.message);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };
    const createGuest = async info => {
        try {
            const response = await api('POST', 'guests', {
                eventId: eventSelected.id,
                email: session.user.email,
                ...info,
            });
            if (!response.body) {
                throw new Error(
                    'Ha ocurrido un error, es posible que el numero que intentas ingresar ya existe, o tenemos errores en nuestros servidores'
                );
            }
            setShowAlert(true);
            setAlertType('success');
            setAlertMessage('El evento se creó correctamente');
            setStateDrawer(false);
        } catch (error) {
            setShowAlert(true);
            setAlertType('error');
            setAlertMessage(error.message);
            setStateDrawer(false);
        }
    };
    const updateGuest = async info => {
        try {
            const response = await api('PUT', 'guests', {
                oldGuest: {
                    id: guestSelected.id,
                },
                newGuest: { ...info },
            });
            if (!response.body) {
                throw new Error(
                    'Ha ocurrido un error, es posible que el numero que intentas ingresar ya existe, o tenemos errores en nuestros servidores'
                );
            }
            setShowAlert(true);
            setAlertType('success');
            setAlertMessage('El usuario se actualizo correctamente');
            setStateDrawer(false);
        } catch (error) {
            setShowAlert(true);
            setAlertType('error');
            setAlertMessage(error.message);
            setStateDrawer(false);
        }
    };
    const [stateDrawer, setStateDrawer] = useState(false);
    const toggleDrawer = () => event => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setGuestSelected({});
        setEnableEditOrCreate(false);
        setStateDrawer(false);
    };

    const state = {
        loading,
        events,
        getEvents,
        categories,
        getEventsCategories,
        createEvent,
        handleSelectedEvent,
        eventSelected,
        getEventById,
        createEventTemplate,
        templateSelected,
        getEventTemplate,
        getGuests,
        guests,
        guestsMeta,
        stateDrawer,
        toggleDrawer,
        setStateDrawer,
        createGuest,
        updateGuest,
        useSelectedGuestToEdit,
        enableEditOrCreate,
        setEnableEditOrCreate,
        guestSelected,
        setGuestSelected,
        email: session?.user?.email,
    };
    return (
        <EventContext.Provider value={{ ...state }}>
            {children}
            {showAlert && (
                <AlertComponent
                    type={alertType}
                    message={alertMessage}
                    duration={3000}
                />
            )}
        </EventContext.Provider>
    );
};

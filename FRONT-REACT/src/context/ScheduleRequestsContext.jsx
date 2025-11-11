import { createContext, useState, useEffect, useContext } from "react";
import scheduleRequestsService from "../services/scheduleRequests";

export const ScheduleRequestContext = createContext();

export const ScheduleRequestProvider = ({ children }) => {
    const [scheduleRequests, setScheduleRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getScheduleRequests = async () => {
        setLoading(true);
        try {
            const { data: response } = await scheduleRequestsService.list();
            setScheduleRequests(Array.isArray(response.data) ? response.data : []);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const addScheduleRequest = async (newScheduleRequest) => {
        setLoading(true);
        try {
            const { data: response } = await scheduleRequestsService.create(newScheduleRequest);
            // Ahora response.data debería incluir la información completa del empleado
            setScheduleRequests(prev => [...prev, response.data]);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };


    const editScheduleRequest = async (id, updated) => {
        setLoading(true);
        try {
            await scheduleRequestsService.update(id, updated);
            // Recargamos todos los datos para asegurar que se vean los cambios
            await getScheduleRequests();
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        getScheduleRequests();
    }, []);

    return (
        <ScheduleRequestContext.Provider
            value={{
                scheduleRequests,
                loading,
                error,
                getScheduleRequests,
                addScheduleRequest,
                editScheduleRequest
            }}
        >
            {children}
        </ScheduleRequestContext.Provider>
    );
};

export const useScheduleRequestContext = () => {
    return useContext(ScheduleRequestContext);
};
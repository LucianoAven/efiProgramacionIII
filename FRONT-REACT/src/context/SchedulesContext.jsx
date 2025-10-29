import { createContext, useState, useEffect, useContext } from "react";
import schedulesService from "../services/schedules";

export const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getSchedules = async () => {
        setLoading(true);
        try {
            const { data: response } = await schedulesService.list();
            setSchedules(Array.isArray(response.data) ? response.data : []);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const loadSchedules = async (params = {}) => {
        setLoading(true);
        try {
            const { data: response } = await schedulesService.list(params);
            setSchedules(Array.isArray(response.data) ? response.data : []);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const addSchedule = async (newSchedule) => {
        setLoading(true);
        try {
            const { data: response } = await schedulesService.create(newSchedule);
            setSchedules(prev => [...prev, response.data]);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };


    const editSchedule = async (id, updated) => {
        setLoading(true);
        try {
            const { data: response } = await schedulesService.update(id, updated);
            setSchedules(prev =>
                prev.map(u => (u.id === id ? response.data : u))
            );
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteSchedule = async (id) => {
        try {
            await schedulesService.remove(id);
            setSchedules(prev => prev.filter(u => u.id !== id));
        } catch (e) {
            setError(e.message);
        }
    };

    
    useEffect(() => {
        getSchedules();
    }, []);

    return (
        <ScheduleContext.Provider
            value={{
                schedules,
                loading,
                error,
                getSchedules,
                loadSchedules,
                addSchedule,
                editSchedule,
                deleteSchedule
            }}
        >
            {children}
        </ScheduleContext.Provider>
    );
};

export const useScheduleContext = () => {
    return useContext(ScheduleContext);
};
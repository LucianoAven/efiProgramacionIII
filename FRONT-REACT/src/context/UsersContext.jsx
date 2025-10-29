import { createContext, useState, useEffect, useContext, useCallback } from "react";
import usersService from "../services/users";

export const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getUsers = useCallback(async () => {
        setLoading(true);
        try {
            const { data: response } = await usersService.list();
            console.log("Respuesta usuarios:", response);
            setUsers(Array.isArray(response.data) ? response.data : []);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);


    const getProfile = useCallback(async () => {
        setLoading(true);
        try {
            const { data: response } = await usersService.getProfile();
            console.log("Respuesta perfil usuario:", response);
            if (response?.data) {
                setCurrentUser(response.data);
            }
        } catch (error) {
            console.error("Error al obtener el perfil:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const editUser = async (id, updated) => {
        setLoading(true);
        try {
            await usersService.update(id, updated);
            setUsers(prev =>
                prev.map(u => (u.id === id ? { ...updated, id: id } : u))
            );
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        getProfile(); // Solo cargamos el perfil del usuario cuando se monta el componente
    }, [getProfile]);

    return (
        <UserContext.Provider
            value={{
                users,
                currentUser,
                loading,
                error,
                getUsers,
                getProfile,
                editUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
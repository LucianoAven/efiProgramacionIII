import { createContext, useState, useEffect, useContext } from "react";
import employeesService from "../services/employees";

export const EmployeeContext = createContext();


export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lazy, setLazy] = useState({
        first: 0,
        rows: 10,
        page:0,
        q:''
    })
    const [total, setTotal] = useState(null)

    const getEmployees = async () => {
        setLoading(true);
        try {
            const page = lazy.page + 1
            const limit = lazy.rows
            const q = lazy.q || ''
            const { data: response } = await employeesService.listPaged({page, limit, q});
            console.log("Respuesta empleados:", response);
            setEmployees(Array.isArray(response.data) ? response.data : []);
            setTotal(Number(response?.total || 0))
        } catch (e) {
            setError(e.message);
            setEmployees([])
            setTotal(0)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEmployees();
    }, [lazy.page, lazy.rows, lazy.q]);

    const addEmployee = async (newEmployee) => {
        setLoading(true);
        try {
            const { data: response } = await employeesService.create(newEmployee);
            // En lugar de añadir manualmente, recargamos la página actual para ver el nuevo total
            await getEmployees();
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const editEmployee = async (id, updated) => {
        setLoading(true);
        try {
            await employeesService.update(id, updated);
            // Recargamos la página actual para mantener la consistencia
            await getEmployees();
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteEmployee = async (id) => {
        setLoading(true);
        try {
            await employeesService.remove(id);
            // Recargamos para actualizar el total y la paginación correctamente
            await getEmployees();
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <EmployeeContext.Provider
            value={{
                employees,
                loading,
                error,
                getEmployees,
                addEmployee,
                editEmployee,
                deleteEmployee,
                total,
                lazy,
                setLazy,
            }}
        >
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployeeContext = () => {
    return useContext(EmployeeContext);
};

import { useUserContext } from '../../context/UsersContext';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';  
import { Column } from 'primereact/column';        
import { Button } from 'primereact/button';   

export default function UserEmployeeSchedules() {
  const { currentUser, loading, error } = useUserContext();
  const [employeeSchedules, setEmployeeSchedules] = useState([]);
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    if (currentUser && currentUser.employees && currentUser.employees.length > 0) {
      const employee = currentUser.employees[0]; // Tomamos el primer empleado
      setEmployeeData(employee);
      
      // Si el empleado tiene horarios, los establecemos
      if (employee.schedules && employee.schedules.length > 0) {
        setEmployeeSchedules(employee.schedules);
      } else {
        setEmployeeSchedules([]);
      }
    }
  }, [currentUser]);

  return (
    <div>
      <h2><i className="pi pi-clock" /> Mis Horarios <i className="pi pi-clock" /></h2>

      <div className="flex justify-content-between align-items-center mb-3">
        <Link to="/usuarios/empleado">
          <Button label="Volver a Mi Perfil Empleado" icon="pi pi-arrow-left" className="p-button-rounded p-button-info" />
        </Link>
        <Link to="/usuarios/perfil">
          <Button label="Volver a Mi Perfil" icon="pi pi-home" className="p-button-rounded p-button-secondary" />
        </Link>
      </div>

      {loading && <p>Cargando mis horarios...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}      {employeeSchedules.length > 0 ? (
        <DataTable value={employeeSchedules} paginator={false} className="p-datatable-sm p-shadow-2 mt-4">
          <Column field="date" header="Fecha" />
          <Column field="startTime" header="Hora de Inicio" />
          <Column field="endTime" header="Hora de Finalización" />
          <Column 
            header="Acciones"
            headerStyle={{ textAlign: 'center' }}
            style={{ textAlign: 'center' }}
            body={(rowData) => (
              <Link to={`/solicitudes-horarios/crear-desde-horario/${rowData.id}?from=user-schedules`}>
                <Button label="Solicitar Cambio" icon="pi pi-calendar-plus" className="p-button-rounded p-button-warning" />
              </Link>
            )}
          />
        </DataTable>
      ) : (
        <div>
          <p>No tienes horarios asignados actualmente.</p>
          {employeeData && (
            <Link to={`/solicitudes-horarios/crear-empleado/${employeeData.id}?from=user-schedules`}>
              <Button label="Solicitar Primer Horario" icon="pi pi-plus" className="p-button-rounded p-button-success mt-3" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

import { useUserContext } from '../../context/UsersContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';  
import { Column } from 'primereact/column';        
import { Button } from 'primereact/button';   

export default function UserEmployeeProfile() {
  const { currentUser, loading, error } = useUserContext();
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    if (currentUser && currentUser.employees && currentUser.employees.length > 0) {
      // Como un usuario puede tener un solo empleado activo, tomamos el primero
      setEmployeeData(currentUser.employees[0]);
    }
  }, [currentUser]);

  return (
    <div>

      {/* Marco tipo cuadro */}
      <div className="profile-frame">
        <h2> <i className="pi pi-briefcase" /> Mi Perfil de Empleado <i className="pi pi-briefcase" /></h2>

        <div className="flex justify-content-between align-items-center mb-3">
          <Link to="/usuarios/empleado/horarios">
            <Button label="Mis Horarios" icon="pi pi-clock" className="p-button-rounded p-button-success" />
          </Link>

          <Link to="/usuarios/empleado/solicitudes-horarios">
            <Button label="Mis Solicitudes de Horarios" icon="pi pi-calendar" className="p-button-rounded p-button-warning" />
          </Link>
          
          <Link to="/usuarios/perfil">
            <Button label="Volver a Mi Perfil" icon="pi pi-arrow-left" className="p-button-rounded p-button-info" />
          </Link>
        </div>

        {loading && <p>Cargando perfil de empleado...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {employeeData ? (
          <DataTable 
            value={[employeeData]}
            className="p-datatable-sm p-shadow-2 mt-4">
            <Column 
              header="Nombre" 
              body={() => currentUser?.name || 'Sin nombre'} 
            />
            <Column field="position" header="Posición" />
            <Column 
              header="Fecha de Alta"
              body={() => {
                const date = new Date(employeeData.hiringDate);
                return date.toLocaleDateString('es-ES');
              }}
            />
            <Column 
              header="Estado" 
              body={() => (
                <span className={`status-badge ${employeeData.status ? 'active' : 'inactive'}`}>
                  {employeeData.status ? 'Activo' : 'Inactivo'}
                </span>
              )}
            />

            <Column 
              header="Acciones"
              headerStyle={{ textAlign: 'center' }}
              style={{ textAlign: 'center' }}
              body={(rowData) => (
                <Link to={`/usuarios/empleado/solicitudes-horarios/crear/${rowData.id}`}>
                  <Button label="Solicitar Cambio de Horario" icon="pi pi-calendar-plus" className="p-button-rounded p-button-warning" />
                </Link>
              )}
            />

          </DataTable>
        ) : (
          <p>No se encontraron datos del empleado. Es posible que no tengas un perfil de empleado asignado.</p>
        )}
      </div>
    </div>
  );
}

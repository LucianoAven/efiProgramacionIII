import { useUserContext } from '../../context/UsersContext';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';  
import { Column } from 'primereact/column';        
import { Button } from 'primereact/button';   
import scheduleRequestsService from '../../services/scheduleRequests';

export default function UserEmployeeScheduleRequests() {
  const { currentUser, loading, error } = useUserContext();
  const [employeeScheduleRequests, setEmployeeScheduleRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [errorRequests, setErrorRequests] = useState(null);

  useEffect(() => {
    const fetchMyScheduleRequests = async () => {
      if (currentUser) {
        setLoadingRequests(true);
        try {
          const { data: response } = await scheduleRequestsService.myRequests();
          setEmployeeScheduleRequests(response.data || []);
        } catch (err) {
          setErrorRequests(err.response?.data?.message || 'Error al cargar solicitudes');
        } finally {
          setLoadingRequests(false);
        }
      }
    };

    fetchMyScheduleRequests();
  }, [currentUser]);

  return (
    <div>

      {/* Marco tipo cuadro */}
      <div className="profile-frame">

        <h2><i className="pi pi-calendar-plus" /> Mis Solicitudes de Horarios <i className="pi pi-calendar-plus" /></h2>

        <div className="flex justify-content-between align-items-center mb-3">
          <Link to="/usuarios/empleado">
            <Button label="Volver a Mi Perfil Empleado" icon="pi pi-arrow-left" className="p-button-rounded p-button-info" />
          </Link>
          <Link to="/usuarios/perfil">
            <Button label="Volver a Mi Perfil" icon="pi pi-home" className="p-button-rounded p-button-secondary" />
          </Link>
        </div>

        {loading && <p>Cargando usuario...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}      
        {loadingRequests && <p>Cargando mis solicitudes...</p>}
        {errorRequests && <p style={{ color: 'red' }}>{errorRequests}</p>}      
        {employeeScheduleRequests.length > 0 ? (
          <DataTable value={employeeScheduleRequests} paginator={false} className="p-datatable-sm p-shadow-2 mt-4">
            <Column field="requestDate" header="Fecha de solicitud" />
            <Column field="startTime" header="Hora de Inicio" />
            <Column field="endTime" header="Hora de Finalización" />
            <Column field="status" header="Estado" />
          </DataTable>
        ) : (
          <div>
            <p>No hay solicitudes de horarios registradas actualmente.</p>
          </div>
        )}

      </div>
    </div>
  );
}

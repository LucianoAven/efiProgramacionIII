import { useScheduleRequestContext } from '../../context/ScheduleRequestsContext';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useRef } from 'react';
import { exportToPDF } from '../../utils/ExportToPdf';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';  
import { Column } from 'primereact/column';        
import { Button } from 'primereact/button';   
import { Toast } from 'primereact/toast';

export default function ScheduleRequestsView() {
  const { scheduleRequests, loading, error } = useScheduleRequestContext();
  const { user } = useContext(AuthContext);
  const isAdmin = user?.rol?.toLowerCase() === 'admin';

  const toast = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Si venimos del formulario con un mensaje, lo mostramos y limpiamos el state
  useEffect(() => {
    const msg = location.state?.toast;
    if (msg && toast.current) {
      toast.current.show({
        severity: msg.severity || 'success',
        summary: msg.summary,
        detail: msg.detail,
        life: msg.life ?? 3000
      });
      // Limpiar el state para no repetir el toast al navegar atrás/adelante
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);

  return (
    <div>
      <Toast ref={toast} />

      <h2><i className="pi pi-calendar-plus" /> Lista de Solicitudes de Horario <i className="pi pi-calendar-plus" /></h2>

      <div className="flex justify-content-end align-items-center mb-3">
        <Link to="/">
          <Button label="Volver al inicio" icon="pi pi-home" className="p-button-rounded p-button-secondary" />
        </Link>
      </div>

      {loading && <p>Cargando solicitudes de horarios...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <DataTable value={Array.isArray(scheduleRequests) ? scheduleRequests : []} paginator={false} className="p-datatable-sm p-shadow-2 mt-4">
        <Column 
          header="Nombre del Empleado" 
          body={(rowData) => rowData.employee?.user?.name || `Empleado ID: ${rowData.employeeId}`} 
        />
        <Column field="requestDate" header="Fecha Solicitada" />
        <Column field="startTime" header="Hora de Inicio" />
        <Column field="endTime" header="Hora de Finalizacion" />
        <Column field="status" header="Estado" />

        {isAdmin && ( 
          <Column 
            header="Acciones"
            headerStyle={{ textAlign: 'center' }}
            style={{ textAlign: 'center' }}
            body={(rowData) => (
              <>
                <Link to={`/solicitudes-horarios/editar/${rowData.id}`}>
                  <Button label="Editar Estado" icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" />
                </Link>
              </>
            )}
          />
        )}

      </DataTable>
    </div>
  );
}

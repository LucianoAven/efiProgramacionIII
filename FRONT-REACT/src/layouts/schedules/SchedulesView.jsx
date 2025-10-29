import { AuthContext } from '../../context/AuthContext';
import { useScheduleContext } from '../../context/SchedulesContext';
import { exportToPDF } from '../../utils/ExportToPdf';

import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { DataTable } from 'primereact/datatable';  
import { Column } from 'primereact/column';        
import { Button } from 'primereact/button';   
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

export default function SchedulesView() {
  const { schedules, deleteSchedule, loading, error, loadSchedules } = useScheduleContext();
  const { user } = useContext(AuthContext)
  const isAdmin = user?.rol?.toLowerCase() === 'admin';

  const toast = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Estados para los filtros
  const [employeeName, setEmployeeName] = useState('');
  const [filterDate, setFilterDate] = useState(null);
  const [filteredSchedules, setFilteredSchedules] = useState([]);

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
      // limpiar el state para no repetir el toast al navegar atrás
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);

  // Cargar horarios inicialmente
  useEffect(() => {
    setFilteredSchedules(schedules);
  }, [schedules]);

  // Función para aplicar filtros
  const applyFilters = () => {
    const params = {};
    
    if (employeeName.trim()) {
      params.employeeName = employeeName.trim();
    }
    
    if (filterDate) {
      // Formatear fecha como YYYY-MM-DD
      const formattedDate = filterDate.toLocaleDateString('en-CA');
      params.date = formattedDate;
    }

    loadSchedules(params);
  };

  // Función para limpiar filtros
  const clearFilters = () => {
    setEmployeeName('');
    setFilterDate(null);
    loadSchedules();
  };

  const onDelete = async (id, employeeId) => {
    try {
      await deleteSchedule(id);
      toast.current?.show({
        severity: 'success',
        summary: 'Producto eliminado',
        detail: `Se eliminó el horario del empleado con ID "${employeeId}"`,
        life: 2500
      });
    } catch (e) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error al eliminar',
        detail: e?.message || 'No se pudo eliminar el horario',
        life: 3000
      });
    }
  };

  const handleExport = () => {
    // Preparar los datos con nombres de columnas en español y datos procesados
    const pdfData = schedules.map(schedule => ({
      'Nombre del Empleado': schedule.employee?.user?.name || `Empleado ID: ${schedule.employeeId}`,
      'Fecha': schedule.date,
      'Hora de Inicio': schedule.startTime,
      'Hora de Finalización': schedule.endTime
    }));

    const columnHeaders = ['Nombre del Empleado', 'Fecha', 'Hora de Inicio', 'Hora de Finalización'];
    exportToPDF(pdfData, 'Horarios', columnHeaders);
  };

  return (
    <div>
      <Toast ref={toast} />

      <h2><i className="pi pi-box" /> Lista de Horarios <i className="pi pi-box" /></h2>

      {/* Filtros */}
      <div className="p-card p-shadow-2 mb-4">
        <div className="p-card-body">
          <h5>Filtros</h5>
          <div className="p-grid p-formgrid">
            <div className="p-col-12 p-md-4">
              <label htmlFor="employeeName" className="p-d-block p-mb-2">Nombre del Empleado:</label>
              <InputText
                id="employeeName"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                placeholder="Escriba el nombre del empleado"
                className="w-full"
              />
            </div>
            <div className="p-col-12 p-md-4">
              <label htmlFor="filterDate" className="p-d-block p-mb-2">Fecha:</label>
              <Calendar
                id="filterDate"
                value={filterDate}
                onChange={(e) => setFilterDate(e.value)}
                dateFormat="dd/mm/yy"
                placeholder="Seleccione una fecha"
                className="w-full"
                showIcon
              />
            </div>
            <div className="p-col-12 p-md-4 flex align-items-end gap-2">
              <Button 
                label="Aplicar Filtros" 
                icon="pi pi-search" 
                onClick={applyFilters}
                className="p-button-primary"
              />
              <Button 
                label="Limpiar" 
                icon="pi pi-times" 
                onClick={clearFilters}
                className="p-button-secondary"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-content-end align-items-center mb-3">
        <Link to="/">
          <Button label="Volver al inicio" icon="pi pi-home" className="p-button-rounded p-button-secondary" />
        </Link>

        <Button label="Exportar PDF" icon="pi pi-file-pdf" className="p-button-rounded p-button-warning" onClick={handleExport} />

      </div>

      {loading && <p>Cargando horarios...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <DataTable value={Array.isArray(schedules) ? schedules : []} paginator={false} className="p-datatable-sm p-shadow-2 mt-4">
        <Column 
          header="Nombre del Empleado" 
          body={(rowData) => rowData.employee?.user?.name || `Empleado ID: ${rowData.employeeId}`} 
        />
        <Column field="date" header="Fecha" />
        <Column field="startTime" header="Hora de Inicio" />
        <Column field="endTime" header="Hora de Finalizacion" />

        {isAdmin && (
          <Column
            header="Acciones"
            headerStyle={{ textAlign: 'center' }}
            style={{ textAlign: 'center' }}
            body={(rowData) => (
              <>
                <Link to={`/solicitudes-horarios/crear-desde-horario/${rowData.id}?from=schedules`}>
                  <Button label="Cambiar Horario" icon="pi pi-clock" className="p-button-rounded p-button-info mr-2" />
                </Link>
                <Link to={`/horarios/editar/${rowData.id}`}>
                  <Button label="Editar" icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" />
                </Link>
                <Button 
                  label="Eliminar" 
                  icon="pi pi-trash" 
                  className="p-button-rounded p-button-danger" 
                  onClick={() => onDelete(rowData.id, rowData.employeeId)} 
                />
              </>
            )}
          />
        )}

      </DataTable>
    </div>
  );
}

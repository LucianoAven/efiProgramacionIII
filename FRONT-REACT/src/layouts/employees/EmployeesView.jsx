import { useEmployeeContext } from '../../context/EmployeesContext';
import { exportToPDF } from '../../utils/ExportToPdf';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';  
import { Column } from 'primereact/column';        
import { Button } from 'primereact/button';   
import { InputText } from 'primereact/inputtext';

export default function EmployeesView() {
  const { employees, deleteEmployee, loading, error, lazy, setLazy, total } = useEmployeeContext();

  // console.log('Empleados recibidos:', employees); // Temporal para debug

  const handleExport = () => {
    const employeesFormatted = employees.map(emp => ({
      nombre: emp.user?.name || 'Sin nombre',
      posicion: emp.position,
      fechaContratacion: new Date(emp.hiringDate).toLocaleDateString('es-ES')
    }));
    exportToPDF(employeesFormatted, 'Empleados', ['nombre', 'posicion', 'fechaContratacion']);
  };

  return (
    <div>
      <h2>Lista de Empleados</h2>
      <div className="flex justify-content-between align-items-center mb-3">
        <div>
          <Link to="/">
            <Button label="Volver al inicio" icon="pi pi-home" className="p-button-rounded p-button-secondary mr-2" />
          </Link>
          <Button label="Exportar PDF" icon="pi pi-file-pdf" className="p-button-rounded p-button-warning" onClick={handleExport} />
        </div>
        <Link to="/usuarios">
          <Button label="Crear Empleado desde Usuarios" icon="pi pi-plus" className="p-button-rounded p-button-success" />
        </Link>
      </div>

      {loading && <p>Cargando empleados...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <span>Buscar: </span>
      <InputText 
      value={lazy?.q}
      onChange={(e)=> setLazy({...lazy, q: e.target.value, first:0, page:0})}
      placeholder='Nombre del empleado'/>

      <DataTable 
      value={Array.isArray(employees) ? employees : []} 
      paginator
      lazy
      totalRecords={total}
      first={lazy.first}
      rows={lazy.rows}
      onPage={(e)=>setLazy(e)} // e = {first, rows, page}
      emptyMessage={lazy.q ? 'La busqueda no coincide': 'No hay empleados registrados'}
      className="p-datatable-sm p-shadow-2 mt-4">
        <Column 
          header="Nombre" 
          body={(rowData) => rowData.user?.name || 'Sin nombre'} 
        />
        <Column field="position" header="Posicion" />
        <Column 
          header="Fecha de Alta"
          body={(rowData) => {
            const date = new Date(rowData.hiringDate);
            return date.toLocaleDateString('es-ES');
          }}
        />
        <Column 
          header="Estado" 
          body={(rowData) => (
            <span className={`status-badge ${rowData.status ? 'active' : 'inactive'}`}>
              {rowData.status ? 'Activo' : 'Inactivo'}
            </span>
          )}
        />

        <Column 
          header="Acciones" 
          body={(rowData) => (
            <>
              <Link to={`/horarios/crear/${rowData.id}`}>
                <Button label="Asignar Horario" icon="pi pi-clock" className="p-button-rounded p-button-info mr-2" />
              </Link>
              <Link to={`/empleados/editar/${rowData.id}`}>
                <Button label="Editar" icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" />
              </Link>
              <Button 
                label="Eliminar"
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
                onClick={() => deleteEmployee(rowData.id)}
              />
            </>
          )}
        />
      </DataTable>
    </div>
  );
}

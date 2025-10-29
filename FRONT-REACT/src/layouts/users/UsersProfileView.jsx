import { useUserContext } from '../../context/UsersContext';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';  
import { Column } from 'primereact/column';        
import { Button } from 'primereact/button';   

export default function UsersProfileView() {
  const { currentUser, loading, error } = useUserContext();

  return (
      <div className="flex flex-column">
        <h2>👤 Mi Perfil 👤</h2>
        <div className="flex justify-content-end align-items-center mb-3">
          <Link to="/">
            <Button label="Volver al inicio" icon="pi pi-home" className="p-button-rounded p-button-secondary" />
          </Link>
        </div>

      {loading && <p>Cargando perfil...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {currentUser ? (
        <DataTable value={[currentUser]} className="p-datatable-sm p-shadow-2 mt-4">
        <Column field="name" header="Nombre" />
        <Column field="email" header="Email" />
        <Column field="rol" header="Rol" />
        <Column 
            header="Estado" 
            body={(rowData) => (
                <span className={`status-badge ${rowData.is_active ? 'active' : 'inactive'}`}>
                    {rowData.is_active ? 'Activo' : 'Inactivo'}
                </span>
            )}
        />

        <Column 
          header="Acciones" 
          body={(rowData) => (
            <>
              <Link to="/usuarios/empleado">
                <Button label="Perfil Empleado" icon="pi pi-user" className="p-button-rounded p-button-success mr-2" />
              </Link>
            </>
          )}
        />
        </DataTable>
      ) : (
        <p>No se encontraron datos del perfil.</p>
      )}
    </div>
  );
}

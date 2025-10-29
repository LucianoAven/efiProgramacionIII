import { useUserContext } from '../../context/UsersContext';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';  
import { Column } from 'primereact/column';        
import { Button } from 'primereact/button';   
import { useEffect } from 'react';

export default function UsersView() {
  const { users, deleteUser, loading, error, getUsers } = useUserContext();
  
  useEffect(() => {
    getUsers(); // Cargar usuarios solo cuando se monte esta vista
  }, [getUsers]);

  return (
      <div className="flex flex-column">
        <h2>👤 Lista de Usuarios 👤</h2>
        <div className="flex justify-content-end align-items-center mb-3">
          <Link to="/">
            <Button label="Volver al inicio" icon="pi pi-home" className="p-button-rounded p-button-secondary" />
          </Link>
        </div>

      {loading && <p>Cargando usuarios...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <DataTable value={Array.isArray(users) ? users : []} paginator={false} className="p-datatable-sm p-shadow-2 mt-4">
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
              <Link to={`/empleados/crear/${rowData.id}`}>
                <Button label="Alta" icon="pi pi-eye" className="p-button-rounded p-button-info mr-2" />
              </Link>
              <Link to={`/usuarios/editar/${rowData.id}`}>
                <Button label="Editar rol/estado" icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" />
              </Link>
            </>
          )}
        />
      </DataTable>
    </div>
  );
}

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button'; 
import { AuthContext } from '../../context/AuthContext';
import { Toolbar } from 'primereact/toolbar';
import { ProtectedButton } from '../../components/ProtectedButton';

import UserBadge from '../../components/UserBadge';

const HomeView = () => {
  const {user, logout} = useContext(AuthContext)

  const leftContents = (
    <p className='brand-badge pi pi-bolt'>UsPro</p>
  );

  const rightContents = (
    user ? (
    <div className="flex gap-2">
      <Link to="/usuarios">
        <ProtectedButton allowedRole={['admin']} label="Ir a Usuarios" className='buttons' />
      </Link>

      <Link to="/empleados">
        <ProtectedButton allowedRole={['admin']} label="Ir a Empleados" className='buttons' />
      </Link>

      <Link to="/horarios">
        <ProtectedButton allowedRole={['admin']} label="Ir a Horarios" className='buttons' />
      </Link>

      <Link to="/solicitudes-horarios">
        <ProtectedButton allowedRole={['admin']} label="Ir a Solicitudes de Horarios" className='buttons' />
      </Link>

      {/* Botones específicos para empleados */}
      <Link to="/usuarios/perfil">
        <ProtectedButton allowedRole={['empleado']} label="Ver Perfil" className='buttons' />
      </Link>

      <Button label='Cerrar Sesión' onClick={logout} className='buttons' />
    </div>
    ) : (
    <div className="flex gap-2">
      <Link to="/registro">
        <Button label="Registro" icon="pi pi-user-plus" className='buttons' />
      </Link>
      <Link to="/inicio-sesion">
        <Button label="Iniciar Sesión" icon="pi pi-sign-in" className='buttons' />
      </Link>        
    </div>
    )
    );

  return (

    <div style={{ textAlign: 'center' }}>

      <div className='navbar-container' style={{ textAlign: 'center', padding: '0 20px 270px' }}>
        <Toolbar className='navbar' left={leftContents} right={rightContents} style={{ backgroundColor: '#262731ff', color: '#fff'}} />

        <div className="user-badge-row">
          <UserBadge />
        </div>        

        <div className="page-content">
          <h1 className='text'>Bienvenido a Gestion de Empleados y Horarios</h1>
          <h2 className='text'>EFI</h2>
          <h3 className='text'>Realizada con React y NodeJS-Express</h3>        
        </div>
      </div>

    </div>
  );
};

export default HomeView;


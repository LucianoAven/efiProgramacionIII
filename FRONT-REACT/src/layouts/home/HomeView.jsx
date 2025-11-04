import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button'; 
import { AuthContext } from '../../context/AuthContext';
import { Toolbar } from 'primereact/toolbar';
import { ProtectedButton } from '../../components/ProtectedButton';

import UserBadge from '../../components/UserBadge';

const HomeView = () => {
  const {user, logout} = useContext(AuthContext)

  const startContents = (
    <div className="flex align-items-center">
      <i className="pi pi-sitemap" style={{ fontSize: '1.5rem', color: 'orangered', marginRight: '12px' }}></i>
      <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff' }}>WorkFlow Pro</span>
    </div>
  );

  const endContents = (
    user ? (
    <div className="flex gap-1">
      <Link to="/usuarios">
        <ProtectedButton allowedRole={['admin']} label="Usuarios" icon="pi pi-users" className='p-button-outlined p-button-sm' />
      </Link>

      <Link to="/empleados">
        <ProtectedButton allowedRole={['admin']} label="Empleados" icon="pi pi-id-card" className='p-button-outlined p-button-sm' />
      </Link>

      <Link to="/horarios">
        <ProtectedButton allowedRole={['admin']} label="Horarios" icon="pi pi-calendar" className='p-button-outlined p-button-sm' />
      </Link>

      <Link to="/solicitudes-horarios">
        <ProtectedButton allowedRole={['admin']} label="Solicitudes" icon="pi pi-send" className='p-button-outlined p-button-sm' />
      </Link>

      {/* Botones específicos para empleados */}
      <Link to="/usuarios/perfil">
        <ProtectedButton allowedRole={['empleado']} label="Mi Perfil" icon="pi pi-user" className='p-button-outlined p-button-sm' />
      </Link>

      <Button 
        label='Salir' 
        icon="pi pi-sign-out"
        onClick={logout} 
        className='p-button-outlined p-button-danger p-button-sm' 
      />
    </div>
    ) : (
    <div className="flex gap-2">
      <Link to="/registro">
        <Button label="Registro" icon="pi pi-user-plus" className='p-button-outlined p-button-sm' />
      </Link>
      <Link to="/inicio-sesion">
        <Button label="Iniciar Sesión" icon="pi pi-sign-in" className='p-button-outlined p-button-sm' />
      </Link>        
    </div>
    )
    );

  return (

    <div style={{ textAlign: 'center' }}>

      <div className='navbar-container' style={{ textAlign: 'center', padding: '0 20px 80px' }}>
        <Toolbar className='navbar' start={startContents} end={endContents} style={{ backgroundColor: '#262731ff', color: '#fff'}} />

        <div className="user-badge-row">
          <UserBadge />
        </div>        

        <div className="page-content">
          <h1 className='text' style={{ color: '#fff', marginBottom: '1rem' }}>
            <i className="pi pi-sitemap"></i> WorkFlow Pro
          </h1>
          <h2 className='text'>Sistema de Gestión de Empleados y Horarios</h2>
          <h3 className='text' style={{ fontWeight: 'normal', opacity: '0.8' }}>
            Plataforma profesional desarrollada con React y NodeJS
          </h3>        
        </div>
      </div>

    </div>
  );
};

export default HomeView;


import { Routes, Route } from 'react-router-dom';
import UsersView from './UsersView';
import UserForm from './UserForm';
import UsersProfileView from './UsersProfileView';
import UserEmployeeProfile from './UserEmployeeProfile';
import UserEmployeeSchedules from './UserEmployeeSchedules';
import UserEmployeeScheduleRequests from './UserEmployeeScheduleRequests';
import UserEmployeeScheduleRequestsForm from './UserEmployeeScheduleRequestsForm';

import { RequireRole } from '../../utils/RequireRole';

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={
        <RequireRole roles={['admin']}>
          <UsersView />
        </RequireRole>
      } />
      <Route path="/crear" element={
        <RequireRole roles={['admin']}>
          <UserForm />
        </RequireRole>
      } />
 
      <Route path="/editar/:id" element={
        <RequireRole roles={['admin']}>
          <UserForm />
        </RequireRole>
      } />

      <Route path="/perfil" element={
        <RequireRole roles={['admin', 'empleado']}>
          <UsersProfileView />
        </RequireRole>
      } />
      
      <Route path="/empleado" element={
        <RequireRole roles={['admin', 'empleado']}>
          <UserEmployeeProfile />
        </RequireRole>
      } />
      
      <Route path="/empleado/horarios" element={
        <RequireRole roles={['admin', 'empleado']}>
          <UserEmployeeSchedules />
        </RequireRole>
      } />

      <Route path="/empleado/solicitudes-horarios" element={
        <RequireRole roles={['admin', 'empleado']}>
          <UserEmployeeScheduleRequests />
        </RequireRole>
      } />
 
      <Route path="/empleado/solicitudes-horarios/crear/:scheduleId" element={
        <RequireRole roles={['admin', 'empleado']}>
          <UserEmployeeScheduleRequestsForm />
        </RequireRole>
      } />
      
    </Routes>
  );
}
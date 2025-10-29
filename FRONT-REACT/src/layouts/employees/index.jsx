import { Routes, Route, useLocation } from 'react-router-dom';
import EmployeesView from './EmployeesView';
import EmployeeForm from './EmployeeForm';

import { RequireRole } from '../../utils/RequireRole';

export default function EmployeeRoutes() {

  return (
    <Routes>
      {/* Admin routes - /empleados/* */}
      <Route path="/" element={
        <RequireRole roles={['admin']}>
          <EmployeesView />
        </RequireRole>
      } />
      <Route path="/crear/:id" element={
        <RequireRole roles={['admin']}>
          <EmployeeForm />
        </RequireRole>
      } />
      <Route path="/editar/:id" element={
        <RequireRole roles={['admin']}>
          <EmployeeForm />
        </RequireRole>
      } />

    </Routes>
  );
}

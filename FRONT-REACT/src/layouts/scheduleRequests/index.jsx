import { Routes, Route } from 'react-router-dom';
import ScheduleRequestsView from './ScheduleRequestsView';
import ScheduleRequestForm from './ScheduleRequestForm';

import PrivateRoute from '../../utils/PrivateRoute';
import { RequireRole } from '../../utils/RequireRole';

export default function ScheduleRequestRoutes() {
  return (
    <Routes>
      <Route path="/" element={
        <RequireRole roles={['admin']}>
          <ScheduleRequestsView />
        </RequireRole>
      } />
      <Route path="/crear-desde-horario/:scheduleId" element={
        <RequireRole roles={['empleado', 'admin']}>
          <ScheduleRequestForm />
        </RequireRole>
      } />
      <Route path="/editar/:requestId" element={
        <RequireRole roles={['admin']}>
          <ScheduleRequestForm />
        </RequireRole>
      } />
    </Routes>
  );
}

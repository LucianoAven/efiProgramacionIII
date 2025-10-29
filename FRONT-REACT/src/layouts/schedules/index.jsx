import { Routes, Route } from 'react-router-dom';
import SchedulesView from './SchedulesView';
import ScheduleForm from './ScheduleForm';

import { RequireRole } from '../../utils/RequireRole';

export default function ScheduleRoutes() {
  return (
    <Routes>
      <Route path="/" element={
        <RequireRole roles={['admin']}>
          <SchedulesView />
        </RequireRole>
      } />
      <Route path="/crear/:employeeId" element={
        <RequireRole roles={['admin']}>
          <ScheduleForm />
        </RequireRole>
      } />
      <Route path="/editar/:scheduleId" element={
        <RequireRole roles={['admin']}>
          <ScheduleForm />
        </RequireRole>
      } />
    </Routes>
  );
}

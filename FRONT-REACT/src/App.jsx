import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './layouts/home/index';

import UserRoutes from './layouts/users/index';
import { UserProvider } from './context/UsersContext'

import EmployeeRoutes from './layouts/employees/index';
import { EmployeeProvider } from './context/EmployeesContext';

import ScheduleRoutes from './layouts/schedules/index';
import { ScheduleProvider } from './context/SchedulesContext';

import ScheduleRequestRoutes from './layouts/scheduleRequests/index';
import { ScheduleRequestProvider } from './context/ScheduleRequestsContext';

import { AuthProvider } from './context/AuthContext';
import LoginForm from './layouts/auth/LoginForm';
import RegisterForm from './layouts/auth/RegisterForm';
import ForgotPassword from './layouts/auth/ForgotPassword';
import ResetPassword from './layouts/auth/ResetPassword';
import PrivateRoute from './utils/PrivateRoute';
import { RequireRole } from './utils/RequireRole';

import './App.css';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <Router>
        <AuthProvider>
          <Fragment>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/inicio-sesion' element={<LoginForm/>}/>
              <Route path='/registro' element={<RegisterForm/>}/>
              <Route path='/clave-olvidada' element={<ForgotPassword/>}/>
              <Route path='/recuperar-contraseña' element={<ResetPassword/>}/>
              <Route
                path="/usuarios/*"
                element={
                  <PrivateRoute>
                    <UserProvider>
                      <EmployeeProvider>
                        <ScheduleProvider>
                          <UserRoutes />
                        </ScheduleProvider>
                      </EmployeeProvider>
                    </UserProvider>
                  </PrivateRoute>
                }
              />
              <Route
                path="/empleados/*"
                element={
                  <PrivateRoute>
                    <EmployeeProvider>
                      <EmployeeRoutes />
                    </EmployeeProvider>
                  </PrivateRoute>
                }
              />
              <Route
                path="/horarios/*"
                element={
                  <PrivateRoute>
                    <ScheduleProvider>
                      <ScheduleRoutes />
                    </ScheduleProvider>
                  </PrivateRoute>
                }
              />
              <Route
                path="/solicitudes-horarios/*"
                element={
                  <PrivateRoute>
                    <EmployeeProvider>
                      <ScheduleProvider>
                        <ScheduleRequestProvider>
                          <ScheduleRequestRoutes />
                        </ScheduleRequestProvider>
                      </ScheduleProvider>
                    </EmployeeProvider>
                  </PrivateRoute>
                }
              />
            </Routes>
          </Fragment>
        </AuthProvider>
      </Router>
  );
}

export default App;

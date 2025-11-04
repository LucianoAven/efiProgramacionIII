import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useScheduleRequestContext } from "../../context/ScheduleRequestsContext"; 
import { useScheduleContext } from "../../context/SchedulesContext";
import { useEmployeeContext } from "../../context/EmployeesContext";
import { useUserContext } from "../../context/UsersContext";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const validationSchema = Yup.object({
  employeeId: Yup.number()
      .required("El ID del empleado es requerido"),
      
  requestDate: Yup.date()
      .typeError("La fecha de solicitud debe ser una fecha válida")
      .required("La fecha de solicitud es requerida"),

  startTime: Yup.string()
      .typeError("La hora de inicio debe ser una hora válida")
      .required("La hora de inicio es requerida"),

  endTime: Yup.string()
      .typeError("La hora de fin debe ser una hora válida")
      .required("La hora de fin es requerida"),

  status: Yup.string()
      .trim()
      .required("El estado es requerido"),
});


export default function UserEmployeeScheduleRequestForm() {
  const { scheduleRequests, addScheduleRequest, editScheduleRequest } = useScheduleRequestContext();
  const { schedules } = useScheduleContext(); 
  const { employees } = useEmployeeContext();
  const { currentUser } = useUserContext(); // Obtener usuario actual con datos de empleado
  const { user } = useContext(AuthContext); // Obtener usuario logueado
  const { scheduleId, requestId, employeeId } = useParams(); // Parámetros específicos
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // Determinar si es edición basado en requestId
  const existingScheduleRequest = requestId ? scheduleRequests.find((sr) => sr.id === Number(requestId)) : null;
  const isEdit = Boolean(existingScheduleRequest);
  
  // Si es creación desde horario, buscar el horario por scheduleId
  const originalSchedule = scheduleId ? schedules.find((s) => s.id === Number(scheduleId)) : null;
  
  // Obtener información del empleado
  const employee = originalSchedule ? employees.find((e) => e.id === originalSchedule.employeeId) : null;

  const [initialValues, setInitialValues] = useState({
    employeeId: 0,
    requestDate: "",
    startTime: "",
    endTime: "",
    status: "",
  });

  const toast = useRef(null);

  useEffect(() => {
    
    // No hacer nada si no hay usuario o datos del perfil
    if (!user || !currentUser) {
      return;
    }
    
    // Obtener el empleado del usuario actual desde currentUser.employees
    const currentEmployee = currentUser.employees && currentUser.employees.length > 0 
      ? currentUser.employees[0] 
      : null;

    if (isEdit && existingScheduleRequest) {
      // Editando una solicitud existente
      setInitialValues({
        employeeId: existingScheduleRequest.employeeId || 0,
        requestDate: existingScheduleRequest.requestDate || "",
        startTime: existingScheduleRequest.startTime || "",
        endTime: existingScheduleRequest.endTime || "",
        status: existingScheduleRequest.status || "",
      });
    } else if (originalSchedule) {
      // Creando una solicitud basada en un horario existente
      setInitialValues({
        employeeId: originalSchedule.employeeId || 0,
        requestDate: new Date().toISOString().split('T')[0], // Fecha actual
        startTime: originalSchedule.startTime || "",
        endTime: originalSchedule.endTime || "",
        status: "pendiente",
      });
    } else {
      // Creando una nueva solicitud para el empleado logueado
      setInitialValues({
        employeeId: currentEmployee?.id || 0, // Usar el ID del empleado, no del usuario
        requestDate: new Date().toISOString().split('T')[0],
        startTime: "",
        endTime: "",
        status: "pendiente",
      });
    }
  }, [user, currentUser, scheduleId, requestId, employeeId, scheduleRequests, schedules, isEdit, existingScheduleRequest, originalSchedule]);

  const handleSubmit = async (values, actions) => {
    // Validaciones adicionales
    if (!values.employeeId || values.employeeId === 0) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo identificar el empleado. Por favor, recarga la página.",
        life: 3000,
      });
      return;
    }

    // Formatear datos para envío
    const formattedValues = {
      employeeId: Number(values.employeeId),
      requestDate: values.requestDate,
      startTime: values.startTime,
      endTime: values.endTime,
      status: values.status
    };

    try {
      if (requestId) {
        await editScheduleRequest(requestId, values);
        toast.current?.show({
          severity: "success",
          summary: "Solicitud actualizada",
          detail: "La solicitud de cambio de horario se actualizó correctamente",
          life: 3000,
        });
      } else {
        await addScheduleRequest(formattedValues);
        toast.current?.show({
          severity: "success",
          summary: "Solicitud creada",
          detail: "La solicitud de cambio de horario se creó correctamente",
          life: 3000,
        });
      }
      
      // Delay navigation to show toast
      setTimeout(() => {
          navigate('/usuarios/empleado/solicitudes-horarios');
      }, 1500);
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.message || "No se pudo procesar la solicitud",
        life: 3000,
      });
    }
  };

  return (
    <div className="p-d-flex p-flex-column p-align-center p-mt-3">
      <Toast ref={toast} />

      <h2>{isEdit ? "Editar" : "Crear"} Solicitud de Horario</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >

        {({ validateForm, submitForm, setTouched, isSubmitting }) => (

        <Form
          className="scheduleRequest-form"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          {/* Campo oculto para employeeId */}
          <Field name="employeeId" type="hidden" />

          <div>
            <label>Fecha:</label>
            <Field
              name="requestDate"
              type="date"
              className="p-inputtext p-component p-mb-3"
              placeholder="Fecha"
            />
            <ErrorMessage
              name="requestDate"
              component="div"
              className="p-text-danger"
            />
          </div>

          <div>
            <label>Hora de inicio:</label>
            <Field
              name="startTime"
              type="time"
              className="p-inputtext p-component p-mb-3"
              placeholder="Hora de inicio (HH:MM)"
            />
            <ErrorMessage
              name="startTime"
              component="div"
              className="p-text-danger"
            />
          </div>

          <div>
            <label>Hora de fin:</label>
            <Field
              name="endTime"
              type="time"
              className="p-inputtext p-component p-mb-3"
              placeholder="Hora de fin (HH:MM)"
            />
            <ErrorMessage
              name="endTime"
              component="div"
              className="p-text-danger"
            />
          </div>

          <div>
            <label>Estado:</label>
            <Field
              name="status"
              as="select"
              className="p-inputtext p-component p-mb-3"
              placeholder="Estado"
            >
              <option value="pendiente">Pendiente</option>
            </Field>
            <ErrorMessage
              name="status"
              component="div"
              className="p-text-danger"
            />
          </div>          

          <div className="p-d-flex p-gap-3">
            <Button
              type="button"
              label={isEdit ? "Actualizar" : "Crear"}
              className="p-button-success p-button-rounded"
              disabled={isSubmitting}
              onClick={async () => {
                const errors = await validateForm();
                if (Object.keys(errors).length) {
                  // marca todo como "tocado" para que se muestren mensajes de validación
                  setTouched(
                    Object.keys(errors).reduce((acc, k) => ({ ...acc, [k]: true }), {}),
                    true
                  );
                  toast.current?.show({
                    severity: "error",
                    summary: "Datos inválidos",
                    detail: "Revisa los campos marcados en el formulario",
                    life: 2500,
                  });
                  return;
                }
                await submitForm();
              }}
            />              

            <Button
              label="Volver"
              className="p-button-secondary p-button-rounded"
              onClick={() => {
                  navigate('/usuarios/empleado/horarios');
              }}
              type="button"
            />
          </div>
        </Form>
      )}
      </Formik>
    </div>
  );
}

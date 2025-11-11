import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useScheduleRequestContext } from "../../context/ScheduleRequestsContext"; 
import { useScheduleContext } from "../../context/SchedulesContext";
import { useEmployeeContext } from "../../context/EmployeesContext";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

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


export default function ScheduleRequestForm() {
  const { scheduleRequests, addScheduleRequest, editScheduleRequest } = useScheduleRequestContext();
  const { schedules } = useScheduleContext();
  const { employees } = useEmployeeContext();
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
    } else if (employeeId) {
      // Creando una solicitud para un empleado específico (sin horario base)
      setInitialValues({
        employeeId: Number(employeeId),
        requestDate: new Date().toISOString().split('T')[0], // Fecha actual
        startTime: "",
        endTime: "",
        status: "pendiente",
      });
    }
  }, [scheduleId, requestId, employeeId, scheduleRequests, schedules, isEdit, existingScheduleRequest, originalSchedule]);

  const handleSubmit = async (values, actions) => {
    const executeSubmit = async () => {
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
          await addScheduleRequest(values);
          toast.current?.show({
            severity: "success",
            summary: "Solicitud creada",
            detail: "La solicitud de cambio de horario se creó correctamente",
            life: 3000,
          });
        }
        
        // Delay navigation to show toast
        setTimeout(() => {
          const fromParam = searchParams.get('from');
          if (fromParam === 'user-schedules') {
            navigate('/solicitudes-horarios');
          } else if (fromParam === 'schedules') {
            navigate('/solicitudes-horarios');
          } else {
            navigate('/solicitudes-horarios');
          }
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

    if (isEdit) {
      confirmDialog({
        message: '¿Está seguro que desea actualizar esta solicitud?',
        header: 'Confirmar actualización',
        icon: 'pi pi-exclamation-triangle',
        accept: executeSubmit
      });
    } else {
      executeSubmit();
    }
  };

  return (
    <div className="p-d-flex p-flex-column p-align-center p-mt-3">
      <Toast ref={toast} />
      <ConfirmDialog />

      <h2>{isEdit ? "Editar" : "Crear"} Solicitud de Horario</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >

        {({ validateForm, submitForm, setTouched, isSubmitting }) => (

        <div className="profile-frame">

          <Form
            className="custom-form"
          >
            {/* Campo oculto para employeeId */}
            <Field name="employeeId" type="hidden" />

            <div>
              <label>Fecha: </label>
              <Field
                name="requestDate"
                type="date"
                className="p-inputtext p-component p-mb-3"
                placeholder="Fecha"
                disabled={isEdit}
              />
              <ErrorMessage
                name="requestDate"
                component="div"
                className="p-text-danger"
              />
            </div>

            <div>
              <label>Hora de inicio: </label>
              <Field
                name="startTime"
                type="time"
                className="p-inputtext p-component p-mb-3"
                placeholder="Hora de inicio (HH:MM)"
                disabled={isEdit}
              />
              <ErrorMessage
                name="startTime"
                component="div"
                className="p-text-danger"
              />
            </div>

            <div>
              <label>Hora de fin: </label>
              <Field
                name="endTime"
                type="time"
                className="p-inputtext p-component p-mb-3"
                placeholder="Hora de fin (HH:MM)"
                disabled={isEdit}
              />
              <ErrorMessage
                name="endTime"
                component="div"
                className="p-text-danger"
              />
            </div>

            <div>
              <label>Estado: </label>
              <Field
                name="status"
                as="select"
                className="p-inputtext p-component p-mb-3"
                placeholder="Estado"
              >
                <option value="">Seleccione un estado</option>
                <option value="pendiente">Pendiente</option>
                <option value="aprobado">Aprobado</option>
                <option value="rechazado">Rechazado</option>
              </Field>
              <ErrorMessage
                name="status"
                component="div"
                className="p-text-danger"
              />
            </div>          

            <div className="custom-btn-group">
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
                  const fromParam = searchParams.get('from');
                  if (fromParam === 'user-schedules') {
                    navigate('/usuarios/empleado/horarios');
                  } else if (fromParam === 'schedules') {
                    navigate('/horarios');
                  } else {
                    navigate('/solicitudes-horarios');
                  }
                }}
                type="button"
              />
            </div>
          </Form>

        </div>
      )}
      </Formik>
    </div>
  );
}

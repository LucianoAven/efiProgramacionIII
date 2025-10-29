import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useScheduleContext } from "../../context/SchedulesContext"; 
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const validationSchema = Yup.object({
  employeeId: Yup.number()
      .required("El ID del empleado es requerido"),
      
  date: Yup.date()
      .typeError("La fecha debe ser una fecha válida")
      .required("La fecha es requerida"),

  startTime: Yup.string()
      .typeError("La hora de inicio debe ser una hora válida")
      .required("La hora de inicio es requerida"),

  endTime: Yup.string()
      .typeError("La hora de fin debe ser una hora válida")
      .required("La hora de fin es requerida"),
});


export default function ScheduleForm() {
  const { schedules, addSchedule, editSchedule } = useScheduleContext();
  const { employeeId, scheduleId } = useParams(); // Parámetros específicos
  const navigate = useNavigate();
  
  // Determinar si es edición basado en scheduleId
  const existingSchedule = scheduleId ? schedules.find((s) => s.id === Number(scheduleId)) : null;
  const isEdit = Boolean(existingSchedule);
  
  // Determinar el empleado ID correcto
  const finalEmployeeId = isEdit ? existingSchedule?.employeeId : Number(employeeId);
  
  const [initialValues, setInitialValues] = useState({
    employeeId: finalEmployeeId || 0,
    date: "",
    startTime: "",
    endTime: "",
  });

  const toast = useRef(null);

  useEffect(() => {
    if (isEdit && existingSchedule) {
      // Editando un horario existente
      setInitialValues({
        employeeId: existingSchedule.employeeId || 0,
        date: existingSchedule.date || "",
        startTime: existingSchedule.startTime || "",
        endTime: existingSchedule.endTime || "",
      });
    } else if (employeeId && !isEdit) {
      // Creando un horario para un empleado específico
      setInitialValues({
        employeeId: Number(employeeId),
        date: "",
        startTime: "",
        endTime: "",
      });
    }
  }, [employeeId, scheduleId, schedules, isEdit, existingSchedule]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const scheduleData = {
        employeeId: Number(values.employeeId),
        date: values.date,
        startTime: values.startTime,
        endTime: values.endTime
      };

      if (isEdit) {
        await editSchedule(Number(scheduleId), scheduleData);
        toast.current?.show({
          severity: 'success',
          summary: 'Horario actualizado',
          detail: `Se actualizó el horario del empleado con ID "${values.employeeId}"`,
          life: 1200
        });
      } else {
        await addSchedule(scheduleData);
        toast.current?.show({
          severity: 'success',
          summary: 'Horario creado',
          detail: `Se creó el horario del empleado con ID "${values.employeeId}"`,
          life: 1200
        });
      }

      setTimeout(() => {
        navigate('/horarios', { replace: true });
      }, 900);

    } catch (e) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: e?.message || 'No se pudo guardar el horario',
        life: 3000
      });
    } finally {
      setSubmitting?.(false)
    }
  };

  return (
    <div className="p-d-flex p-flex-column p-align-center p-mt-3">
      <Toast ref={toast} />

      <h2>{isEdit ? "Editar" : "Crear"} Horario</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >

        {({ validateForm, submitForm, setTouched, isSubmitting }) => (

        <Form
          className="schedule-form"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          {/* Campo oculto para employeeId */}
          <Field name="employeeId" type="hidden" />

          <div>
            <label>Fecha:</label>
            <Field
              name="date"
              type="date"
              className="p-inputtext p-component p-mb-3"
              placeholder="Fecha"
            />
            <ErrorMessage
              name="date"
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
              onClick={() => navigate("/horarios")}
              type="button"
            />
          </div>
        </Form>
      )}
      </Formik>
    </div>
  );
}

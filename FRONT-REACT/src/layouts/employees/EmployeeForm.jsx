import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEmployeeContext } from "../../context/EmployeesContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const validationSchema = Yup.object({
  userId: Yup.number()
    .required("El ID del usuario es requerido"),

  position: Yup.string()
    .min(2, "La posición debe tener al menos 2 caracteres")
    .required("La posición es requerida"),

  hiringDate: Yup.date()
    .typeError("La fecha de contratación debe ser una fecha válida")
    .required("La fecha de contratación es requerida"),

  status: Yup.boolean()
    .required("El estado de actividad es requerido"),
});


export default function EmployeeForm() {
  const { employees, addEmployee, editEmployee } = useEmployeeContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    userId: id ? Number(id) : 0,
    position: "cajero",
    hiringDate: "",
    status: true,
  });

  const toast = useRef(null);
  
  // Determinar si es edición buscando si el ID corresponde a un empleado existente
  // const existingEmployee = employees.find((e) => e.id === Number(id));
  // const isEdit = Boolean(existingEmployee);
    
  const existingEmployee = employees.find((e) => e.id === Number(id));
  const isEdit = Boolean(existingEmployee);

  useEffect(() => {
    if (isEdit && existingEmployee) {
      // Convertir la fecha al formato YYYY-MM-DD para el input[type="date"]
      let formattedDate = "";
      if (existingEmployee.hiringDate) {
        const date = new Date(existingEmployee.hiringDate);
        if (!isNaN(date.getTime())) {
          formattedDate = date.toISOString().split('T')[0];
        }
      }
      
      setInitialValues({
        userId: existingEmployee.userId || 0,
        position: existingEmployee.position || "",
        hiringDate: formattedDate,
        status: existingEmployee.status || false,
      });
    } else if (id && !isEdit) {
      setInitialValues(prev => ({
        ...prev,
        userId: Number(id)
      }));
    }
  }, [id, employees, isEdit, existingEmployee]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const employeeData = {
        userId: values.userId,
        position: values.position,
        hiringDate: values.hiringDate,
        status: values.status === "true" || values.status === true
      };

    if (isEdit) {      
      await editEmployee(Number(id), employeeData);
      toast.current.show({ 
        severity: 'success', 
        summary: 'Éxito', 
        detail: 'Empleado actualizado correctamente', 
        life: 1200 
      });
    } else {
      await addEmployee(employeeData);
      toast.current.show({ 
        severity: 'success', 
        summary: 'Éxito', 
        detail: 'Empleado creado correctamente', 
        life: 1200 
      });
    }

    setTimeout(() => {
      navigate("/empleados", { replace: true });
    }, 900);
  
  } catch (e) {
    toast.current.show({ 
      severity: 'error', 
      summary: 'Error', 
      detail: e?.message || 'Hubo un problema al guardar el empleado', 
      life: 3000 
    });
  } finally {
    setSubmitting?.(false);
  }
  };

  return (
    <div className="p-d-flex p-flex-column p-align-center p-mt-3">
      <Toast ref={toast} />

      <h2>{isEdit ? "Editar" : "Crear"} Empleado</h2>
    
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, validateForm, setTouched, submitForm }) => (

        <div className="profile-frame">

          <Form
            className="custom-form"
          >
            <Field name="userId" type="hidden" />

            <div>
              <label>Posicion: </label>
              <Field as="select" name="position">
                  <option value="cajero">Cajero</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="repositor">Repositor</option>
              </Field>
              <ErrorMessage
                name="position"
                component="div"
                className="p-text-danger"
              />
            </div>          

            <div>
              <label>Fecha de Contratación: </label>
              <Field
                name="hiringDate"
                type="date"
                className="p-inputtext p-component p-mb-3"
                placeholder="Fecha de Contratación"
              />
              <ErrorMessage
                name="hiringDate"
                component="div"
                className="p-text-danger"
              />
            </div>

            <div>
              <label>Estado: </label>
              <Field as="select" name="status">
                  <option value={true}>Activo</option>
                  <option value={false}>Inactivo</option>
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
                label={isEdit ? "Guardar Cambios" : "Crear Empleado"}
                className="p-button-success p-button-rounded"
                disabled={isSubmitting}
                onClick={async () => {
                  const errors = await validateForm();
                  if (Object.keys(errors).length) {
                    setTouched(
                      Object.keys(errors).reduce((acc, key) => ({
                        ...acc,
                        [key]: true
                      }), {}),
                      true
                    );
                    toast.current.show({ 
                      severity: 'error', 
                      summary: 'Error', 
                      detail: 'Por favor corrige los errores del formulario.', 
                      life: 3000 
                    });
                    return;
                  }
                  await submitForm();
                }}
              />

              <Button
                label="Volver"
                className="p-button-secondary p-button-rounded"
                onClick={() => navigate("/empleados")}
                type="button"
              />
            </div>
          </Form>

        </div>
      )}
      </Formik>
    </div>
  );
};
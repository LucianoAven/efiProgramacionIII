import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUserContext } from "../../context/UsersContext"; 
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("El nombre es requerido"),

  email: Yup.string()
    .email("Debe ser un email válido")
    .required("El email es requerido"),

  rol: Yup.string()
    .required("El rol es requerido"),
});


export default function UserForm() {
  const { users, editUser } = useUserContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    password: "",
    rol: "",
    is_active: true,
  });

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const user = users.find((p) => p.id === Number(id));
      if (user) {
        setInitialValues({
          name: user.name || "",
          email: user.email || "",
          rol: user.rol || "",
          is_active: user.is_active || true,
        });
        setUser(user);
      }
    }
  }, [id, users]);

  const handleSubmit = async (values) => {
      if (isEdit) {
          const updatedValues = {
              ...values,
              is_active: values.is_active === "true" || values.is_active === true
          };
          await editUser(Number(id), updatedValues);
      }
      navigate("/usuarios");
  };

  return (
    <div className="p-d-flex p-flex-column p-align-center p-mt-3">
      <h2>Editar Usuario</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >

      <div className="profile-frame">

        <Form
          className="custom-form"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <div>
            <label>Nombre: {user.name}</label>
          </div>

          <div>
            <label>Email: {user.email}</label>
          </div>

          <div>
            <label>Rol: </label>
            <Field as="select" name="rol">
                <option value="admin">Admin</option>
                <option value="empleado">Empleado</option>
            </Field>
            <ErrorMessage
              name="rol"
              component="div"
              className="p-text-danger"
            />
          </div>          

          <div>
            <label>Estado: </label>
            <Field as="select" name="is_active">
                <option value={true}>Activo</option>
                <option value={false}>Inactivo</option>
            </Field>
            <ErrorMessage
              name="is_active"
              component="div"
              className="p-text-danger"
            />
          </div>

          <div className="custom-btn-group">
            <Button
              type="submit"
              label="Actualizar"
              className="p-button-success p-button-rounded"
            />
            <Button
              label="Volver"
              className="p-button-secondary p-button-rounded"
              onClick={() => navigate("/usuarios")}
              type="button"
            />
          </div>
        </Form>

      </div>      
      </Formik>
    </div>
  );
}

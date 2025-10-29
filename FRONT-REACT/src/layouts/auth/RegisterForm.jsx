import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { InputText } from "primereact/inputtext"
import { InputNumber } from "primereact/inputnumber"
import { Password } from 'primereact/password';
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { Link } from "react-router-dom"

const RegisterForm = () =>{
    const {register} = useContext(AuthContext)

    const initialValues = {
        name:'',
        email:'',
        password:'',
        rol: ''  // Valor por defecto según el modelo
    }

    const validationSchema= Yup.object({
        name: Yup.string().required('Campo requerido'),
        email: Yup.string().email('Email invalido').required('Campo requerido'),
        password: Yup.string().min(6,'Minimo 6 caracteres').required('Campo requerido'),
        rol: Yup.string().oneOf(['admin', 'empleado'], 'Rol inválido').required('Campo requerido')
    })

    const onSubmit = async (values) =>{
        console.log("llego");
        
        await register(values)
    }

    return(
        <Card title='Registrarse'>
            <Formik initialValues={initialValues} validationSchema={validationSchema}
            onSubmit={onSubmit}>
                {({handleChange, values, setFieldValue})=>(
                    console.log(values),
                    
                    <Form>
                        <label>Nombre</label>
                        <InputText name='name' value={values.name} onChange={handleChange}/>
                        <span><ErrorMessage name='name'/></span>

                        <label>Email</label>
                        <InputText name='email' value={values.email} onChange={handleChange}/>
                        <span><ErrorMessage name='email'/></span>

                        <label>Contraseña</label>
                        <Password name="password" value={values.password}  onChange={handleChange} />
                        <span><ErrorMessage name='password'/></span>

                        <label>Rol</label>
                        <Field as="select" name="rol">
                            <option value="">Seleccione un rol</option>
                            <option value="admin">Admin</option>
                            <option value="empleado">Empleado</option>
                        </Field>
                        <span><ErrorMessage name='rol'/></span>

                        <Button label="Registrarse" type='submit'/>
                        <Link to="/">
                            <Button label="Volver al inicio" icon="pi pi-home" className="p-button-rounded p-button-secondary" />
                        </Link>                        
                    </Form>
                )}
            </Formik>
        </Card>
    )
}
export default RegisterForm
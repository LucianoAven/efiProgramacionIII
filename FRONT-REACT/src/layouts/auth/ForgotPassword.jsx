import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup'
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () =>{

    const {forgotPassword} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const ForgotSchema = Yup.object({
        email: Yup.string().email("Email invalido").required('El email es obligatorio')
    })

    return (
        <Card title='Recuperar contraseña'>
            <p>Ingresa tu email y te enviaremos un enlace de recuperación</p>

            <Formik
            initialValues={{email:''}}
            validationSchema={ForgotSchema}
            onSubmit={async (values, {resetForm})=>{
                setLoading(true)
                const response = await forgotPassword(values.email)
                if(response) resetForm()
                setLoading(false)
            }}
            >
                <Form>
                    <label>Email</label>
                    <Field name='email'> 
                        {({field})=>(
                            <InputText id='email' {...field} placeholder="ejemplo@gmail.com"/>
                        )}
                    </Field>
                    <ErrorMessage name="email"/>

                    <Button 
                    type="submit"
                    label="Enviar email"
                    icon={loading ? "pi pi-spin pi-spinner" : 'pi pi-send'}
                    />
                </Form>

            </Formik>

            <Button
            label="Volver"
            className="p-button-secondary p-button-rounded"
            onClick={() => navigate("/")}
            type="button"
            />            

        </Card>
    )

}

export default ForgotPassword
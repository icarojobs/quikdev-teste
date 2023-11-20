import React from 'react';
import { Link } from "react-router-dom";
import {Form, Formik} from "formik";
import {Input} from "./Input.jsx";
import {Button} from "flowbite-react";
import {toast, ToastContainer} from "react-toastify";
import * as Yup from "yup";

export const Login = () => {
    const initialValues = {
        email: "",
        senha: ""
    };

    const validationSchema = Yup.object({
        email: Yup
            .string()
            .email("Email inválido.")
            .required("O campo email é obrigatório."),
        senha: Yup
            .string()
            .required("O campo senha é obrigatório."),
    });
    const handleSubmit = (values, {setSubmitting}) => {
        console.log(values);

        setSubmitting(false);
    };

    return (
        <div className="p-8 container mx-auto w-full md:w-[70%] mt-24">
            <div className="bg-gray-200 p-8">
                <h2 className="text-xl mt-2 text-center">Acesso Restrito</h2>
                <p className="text-center mb-2 text-xs">QuikDev - Teste Icaro</p>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({values, isSubmiting}) => (
                        <Form className="w-full">
                            <div className="flex flex-col gap-4">
                                <Input className="w-full" name="email" required />
                                <Input className="w-full" name="senha" type="password" required />
                                <Button color="success" type="submit" disabled={isSubmiting}>Entrar</Button>
                            </div>
                        </Form>
                    )}
                </Formik>

                <div className="mt-8 flex justify-end">
                    <Link to="/register" className="text-blue-500">
                        Realizar Cadastro
                    </Link>
                </div>
            </div>
            <ToastContainer autoClose={3500} position={toast.POSITION.TOP_RIGHT} />
        </div>
    );
};
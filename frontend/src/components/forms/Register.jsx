import React from 'react';
import { Link } from "react-router-dom";
import {Form, Formik} from "formik";
import {Input} from "./Input.jsx";
import {Button} from "flowbite-react";
import {toast, ToastContainer} from "react-toastify";
import * as Yup from "yup";

export const Register = () => {
    const initialValues = {
        nome: "",
        email: "",
        senha: "",
        role: "user",
    };

    const validationSchema = Yup.object({
        nome: Yup
            .string()
            .min(3, "O campo nome deve ter ao menos 3 caracteres")
            .required("O campo nome é obrigatório."),
        email: Yup
            .string()
            .email("Email inválido.")
            .required("O campo email é obrigatório."),
        senha: Yup
            .string()
            .required("O campo senha é obrigatório."),
        confirmar_senha: Yup
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
                <h2 className="text-xl mt-2 text-center">Realize seu Cadastro</h2>
                <p className="text-center mb-2 text-xs">QuikDev - Teste Icaro</p>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({values, isSubmiting}) => (
                        <Form className="w-full">
                            <div className="flex flex-col gap-4">
                                <Input className="w-full" name="nome" required />
                                <Input className="w-full" name="email" required />
                                <Input className="w-full" name="senha" type="password" required />
                                <Input className="w-full" name="confirmar_senha" type="password" required />
                                <Button color="success" type="submit" disabled={isSubmiting}>
                                    Realizar Cadastro
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>

                <div className="mt-8 flex justify-end">
                    <Link to="/" className="text-blue-500">
                        Voltar para Login
                    </Link>
                </div>
            </div>
            <ToastContainer autoClose={3500} position={toast.POSITION.TOP_RIGHT} />
        </div>
    );
};
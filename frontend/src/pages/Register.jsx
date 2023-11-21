import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import {Form, Formik} from "formik";
import { Input } from "../components/forms/Input.jsx";
import {Button} from "flowbite-react";
import * as Yup from "yup";
import api from "../services/api.js";
import { ToastContainer, toast } from "react-toastify";

export const Register = () => {
    const navigate = useNavigate();

    const initialValues = {
        name: "",
        email: "",
        password: "",
        role: "user",
    };

    const validationSchema = Yup.object({
        name: Yup
            .string()
            .min(3, "O campo nome deve ter ao menos 3 caracteres")
            .required("O campo nome é obrigatório."),
        email: Yup
            .string()
            .email("Email inválido.")
            .required("O campo email é obrigatório."),
        password: Yup
            .string()
            .required("O campo senha é obrigatório."),
    });
    const handleSubmit = async (values, {setSubmitting}) => {
            try {
            const { data } = await api.post('/register', values);

            if (data.status === false) {
                toast.warn(data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3500,
                });
            }

            if (data.status === true) {
                navigate('/');
            }
        } catch (error) {
            console.log('API Request Error:')
            console.log(error.message);
        } finally {
            setSubmitting(false);
        }
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
                                <Input className="w-full" name="name" required />
                                <Input className="w-full" name="email" required />
                                <Input className="w-full" name="password" type="password" required />
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
            <ToastContainer />
        </div>
    );
};
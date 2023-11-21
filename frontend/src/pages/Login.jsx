import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import {Form, Formik} from "formik";
import { Input } from "../components/forms/Input.jsx";
import { Button } from "flowbite-react";
import * as Yup from "yup";
import api from "../services/api.js";
import { useUserStore } from "../store/UserStore.js";
import { ToastContainer, toast } from "react-toastify";

export const Login = () => {
    const navigate = useNavigate();
    const [user, addUser] = useUserStore((state) => [state.user, state.addUser]);

    if (user.length > 0) {
        navigate('/dashboard');
    }

    const initialValues = {
        email: "",
        password: ""
    };

    const validationSchema = Yup.object({
        email: Yup
            .string()
            .email("Email inválido.")
            .required("O campo email é obrigatório."),
        password: Yup
            .string()
            .required("O campo senha é obrigatório."),
    });
    const handleSubmit = async (values, {setSubmitting}) => {
        const { data } = await api.post('/login', values);

        setSubmitting(false);

        if (data.status === false) {
            toast.warn(data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3500,
            });
        }

        if (data.status === true) {
            addUser(data.user);
            navigate('/dashboard');
        }
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
                                <Input className="w-full" name="password" type="password" required />
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
            <ToastContainer />
        </div>
    );
};
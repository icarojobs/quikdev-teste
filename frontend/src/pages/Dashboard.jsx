import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import {Button} from "flowbite-react";
import { toast, ToastContainer } from "react-toastify";
import { useUserStore } from "../store/UserStore.js";

export const Dashboard = () => {
    const navigate = useNavigate();
    const [user, removeUser] = useUserStore((state) => [state.user, state.removeUser]);

    if (user.length === 0) {
        navigate('/');
    }

    const logoutUser = async () => {
        removeUser(user[0].id);

        navigate('/');
    };

    return (
        <div className="p-8 container mx-auto w-full md:w-[70%] mt-24">
            <div className="bg-gray-200 p-8 flex justify-between">
                <h2 className="text-xl mt-2 text-center">Dashboard</h2>
                { user.length > 0 && <p>Bem vindo { user[0].name }!</p> }

                <Button type="button" onClick={logoutUser} color="blue">Sair</Button>
            </div>
            <ToastContainer autoClose={3500} position={toast.POSITION.TOP_RIGHT} />
        </div>
    );
};
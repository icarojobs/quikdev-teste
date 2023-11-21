import api from '../../services/api.js';
import { useQuery } from "@tanstack/react-query";


async function checkUser({ email, password }) {
    console.log('Credentials!!!!');
    console.log(email, password);


    const { data } = await api.post('/login', credentials);

    return data;
}

export default function useFetchCheckUser(credentials) {
    return useQuery(['checkuser', credentials], checkUser);
}
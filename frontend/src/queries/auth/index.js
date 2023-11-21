import api from '../../services/api.js';
import { useQuery } from "@tanstack/react-query";

async function getUsers() {
    const { data } = await api.get('/users');

    return data;
}

export default function useFetchUsers() {
    return useQuery(['users'], getUsers);
}
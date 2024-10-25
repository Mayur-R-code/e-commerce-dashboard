import type { Method } from "axios";

import axios from "axios";


const API_URL = "https://671b32ed2c842d92c37ee243.mockapi.io/users/v1/";

// const API_URL = "http://localhost:5000/"

interface ApiParameter {
    url: string;
    method: Method;
    body?: any;
    withCredentials?: boolean;
    token?: string;
    headers?: any;
}

export async function callApi({
    url,
    method,
    body,
}: ApiParameter): Promise<any | null> {

    try {
        const result = await axios({
            url: API_URL + url,
            method,
            data: body,
        });
        return result;
    } catch (error) {
        return null;
    }
}
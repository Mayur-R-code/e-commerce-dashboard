/* eslint arrow-body-style: ["error", "always"] */
import { callApi } from ".";

// User login API function
export const loginUserApi = (data: any) => {
    return callApi({
        url: `user-list?email=${data?.email}&password=${data?.password}`,
        method: "GET",
        body: data,
    });
};

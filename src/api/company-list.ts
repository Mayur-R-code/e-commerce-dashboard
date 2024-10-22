import { callApi } from ".";


export const getCompanyListApi = () => callApi({ url: "company-list", method: "GET" });

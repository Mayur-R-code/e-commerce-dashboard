/* eslint arrow-body-style: ["error", "always"] */
import { callApi } from ".";

// Get user list API function
export const getUserListApi = () => {
  return callApi({ url: "user-list", method: "GET" });
};

// Get user by ID API function
export const getUserByIdApi = (id: any) => {
  return callApi({ url: `user-list/${id}`, method: "GET" });
};

// Add user API function
export const addUserApi = (data: any) => {
  return callApi({
    url: "user-list",
    method: "POST",
    body: data,
  });
};

// Edit user API function
export const updateUserApi = (id: any, data: any) => {
  return callApi({
    url: `user-list/${id}`,
    method: "PUT",
    body: data,
  });
};

// Delete user API function
export const deleteUserApi = (id: any) => {
  return callApi({
    url: `user-list/${id}`,
    method: "DELETE",
  });
};

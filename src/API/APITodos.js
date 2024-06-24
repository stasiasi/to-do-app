import axiosInstance from './apiHelper';

export function getTodos(userId) {
    return axiosInstance.get(`/user/${userId}`);
};
import { axiosService } from "./axiosService";

const accountApi = {
    getAll(params) {
        const url = `/account`;
        return axiosService.get(url, { params });
    },
    getAccById(id) {
        const url = `/account/id${id}`;
        return axiosService.get(url);
    },
    getAllStaff(id) {
        const url = `/account/staff/${id}`;
        return axiosService.get(url);
    },
    changePassword(body) {
        const url = `/account/change-password`;
        return axiosService.post(url, body);
    },
    addAccount(body) {
        const url = '/account/register';
        return axiosService.post(url, body);
    },
    editAccount(body) {
        const url = '/account/update';
        return axiosService.put(url, body);
    },
    deleteAccount(id) {
        const url = `/account/${id}`;
        return axiosService.delete(url);
    }
}

export default accountApi;
import { axiosService } from "./axiosService";

const authApi = {
    login(body) {
        const url = '/user/login';
        return axiosService.post(url, body);
    },
    register(body) {
        const url = '/user/register';
        return axiosService.post(url, body);
    }
}

export default authApi;
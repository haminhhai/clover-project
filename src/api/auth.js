import { axiosService } from "./axiosService";

const authApi = {
    login(body) {
        const url = '/account/login';
        return axiosService.post(url, body);
    },
    register(body) {
        const url = '/account/register';
        return axiosService.post(url, body);
    }
}

export default authApi;
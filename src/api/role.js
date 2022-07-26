import { axiosService } from "./axiosService";

const roleApi = {
    getAll() {
        const url = '/role';
        return axiosService.get(url);
    },
}

export default roleApi;
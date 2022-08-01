import { axiosService } from "./axiosService";

const categoryApi = {
    getAll() {
        const url = '/category';
        return axiosService.get(url);
    },
}

export default categoryApi;
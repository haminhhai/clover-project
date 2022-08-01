import { axiosService } from "./axiosService";

const branchApi = {
    getPaging(params) {
        const url = '/branch';
        return axiosService.get(url, { params });
    },
    add(body) {
        const url = '/branch';
        return axiosService.post(url, body);
    },
    update(body) {
        const url = '/branch';
        return axiosService.post(url, body);
    }
}

export default branchApi;
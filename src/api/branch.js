import { axiosService } from "./axiosService";

const branchApi = {
    getPaging(params) {
        const url = '/branch';
        return axiosService.get(url, { params });
    },
    getDetail(id) {
        const url = `/branch/id/${id}`;
        return axiosService.get(url);
    },
    add(body) {
        const url = '/branch';
        return axiosService.post(url, body);
    },
    update(body) {
        const url = '/branch';
        return axiosService.post(url, body);
    },
    getALlManager() {
        const url = '/branch/manager';
        return axiosService.get(url);
    },
    getIncomeBranch(params) {
        const url = '/branch/income';
        return axiosService.get(url, { params });
    },
    getDeleteHistory(id) {
        const url = `/inventory/${id}`;
        return axiosService.get(url);
    }
}

export default branchApi;
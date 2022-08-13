import { axiosService } from "./axiosService";

const positionApi = {
    getWarehouse() {
        const url = '/position/warehouse/1';
        return axiosService.get(url);
    },
    getBranch(id) {
        const url = `/position/branch/${id}`;
        return axiosService.get(url);
    }
}

export default positionApi;
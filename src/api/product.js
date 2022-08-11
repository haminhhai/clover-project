import { axiosService } from "./axiosService";

const productApi = {
    getBestSelling() {
        const url = '/product/best_selling';
        return axiosService.get(url);
    },
    getProductWarehouse(params) {
        const url = '/warehouse';
        return axiosService.get(url, { params });
    },
    getProductBranch(params) {
        const url = '/inventory';
        return axiosService.get(url, { params });
    },
    addProduct(body) {
        const url = '/product';
        return axiosService.post(url, body);
    },


}

export default productApi;
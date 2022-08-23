import { axiosService } from "./axiosService";

const productApi = {
    getById: (id) => {
        const url = `/product/id/${id}`;
        return axiosService.get(url);
    },
    getAll: (params) => {
        const url = `/product`;
        return axiosService.get(url, { params });
    },
    getBestSelling() {
        const url = '/product/best_selling';
        return axiosService.get(url);
    },
    getProductWarehouse(params) {
        const url = '/warehouse';
        return axiosService.get(url, { params });
    },
    getProductBranchById(id) {
        const url = `/product/branch/${id}`;
        return axiosService.get(url);
    },
    getProductBranch(params) {
        const url = '/branch/product';
        return axiosService.get(url, { params });
    },
    getProductInventory(params) {
        const url = '/inventory';
        return axiosService.get(url, { params });
    },
    addProduct(body) {
        const url = '/product';
        return axiosService.post(url, body);
    },
    addProductToInventory(body) {
        const url = '/inventory';
        return axiosService.post(url, body);
    },
    addProductToWarehouse(body) {
        const url = '/warehouse';
        return axiosService.post(url, body);
    },
    deleteInventory(body) {
        const url = '/inventory';
        return axiosService.delete(url, { data: body });
    },
    exportProduct(body) {
        const url = '/product/export';
        return axiosService.post(url, body);
    },
    getOrder() {
        const url = '/product/total'
        return axiosService.get(url);
    }

}

export default productApi;
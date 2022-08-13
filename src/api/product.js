import { axiosService } from "./axiosService";

const productApi = {
    getById: (id) => {
        const url = `/product/id/${id}`;
        return axiosService.get(url);
    },
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
    addProductToInventory(body) {
        const url = '/inventory';
        return axiosService.post(url, body);
    },
    addProductToWarehouse(body) {
        const url = '/warehouse';
        return axiosService.post(url, body);
    },
    exportProduct(body) {
        const url = '/product/export';
        return axiosService.post(url, body);
    }

}

export default productApi;
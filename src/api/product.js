import { axiosService } from "./axiosService";

const productApi = {
    getBestSelling() {
        const url = '/product/best_selling';
        return axiosService.get(url);
    },
    getPaging(params) {
        const url = '/product';
        return axiosService.get(url, { params });
    },
    addProduct(body) {
        const url = '/product';
        return axiosService.post(url, body);
    },


}

export default productApi;
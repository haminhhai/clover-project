import { axiosService } from "./axiosService";

const productApi = {
    getBestSelling() {
        const url = '/product/best_selling';
        return axiosService.get(url);
    },
    addProduct(body) {
        const url = '/product';
        return axiosService.post(url, body);
    },


}

export default productApi;
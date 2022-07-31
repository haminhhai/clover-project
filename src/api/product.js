import { axiosService } from "./axiosService";

const productApi = {
    addProduct(body) {
        const url = '/product';
        return axiosService.post(url, body);
    },

}

export default productApi;
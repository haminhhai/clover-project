import axios from "axios";
import { CLOUDINARY_TOKEN } from "constants/";
import { Buffer } from 'buffer';

// Set up default config for http requests here
const cloudinaryService = axios.create({
    baseURL: '/cloudinary',
    headers: {
        Authorization: `Basic ${Buffer.from(CLOUDINARY_TOKEN.api_key + ':' + CLOUDINARY_TOKEN.api_secret).toString('base64')}`,

    },
});

cloudinaryService.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const imgCloudApi = {
    getResource() {
        const url = '/resources/image';
        return cloudinaryService.get(url);
    },
    uploadImage(body) {
        const url = '/upload';
        return cloudinaryService.post(url, body);
    },

    getImgProfile(id, params) {
        let url = `/profile`;
        if (id) {
            url += `/${id}`
        }
        return cloudinaryService.get(url, { params });
    },
    addImgProfile(body) {
        const url = '/profile';
        return cloudinaryService.post(url, body);
    },
    updateImageProfile(id, body) {
        const url = `/profile/${id}`;
        return cloudinaryService.put(url, body);
    },
    deleteImgProfile(id) {
        const url = `/profile/${id}`;
        return cloudinaryService.delete(url);
    },
    getImgProduct(id, params) {
        let url = `/product`;
        if (id) {
            url += `/${id}`
        }
        return cloudinaryService.get(url, { params });
    },
    addImgProduct(body) {
        const url = '/product';
        return cloudinaryService.post(url, body);
    },
    updateImageProduct(id, body) {
        const url = `/product/${id}`;
        return cloudinaryService.put(url, body);
    },
    deleteImgProduct(id) {
        const url = `/product/${id}`;
        return cloudinaryService.delete(url);
    }
}

export default imgCloudApi;

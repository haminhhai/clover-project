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
}

export default imgCloudApi;

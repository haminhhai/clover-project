import axios from "axios";

// Set up default config for http requests here
const imgService = axios.create({
    baseURL: 'http://localhost:2000',
    headers: {
        "content-type": "application/json",
    },
});

imgService.interceptors.response.use(
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

const imageApi = {
    getAll(params) {
        const url = '/images';
        return imgService.get(url, { params });
    },
    getImgProfileById(id) {
        const url = `/images/${id}`;
        return imgService.get(url);
    },
    create(body) {
        const url = '/images';
        return imgService.post(url, body);
    },
    update(id, body) {
        const url = `/images/${id}`;
        return imgService.put(url, body);
    },
    delete(id) {
        const url = `/images/${id}`;
        return imgService.delete(url);
    }
}

export default imageApi;

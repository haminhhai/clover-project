import { axiosService } from "./axiosService";

const profileApi = {
    getAccById(id) {
        const url = `/account/id${id}`;
        return axiosService.get(url);
    },
    changePassword(body) {
        const url = `/account/change-password`;
        return axiosService.post(url, body);
    }
}

export default profileApi;
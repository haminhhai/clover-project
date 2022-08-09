import imgCloudApi from 'api/cloudinary';
import { CLOUDINARY_TOKEN } from 'constants/';
import { CLOVER_TOKEN, CLOVER_USER } from 'constants/'
import moment from 'moment';

export const isUserLoggedIn = () => localStorage.getItem(CLOVER_USER)

export const getToken = () => localStorage.getItem(CLOVER_TOKEN)

export const getUser = () => isUserLoggedIn() && JSON.parse(localStorage.getItem(CLOVER_USER))

export const formatVND = (value) => {
    return parseFloat(value).toLocaleString('it-IT', { style: 'currency', currency: 'VND' }).replaceAll('.', ',')
}

export function disableFutureDate(current) {
    return current && current > moment().endOf('day');
}

export function disablePastDate(current) {
    return current && current < moment().startOf('day');
}

// ** Transfer file to img
export const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
};

// ** render html text has a line break
export const renderHtmlTextBreakLine = (text) => {
    if (!text) return '';
    return text.replace(/\n/g, '<br>');
}

export const getUrlImage = async (fileList) => {
    if (fileList.length > 0) {
        const file = fileList[0];
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        return new Promise((resolve) => {
            reader.onload = () => resolve(reader.result);
        });
    }
    return '';
}

export const handleUploadImage = async (fileList) => {
    return new Promise(async (resolve, reject) => {
        try {
            const formData = new FormData();
            formData.append("file", fileList[0].originFileObj);
            formData.append("upload_preset", CLOUDINARY_TOKEN.upload_preset);
            const response = await imgCloudApi.uploadImage(formData)
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}
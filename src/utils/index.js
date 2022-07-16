import { CLOVER_TOKEN, CLOVER_USER } from 'constants/'
import moment from 'moment';

export * from './history'

export const isUserLoggedIn = () => localStorage.getItem(CLOVER_USER)

export const getToken = () => localStorage.getItem(CLOVER_TOKEN)

export const getUser = () => isUserLoggedIn() && JSON.parse(localStorage.getItem(CLOVER_USER))

export function disableFutureDate(current) {
    return current && current > moment().endOf('day');
}

export function disablePastDate(current) {
    return current && current < moment().endOf('day');
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
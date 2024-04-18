import axios from "axios";
import words from './words'
import sentenses from "./sentenses";
import users from "~/api/users";
import auth from "~/api/auth";
import Cookies from "js-cookie";

let API_URL = '/api';

const config = {
    API_URL,
}

axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`;

export const Api = {
    users: users(axios, config),
    auth: auth(axios, config),
    words: words(axios, config),
    sentenses: sentenses(axios, config),
}
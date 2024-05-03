import axios from "axios";
import words from './words'
import sentences from "./sentences";
import users from "~/api/users";
import auth from "~/api/auth";
import Cookies from "js-cookie";
import categorys from "~/api/categorys";

let API_URL = 'http://localhost/api';

const config = {
    API_URL,
}

axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('access_token')}`;

export const Api = {
    users: users(axios, config),
    auth: auth(axios, config),
    words: words(axios, config),
    sentences: sentences(axios, config),
    categorys: categorys(axios, config)
}
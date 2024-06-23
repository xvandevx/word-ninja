import {WordStatuses} from "~/types/words/word";
const transltaions = require('../translations.json');

export default (axios: any, config: any) => ({
    async add(formData: any) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.post(`${config.API_URL}/words/word`, req);
        return data;
    },
    async update(id: number, formData: any) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.put(`${config.API_URL}/words/word/${id}`, req);
        return data;
    },
    async get() {
        const {data} = await axios.get(`${config.API_URL}/words/word`);
        return data;
    },
    async getById(id: number) {
        const {data} = await axios.get(`${config.API_URL}/words/word/${id}`);
        return data;
    },
    async delete(id: number) {
        const {data} = await axios.delete(`${config.API_URL}/words/word/${id}`);
        return data;
    },
    async setMinus(id: number) {
        const {data} =  await axios.post(`${config.API_URL}/words/word/minus/${id}`);
        return data;
    },
    async setPlus(id: number) {
        const {data} =  await axios.post(`${config.API_URL}/words/word/plus/${id}`);
        return data;
    },
    async setStatus(id: number, status: WordStatuses) {
        const {data} =  await axios.post(`${config.API_URL}/words/word/setStatus/${id}`, `status=${status}`);
        return data;
    },
    getTranslation(word: string) {
        const wordPreared = word.trim();
        const result = transltaions.filter((word: any) => {
            return word.en?.startsWith(wordPreared);
        });
        return result;
    },
});
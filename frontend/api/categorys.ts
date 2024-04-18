export default (axios: any, config: any) => ({
    async addWordCategory(formData: any) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.post(`${config.API_URL}/category/word`, req);
        return data;
    },
    async addSentenceCategory(formData: any) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.post(`${config.API_URL}/category/sentence`, req);
        return data;
    },
    async update(id: number, formData: any) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.put(`${config.API_URL}/category/${id}`, req);
        return data;
    },
    async getWordCategory() {
        const {data} = await axios.get(`${config.API_URL}/category/word`);
        return data;
    },
    async getSentenceCategory() {
        const {data} = await axios.get(`${config.API_URL}/category/sentence`);
        return data;
    },
    async delete(id: number) {
        await axios.delete(`${config.API_URL}/category/${id}`);
    }
});
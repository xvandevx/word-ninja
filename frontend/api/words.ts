
export default (axios: any, config: any) => ({
    async addWord(formData: any) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.post(`${config.API_URL}/words/word`, req);
        return data;
    },
    async updateWord(id: number, formData: any) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.put(`${config.API_URL}/words/word/${id}`, req);
        return data;
    },
    async getWord(categoryId) {
        const {data} = await axios.get(`${config.API_URL}/words/word?categoryId=${categoryId}`);
        return data;
    },
    async deleteWord(id: number) {
        await axios.delete(`${config.API_URL}/words/word/${id}`);
    },
});
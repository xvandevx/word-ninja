export default (axios: any, config: any) => ({
    async get(text: string, langFrom: string, langTo: string) {
        const {data} = await axios.get(`${config.API_URL}/translate?text=${text}&langFrom=${langFrom}&langTo=${langTo}`);
        return data;
    },
});
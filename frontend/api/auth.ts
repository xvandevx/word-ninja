export default (axios: any, config: any) => ({
    async google() {
        const {data} = await axios.get(`${config.API_URL}/auth/google`);
        return data;
    },
    async googleCallback(formData: any) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.get(`${config.API_URL}/auth/google/callback`, req);
        return data;
    },
    async login(formData: any) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.post(`${config.API_URL}/auth/login`, req);
        return data;
    },
    async check(token: any) {
        try {
            const data = await axios.post(`${config.API_URL}/auth/check`);
            console.log('data', data)
            return data;
        } catch (e: any) {
            console.warn('error test', e);
        }
        return false
    },
    async setPassword(formData: any) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.post(`${config.API_URL}/auth/setPassword`, req);
        return data;
    },
});
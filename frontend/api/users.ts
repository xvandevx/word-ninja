import {UserInterface} from "~/backendTypes/user";

export default (axios: any, config: any) => ({
    async add(formData: UserInterface) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.post(`${config.API_URL}/users`, req);
        return data;
    },
    async update(id: number, formData: UserInterface) {
        const req = Object.entries(formData).map(params => params.join(`=`)).join(`&`);
        const {data} = await axios.put(`${config.API_URL}/users/${id}`, req);
        return data;
    },
    async get(): Promise<UserInterface[]> {
        const {data} = await axios.get(`${config.API_URL}/users`);
        return data;
    },
    async delete(id: number) {
        await axios.delete(`${config.API_URL}/users/${id}`);
    }
});
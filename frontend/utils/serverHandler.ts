import * as process from "process";

export default async (ctx: any, props = {}) => {
    const token = ctx.req.cookies.access_token;
    let auth: any = {};

    if (token) {
        try {
            console.log('testes', process.env.API_HOST + "/api/auth/check", {
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const res = await fetch(process.env.API_HOST + "/api/auth/check", {
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            auth = await res.json();
            console.log('test auth', auth)
        } catch(e) {
            // @ts-ignore
            console.log('error fetch', e.message)
        }
    }

    // @ts-ignore
    if (auth.statusCode !== 200 && ctx.req.url !== '/') {
        return {
            redirect: {
                destination: '/',
            },
        }
    }
    return {
        props: {
            ...props,
            userData: auth.user || null
        }
    };
}
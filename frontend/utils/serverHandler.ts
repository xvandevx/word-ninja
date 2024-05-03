import * as process from "process";
import Cookies from 'cookies';

export default async (ctx: any, props = {}) => {
    const cookies = new Cookies(ctx.req, ctx.res)
    let token = cookies.get('access_token');
    let auth: any = {};

    if (ctx.query.token) {
        token = ctx.query.token;
        const currentDate = new Date();
        cookies.set('access_token', token,  { httpOnly: false, expires: new Date(currentDate.setDate(currentDate.getDate() + 30)) })
    }

    if (token) {
        try {
            const res = await fetch(process.env.API_HOST + "/api/auth/check", {
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            auth = await res.json();
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
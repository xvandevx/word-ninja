import * as process from "process";
import axios from "axios";

export default async (ctx: any, props = {}) => {
    const token = ctx.req.cookies.token;
    let auth: any = {};

    if (token) {
        try {
            const apiPath = process.env.PROTOCOL + '://' + ctx.req.headers.host.replace(':3000', '') + ":" + (process.env.PORT || 80);
            console.log('apiPath', apiPath)
            const res = await fetch(apiPath + "/api/auth/check", {
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            auth = await res.json();
        } catch(e) {
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
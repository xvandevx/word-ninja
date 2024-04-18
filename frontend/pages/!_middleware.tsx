import {NextResponse} from 'next/server';
import * as process from "process";
import {setData} from "~/pages/state";

export async function middleware(request: any, response: any, next: any) {
    const token = request.cookies.token;
    let isAuth = false;
    const path = request.nextUrl.protocol + '//' + request.headers.get('host').replace(':3000', '') + ":" + (process.env.PORT || 80);

    if (token) {
        try {
            console.log('path + "/api/auth/check"', path + "/api/auth/check")
            const res = await fetch(path + "/api/auth/check", {
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            const auth = await res.json();
            console.log('retsetse', auth)
            if (auth.statusCode === 200) {
                isAuth = true;
                //request.ctx.userData = auth.user;
            }
        } catch(e) {
            console.log('error fetch', e)
        }
    }


    // @ts-ignore
    if (!isAuth && request.page.name !== '/') {
        return NextResponse.redirect(new URL('/', path));
    }
}

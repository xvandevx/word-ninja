import {NextResponse} from 'next/server';
import * as process from "process";

export async function middleware(request: any) {
    const token = request.cookies.token;
    let isAuth = false;
    const path = request.nextUrl.protocol + '//' + request.headers.get('host').replace(':3000', '') + ":" + (process.env.PORT || 80);

    if (token) {
        try {
            const response = await fetch(path + "/api/auth/check", {
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            const auth = await response.json();
            console.log('auth', auth)
            if (auth.statusCode === 200) {
                isAuth = true;
            }
        } catch(e) {
            console.log('error fetch', e)
        }
    }

    // @ts-ignore
    if (!isAuth && request.page.name !== '/') {
       // return NextResponse.redirect(new URL('/', path));
    }
}

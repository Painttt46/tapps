// app/api/auth/logout/route.js
import { NextResponse } from 'next/server';

export async function POST() {
    const res = NextResponse.json({ success: true });

    res.cookies.set('accessToken', '', {
        httpOnly: true,
        path: '/',
        maxAge: 0,
    });

    res.cookies.set('username', '', {
        path: '/',
        maxAge: 0,
    });

    res.cookies.set('rolename', '', {
        path: '/',
        maxAge: 0,
    });
    res.cookies.set('email', '', {
        path: '/',
        maxAge: 0,
    });

    return res;
}

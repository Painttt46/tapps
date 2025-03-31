// app/api/auth/login/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
    const body = await request.json();

    try {
        const response = await fetch('http://10.1.10.153:8080/api/auth/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok && data?.accessToken && data?.username && data?.rolename) {
            const res = NextResponse.json({ success: true });

            
            res.cookies.set('accessToken', data.accessToken, {
                httpOnly: true,
                path: '/',
                sameSite: 'lax',
                maxAge: 60 * 60,
            });

            res.cookies.set('username', data.username, {
                httpOnly: true, 
                path: '/',
                sameSite: 'lax',
                maxAge: 60 * 60,
            });

            res.cookies.set('email', data.email, {
                httpOnly: true, 
                path: '/',
                sameSite: 'lax',
                maxAge: 60 * 60,
            });

            res.cookies.set('rolename', data.rolename, {
                httpOnly: true, 
                path: '/',
                sameSite: 'lax',
                maxAge: 60 * 60,
            });

            return res;
        } else {
            return NextResponse.json({ success: false, message: data.message || 'Invalid credentials' }, { status: 401 });
        }
    } catch (err) {
        console.error('Login API error:', err);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}

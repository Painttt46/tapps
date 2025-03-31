import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    const cookieStore = await cookies();
    const username = cookieStore.get("username")?.value;
    const role = cookieStore.get("rolename")?.value;

    return NextResponse.json({ username, role });
}

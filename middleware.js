import { NextResponse } from 'next/server'

export function middleware(req) {
  const url = req.nextUrl.clone()
  const cookies = req.cookies

  const requiredCookies = ['accessToken', 'username', 'rolename', 'email']
  const missing = requiredCookies.some((key) => !cookies.get(key))

  // รีเฟรชทุกครั้งแม้จะใช้ Forward/Backward
  const response = NextResponse.next()
  response.headers.set('Cache-Control', 'no-store')

  // เช็คว่าเป็นหน้า '/'
  if (url.pathname === '/') {
    // รีไดเร็กต์ไปที่หน้า 404 หรือหน้าอื่นๆ ที่คุณต้องการ
    const redirectUrl = new URL('/logviewer', req.url)  // หรือ '/home', '/login' ก็ได้
    return NextResponse.redirect(redirectUrl)
  }

  // ป้องกันการวนลูป ถ้าเราอยู่ในหน้า /login และไม่มี cookies
  if (url.pathname === '/login') {
    // ถ้ามี cookies ทั้งหมดแล้ว ให้รีไดเร็กต์ไปที่ /logviewer
    if (!missing) {
      const homeUrl = new URL('/logviewer', req.url)
      return NextResponse.redirect(homeUrl)
    }
    // ถ้าไม่ครบ cookies, ให้ทำงานตามปกติที่หน้า /login
    return response
  }

  // ถ้าขาด cookies, รีไดเร็กต์ไปที่หน้า /login
  if (missing) {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  // ถ้าทุกอย่างถูกต้อง, ทำงานตามปกติ
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

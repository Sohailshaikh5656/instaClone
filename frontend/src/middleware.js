import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const protectedRoutes = ['/profile', '/newPost', '/settings', '/search', '/otherProfile','/home']
const authRoutes = ['/signin', '/signup']

export async function middleware(req) {
    const path = req.nextUrl.pathname
    const token = await getToken({ req })
    console.log("This Token At Middle Ware Side : ", token)

    // Check if route is protected and no token exists
    if (protectedRoutes.some(route => path.startsWith(route)) && !token) {
        return NextResponse.redirect(new URL('/signin', req.url))
    }

    // Check if user is trying to access auth routes while already authenticated
    // if (authRoutes.includes(path) && token) {
    //     return NextResponse.redirect(new URL('/profile', req.url))
    // }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/profile',
        '/newPost',
        '/settings',
        '/search',
        '/otherProfile/:path*',
        '/signin',
        '/signup'
    ]
}

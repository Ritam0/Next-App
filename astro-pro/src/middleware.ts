import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export { default } from 'next-auth/middleware';

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });

    const url = request.nextUrl;

    // If the user is authenticated, redirect them away from auth pages
    if (token && 
        (
            url.pathname.startsWith('/sign-in') || 
            url.pathname.startsWith('/sign-up') || 
            url.pathname.startsWith('/verify')
        )) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If the user is not authenticated, restrict access to protected pages
    if (!token && 
        (
            url.pathname.startsWith('/dashboard') || 
            url.pathname.startsWith('/astro') || 
            url.pathname.startsWith('/verify')
        )) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // Allow the request to proceed
    return NextResponse.next();
}

// Apply the middleware to specific paths
export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        '/',
        '/dashboard/:path*',
        '/verify/:path*',
        '/astro/:path*',
    ],
};

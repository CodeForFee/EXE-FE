import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { accessToken, refreshToken } = body;

        if (!accessToken) {
            return NextResponse.json(
                { code: 400, message: 'Missing access token' },
                { status: 400 }
            );
        }

        const response = NextResponse.json({
            code: 200,
            message: 'Session established successfully',
            data: { success: true }
        });

        // Set httpOnly cookies for security
        response.cookies.set('accessToken', accessToken, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60, // 1 day
        });

        if (refreshToken) {
            response.cookies.set('refreshToken', refreshToken, {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60, // 7 days
            });
        }

        return response;
    } catch (error) {
        console.error('Login route error:', error);
        return NextResponse.json(
            { code: 500, message: 'Internal server error' },
            { status: 500 }
        );
    }
}

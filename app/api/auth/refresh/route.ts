import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { refreshToken } = body;

        if (!refreshToken) {
            return NextResponse.json(
                { code: 400, message: "Missing refresh token" },
                { status: 400 }
            );
        }

        // Call backend to refresh token
        const backendResponse = await fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: refreshToken }),
        });

        if (!backendResponse.ok) {
            return NextResponse.json(
                { code: 401, message: "Invalid refresh token" },
                { status: 401 }
            );
        }

        const result = await backendResponse.json();
        const newAccessToken = result.data?.token;

        if (!newAccessToken) {
            return NextResponse.json(
                { code: 401, message: "Invalid refresh response" },
                { status: 401 }
            );
        }

        const response = NextResponse.json({
            code: 200,
            message: "Token refreshed successfully",
            data: {
                token: newAccessToken,
                refreshToken: refreshToken
            }
        });

        // Update access token cookie
        response.cookies.set("accessToken", newAccessToken, {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60, // 1 day
        });

        return response;
    } catch (error) {
        console.error('Refresh token route error:', error);
        return NextResponse.json(
            { code: 500, message: "Error refreshing token" },
            { status: 500 }
        );
    }
}

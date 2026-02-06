import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();

        // Delete auth cookies
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");

        return NextResponse.json(
            {
                code: 200,
                message: "Logged out successfully",
                data: { success: true }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Logout route error:', error);
        return NextResponse.json(
            {
                code: 500,
                message: "Error during logout",
                data: null
            },
            { status: 500 }
        );
    }
}

/**
 * Decode a JWT token to extract payload
 * @param token - JWT token string
 * @returns Decoded payload
 */
export function decodeJWT<T>(token: string): T {
    try {
        const base64Url = token.split('.')[1];
        if (!base64Url) {
            throw new Error('Invalid token format');
        }
        
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        
        return JSON.parse(jsonPayload) as T;
    } catch (error) {
        console.error("Failed to decode JWT:", error);
        throw new Error('Invalid JWT token');
    }
}

/**
 * Check if code is running on server
 */
export function isServer(): boolean {
    return typeof window === 'undefined';
}

/**
 * Check if JWT token is expired
 */
export function isTokenExpired(token: string): boolean {
    try {
        const decoded = decodeJWT<{ exp: number }>(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    } catch {
        return true;
    }
}

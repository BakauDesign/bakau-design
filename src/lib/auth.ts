import { Cookie } from "@builder.io/qwik-city";
import { PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import jwt from "@tsndr/cloudflare-worker-jwt";

export async function verifyToken({
    cookie,
    platform
}: {
    cookie: Cookie;
    platform: PlatformCloudflarePages
}) {
    const token = cookie.get("bakau-design");

    if (!token?.value) {
        return null;
    }

    try {
        const user = await jwt.verify(
            token.value,
            platform?.env?.JWT_SECRET
        );

        if (user) {
            return true;
        }
        
    } catch (error) {
        console.error(error)
    }
}

export async function createToken({
    request,
    cookie,
    platform
}: {
    request: Request
    cookie: Cookie;
    platform: PlatformCloudflarePages
}) {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || 'unknown';
    const ua = request.headers.get('user-agent') || '';

    const fingerprint = `${ip}${ua}`;

    try {
        const token = await jwt.sign(
            {
                id: 1,
                email: "julian@bakaudesign.com",
                fingerprint: fingerprint,
                exp:  Math.floor(Date.now() / 1000) + (24 * (60 * 60))
            },
            platform?.env?.JWT_SECRET as string
        )

        cookie.set("bakau-design", token, {
            path: '/',
            httpOnly: true,
            secure: true,
            maxAge: [1, 'days'],
            sameSite: 'lax',
        });
    } catch (error) {
        console.error(error);
    }
}

export async function deleteTOken({
    cookie,
}: {
    cookie: Cookie;
}) {
    try {
        cookie.delete("bakau-design");
    } catch (error) {
        console.error(error);
    }
}
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [new URL('https://i.pinimg.com/**'), new URL('https://nyraldpvogpzobwayruj.supabase.co/storage/**')],
    },
};

export default nextConfig;

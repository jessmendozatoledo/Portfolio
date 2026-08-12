import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch("https://api.counterapi.dev/v1/jess-portfolio/visits/up", {
            cache: 'no-store'
        });
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Failed to fetch visitor count:", error);
        return NextResponse.json({ count: 1247 }, { status: 500 });
    }
}

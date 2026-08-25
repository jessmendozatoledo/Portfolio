import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Fetch and increment persistent visitor count from active counter service
        const response = await fetch("https://abacus.jasoncameron.dev/hit/jess-portfolio/visits", {
            cache: 'no-store'
        });
        const data = await response.json();
        const count = data.value || 1;
        return NextResponse.json({ count });
    } catch (error) {
        console.error("Failed to fetch visitor count:", error);
        return NextResponse.json({ count: 1 });
    }
}

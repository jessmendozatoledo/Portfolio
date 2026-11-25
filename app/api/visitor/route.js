import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const COUNT_FILE = path.join(process.cwd(), 'data', 'visitor-count.json');

// Ensure data directory exists if possible
try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
} catch {
    // Read-only filesystem in serverless environments (e.g., Vercel)
}

let inMemoryCount = null;

function getLocalCount() {
    try {
        if (fs.existsSync(COUNT_FILE)) {
            const data = fs.readFileSync(COUNT_FILE, 'utf8');
            const parsed = JSON.parse(data);
            if (typeof parsed.count === 'number') {
                return parsed.count;
            }
        }
    } catch (error) {
        console.error("Error reading local count file:", error);
    }
    return inMemoryCount || 360;
}

function saveLocalCount(count) {
    inMemoryCount = count;
    try {
        fs.writeFileSync(COUNT_FILE, JSON.stringify({
            count,
            updatedAt: new Date().toISOString()
        }, null, 2));
    } catch {
        // Read-only filesystem on serverless/Vercel; inMemoryCount retains value for warm instances
    }
}

const NO_CACHE_HEADERS = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
    'Pragma': 'no-cache',
    'Expires': '0',
};

export async function GET() {
    // 1. Try cloud counter API for reliable cross-deployment persistence
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const response = await fetch("https://countapi.mileshilliard.com/api/v1/hit/jess-toledo-portfolio-visitor-counter", {
            cache: 'no-store',
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
            const data = await response.json();
            const count = Number(data.value);
            if (!isNaN(count) && count > 0) {
                saveLocalCount(count);
                return NextResponse.json({ count }, { headers: NO_CACHE_HEADERS });
            }
        }
    } catch (err) {
        console.log("External visitor counter unavailable, falling back to local counter:", err?.message || err);
    }

    // 2. Fallback to local / in-memory counter
    const current = getLocalCount();
    const count = current + 1;
    saveLocalCount(count);

    return NextResponse.json({ count }, { headers: NO_CACHE_HEADERS });
}

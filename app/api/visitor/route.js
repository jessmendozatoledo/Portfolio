import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const COUNT_FILE = path.join(process.cwd(), 'data', 'visitor-count.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
    fs.mkdirSync(path.join(process.cwd(), 'data'));
}

function getCount() {
    try {
        if (fs.existsSync(COUNT_FILE)) {
            const data = fs.readFileSync(COUNT_FILE, 'utf8');
            return JSON.parse(data).count || 0;
        }
    } catch (error) {
        console.error("Error reading count:", error);
    }
    return 0;
}

function saveCount(count) {
    try {
        fs.writeFileSync(COUNT_FILE, JSON.stringify({
            count,
            updatedAt: new Date().toISOString()
        }));
    } catch (error) {
        console.error("Error saving count:", error);
    }
}

export async function GET() {
    try {
        // Try external service first
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const response = await fetch("https://abacus.jasoncameron.dev/hit/jess-portfolio/visits", {
            cache: 'no-store',
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
            const data = await response.json();
            const count = data.value || 1;
            saveCount(count);
            return NextResponse.json({ count });
        }
        throw new Error('Service unavailable');
    } catch (error) {
        // Use file-based counter
        console.log("Using local counter (external service unavailable)");
        let count = getCount();
        count += 1;
        saveCount(count);
        return NextResponse.json({ count });
    }
}
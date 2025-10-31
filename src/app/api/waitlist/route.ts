import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const WAITLIST_FILE = path.join(process.cwd(), 'data', 'waitlist.json');

interface WaitlistEntry {
  email: string;
  timestamp: string;
}

async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }
}

async function readWaitlist(): Promise<WaitlistEntry[]> {
  try {
    if (!existsSync(WAITLIST_FILE)) {
      return [];
    }
    const fileContent = await readFile(WAITLIST_FILE, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading waitlist:', error);
    return [];
  }
}

async function writeWaitlist(entries: WaitlistEntry[]): Promise<void> {
  await ensureDataDirectory();
  await writeFile(WAITLIST_FILE, JSON.stringify(entries, null, 2), 'utf-8');
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!validateEmail(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Read existing waitlist
    const entries = await readWaitlist();

    // Check if email already exists
    if (entries.some(entry => entry.email === normalizedEmail)) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 409 }
      );
    }

    // Add new entry
    const newEntry: WaitlistEntry = {
      email: normalizedEmail,
      timestamp: new Date().toISOString(),
    };

    entries.push(newEntry);

    // Save to file
    await writeWaitlist(entries);

    return NextResponse.json(
      { 
        message: 'Successfully joined the waitlist!',
        success: true 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Failed to process waitlist signup' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to view waitlist (could be protected with auth in production)
export async function GET() {
  try {
    const entries = await readWaitlist();
    return NextResponse.json(
      { 
        entries,
        count: entries.length 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching waitlist:', error);
    return NextResponse.json(
      { error: 'Failed to fetch waitlist' },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, readFile, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const WAITLIST_FILE = path.join(process.cwd(), 'data', 'waitlist.json');

interface WaitlistEntry {
  email: string;
  timestamp: string;
}

async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await access(dataDir, constants.F_OK);
  } catch {
    // Directory doesn't exist, create it
    try {
      await mkdir(dataDir, { recursive: true, mode: 0o755 });
    } catch (error) {
      console.error('Error creating data directory:', error);
      throw new Error('Failed to create data directory');
    }
  }
}

async function readWaitlist(): Promise<WaitlistEntry[]> {
  try {
    await access(WAITLIST_FILE, constants.F_OK);
    const fileContent = await readFile(WAITLIST_FILE, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    // File doesn't exist or can't be read, return empty array
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    console.error('Error reading waitlist:', error);
    return [];
  }
}

async function writeWaitlist(entries: WaitlistEntry[]): Promise<void> {
  try {
    await ensureDataDirectory();
    await writeFile(WAITLIST_FILE, JSON.stringify(entries, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing waitlist:', error);
    throw new Error('Failed to save waitlist entry');
  }
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
    try {
      await writeWaitlist(entries);
    } catch (writeError) {
      console.error('Failed to write waitlist:', writeError);
      return NextResponse.json(
        { 
          error: 'Failed to save your email. Please try again later.',
          details: process.env.NODE_ENV === 'development' 
            ? (writeError instanceof Error ? writeError.message : 'Unknown error')
            : undefined
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Successfully joined the waitlist!',
        success: true 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to process waitlist signup';
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' 
          ? String(error)
          : undefined
      },
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


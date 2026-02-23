import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

// In-memory fallback when Supabase is not configured (demo mode)
interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

const fallbackEntries: GuestbookEntry[] = [
  {
    id: "demo-1",
    name: "Demo User",
    message: "Welcome to Marc's guestbook! Connect Supabase for persistent storage.",
    created_at: new Date().toISOString(),
  },
];

// GET /api/guestbook - Fetch all guestbook entries
export async function GET() {
  // Fallback: in-memory demo mode
  if (!isSupabaseConfigured) {
    return NextResponse.json(fallbackEntries);
  }

  try {
    const { data, error } = await supabase!
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch guestbook entries." }, { status: 500 });
  }
}

// DELETE /api/guestbook - Delete a guestbook entry by id
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Entry ID is required." },
        { status: 400 }
      );
    }

    // Fallback: in-memory demo mode
    if (!isSupabaseConfigured) {
      const index = fallbackEntries.findIndex((e) => e.id === id);
      if (index === -1) {
        return NextResponse.json(
          { error: "Entry not found." },
          { status: 404 }
        );
      }
      fallbackEntries.splice(index, 1);
      return NextResponse.json({ success: true });
    }

    const { error } = await supabase!
      .from("guestbook")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete guestbook entry." }, { status: 500 });
  }
}

// POST /api/guestbook - Create a new guestbook entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required." },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        { error: "Name must be 100 characters or less." },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "Message must be 500 characters or less." },
        { status: 400 }
      );
    }

    // Fallback: in-memory demo mode
    if (!isSupabaseConfigured) {
      const newEntry: GuestbookEntry = {
        id: `demo-${Date.now()}`,
        name: name.trim(),
        message: message.trim(),
        created_at: new Date().toISOString(),
      };
      fallbackEntries.unshift(newEntry);
      return NextResponse.json(newEntry, { status: 201 });
    }

    const { data, error } = await supabase!
      .from("guestbook")
      .insert([{ name: name.trim(), message: message.trim() }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create guestbook entry." }, { status: 500 });
  }
}

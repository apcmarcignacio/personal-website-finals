"use client";

import { useState, useEffect, useCallback } from "react";
import { MessageSquare, Send, Loader2, RefreshCw, Trash2, X } from "lucide-react";

interface GuestbookEntry {
  id: number | string;
  name: string;
  message: string;
  created_at: string;
}

export function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fetchEntries = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/guestbook");
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned an invalid response. Check Supabase configuration.");
      }
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to fetch entries.");
      }
      const data = await res.json();
      setEntries(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned an invalid response. Check Supabase configuration.");
      }
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to post entry.");
      }

      setName("");
      setMessage("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      await fetchEntries();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number | string) => {
    setDeletingId(id);
    setError(null);

    try {
      const res = await fetch(`/api/guestbook?id=${id}`, {
        method: "DELETE",
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned an invalid response.");
      }
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete entry.");
      }

      setConfirmDeleteId(null);
      await fetchEntries();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section id="guestbook" className="scroll-mt-20">
      {/* Section heading */}
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-sm text-primary">03.</span>
        <h2 className="text-xl font-bold text-heading md:text-2xl whitespace-nowrap">
          Guestbook
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm"
      >
        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="guestbook-name"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Name
            </label>
            <input
              id="guestbook-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={100}
              required
              className="w-full rounded-md border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="guestbook-message"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Message
            </label>
            <textarea
              id="guestbook-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Leave a message..."
              maxLength={500}
              required
              rows={3}
              className="w-full resize-none rounded-md border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm text-primary" role="status">
              Message posted successfully!
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !name.trim() || !message.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {isSubmitting ? "Posting..." : "Sign Guestbook"}
          </button>
        </div>
      </form>

      {/* Entries list header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {entries.length} {entries.length === 1 ? "entry" : "entries"}
        </p>
        <button
          onClick={fetchEntries}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary disabled:opacity-50"
          aria-label="Refresh guestbook entries"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Entries */}
      {isLoading && entries.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : entries.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            No entries yet. Be the first to sign the guestbook!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {entries.map((entry) => (
            <article
              key={entry.id}
              className="group rounded-lg border border-border bg-card/50 p-4 backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:bg-card/80"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-baseline gap-3 min-w-0">
                  <h3 className="text-sm font-semibold text-primary truncate">
                    {entry.name}
                  </h3>
                  <time className="shrink-0 text-xs text-muted-foreground">
                    {formatDate(entry.created_at)}
                  </time>
                </div>

                {/* Delete button -- visible on hover or when confirming */}
                {confirmDeleteId === entry.id ? (
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleDelete(entry.id)}
                      disabled={deletingId === entry.id}
                      className="inline-flex items-center gap-1 rounded-md bg-destructive px-2.5 py-1 text-xs font-medium text-destructive-foreground transition-colors hover:bg-destructive/80 disabled:opacity-50"
                      aria-label={`Confirm delete entry by ${entry.name}`}
                    >
                      {deletingId === entry.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="inline-flex items-center rounded-md border border-border px-1.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/30"
                      aria-label="Cancel delete"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDeleteId(entry.id)}
                    className="shrink-0 rounded-md p-1.5 text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`Delete entry by ${entry.name}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <p className="text-sm leading-relaxed text-foreground">
                {entry.message}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

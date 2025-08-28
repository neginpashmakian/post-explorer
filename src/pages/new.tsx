import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [msg, setMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validTitle = title.trim().length > 4;
  const validBody = body.trim().length > 10;
  const canSubmit = validTitle && validBody && !submitting;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setMsg("");
    try {
      // JSONPlaceholder accepts POST and echoes back; in real life we'd hit our own API route.
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, userId: 1 }),
      });
      if (!res.ok) throw new Error("Failed to create");
      setMsg("✅ Created (mock)!");
      setTitle("");
      setBody("");
    } catch (e: any) {
      setMsg("❌ " + (e?.message ?? "Error"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto p-4">
      <Card>
        <h1 className="text-xl font-semibold mb-3">Create Post</h1>
        <form onSubmit={onSubmit} className="grid gap3">
          <label>
            <span className="block mb-1">Title</span>
            <input
              className="w-full border rounded px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-invalid={!validTitle}
              aria-describedby="title-help"
              required
              minLength={4}
            />
            <small id="title-help" className="text-gray-600">
              Min 4 chars.
            </small>
          </label>

          <label>
            <span className="block mb-1">Body</span>
            <textarea
              className="w-full border rounded px-3 py-2"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              aria-invalid={!validBody}
              aria-describedby="body-help"
              required
              minLength={10}
              rows={4}
            />
            <small id="body-help" className="text-gray-600">
              Min 10 chars.
            </small>
          </label>

          <div className="flex gap-2">
            <Button type="submit" disabled={!canSubmit}>
              {submitting ? "Submitting…" : "Submit"}
            </Button>
            <Button
              type="reset"
              variant="secondary"
              onClick={() => {
                setTitle("");
                setBody("");
              }}
            >
              Reset
            </Button>
          </div>
          {msg && <p aria-live="polite">{msg}</p>}
        </form>
      </Card>
    </main>
  );
}

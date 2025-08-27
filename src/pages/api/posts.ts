import type { NextApiRequest, NextApiResponse } from "next";
import type { Paged, Post } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Paged<Post> | { error: string }>
) {
  try {
    const q = String(req.query.q ?? "").toLowerCase();
    const page = Math.max(1, parseInt(String(req.query.page ?? "1"), 10));
    const limit = Math.min(
      50,
      Math.max(1, parseInt(String(req.query.limit ?? "10"), 10))
    );

    const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!resp.ok) throw new Error("Upstream failed");
    const all: Post[] = await resp.json();

    const filtered = q
      ? all.filter((p) => p.title.toLowerCase().includes(q))
      : all;
    const total = filtered.length;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    res.status(200).json({ data, total, page, limit });
  } catch (e) {
    res.status(500).json({ error: "Internal error" });
  }
}

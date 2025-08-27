import type { Paged, Post } from "../types";

export async function getPosts(params: {
  q?: string;
  page?: number;
  limit?: number;
}) {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.page) search.set("page", params.page.toString());
  if (params.limit) search.set("limit", params.limit.toString());

  const res = await fetch(`/api/posts?${search.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json() as Promise<Paged<Post>>;
}

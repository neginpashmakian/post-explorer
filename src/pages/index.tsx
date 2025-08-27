import Head from "next/head";
import { useCallback, useEffect, useMemo, useState } from "react";
import Pagination from "../components/Pagination";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getPosts } from "../lib/api";
import type { Post } from "../types";
const LIMIT = 10;
export default function Home() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [favs, setFavs] = useLocalStorage<number[]>("favs", []);

  const isFav = useCallback((id: number) => favs.includes(id), [favs]);

  const toggleFav = useCallback(
    (id: number) => {
      setFavs((curr) =>
        curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id]
      );
    },
    [setFavs]
  );
  useEffect(() => {
    let ignore = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, total } = await getPosts({
          q: query,
          page,
          limit: LIMIT,
        });
        if (!ignore) {
          setPosts(data);
          setTotal(total);
        }
      } catch (e: any) {
        if (!ignore) setError(e?.message ?? "Error");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [query, page]);

  const handleSearch = useCallback((v: string) => {
    setPage(1);
    setQuery(v);
  }, []);

  const list = useMemo(
    () => (
      <div>
        {posts.map((p) => (
          <PostCard
            key={p.id}
            post={p}
            onFavToggle={toggleFav}
            isFav={isFav(p.id)}
          />
        ))}
      </div>
    ),
    [posts, toggleFav, isFav]
  );

  return (
    <>
      <Head>
        <title>Post Explorer</title>
      </Head>
      <main className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-3">Post Explorer</h1>
        <SearchBar
          value={query}
          onChange={handleSearch}
          placeholder="Search titles…"
        />

        {loading && (
          <p role="status" aria-live="polite">
            Loading…
          </p>
        )}
        {error && (
          <p role="alert" className="text-red-700">
            Error: {error}
          </p>
        )}
        {!loading && !error && (
          <>
            {list}
            <Pagination
              page={page}
              total={total}
              limit={LIMIT}
              onPageChange={setPage}
            />
          </>
        )}
      </main>
    </>
  );
}

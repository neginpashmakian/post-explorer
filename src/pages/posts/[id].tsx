import { GetServerSideProps } from "next";
import Link from "next/link";
import Button from "../../components/Button";
import Card from "../../components/Card";
import type { Post } from "../../types";

type Props = { post: Post | null };

export default function PostDetail({ post }: Props) {
  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <main className="max-w-3xl mx-auto p-4">
      <Card>
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-700 mb-4">{post.body}</p>
        <Link href="/">
          <Button variant="secondary">← Back</Button>
        </Link>
      </Card>
    </main>
  );
}
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const id = ctx.params?.id as string;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) return { props: { post: null } };
  const post: Post = await res.json();
  return { props: { post } };
};

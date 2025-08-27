import Link from "next/link";
import { Post } from "../types";
import Button from "./Button";
import Card from "./Card";

type Props = {
  post: Post;
  onFavToggle?: (id: number) => void;
  isFav?: boolean;
};

export default function PostCard({ post, onFavToggle, isFav }: Props) {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
      <p className="text-sm text-gray-700 mb-3">{post.body}</p>
      <div className="flex gap-2">
        <Link
          href={`/posts/${post.id}`}
          aria-label={`Open details for ${post.title}`}
        >
          <Button variant="secondary">View Details</Button>
          {onFavToggle && (
            <Button variant="secondary" onClick={() => onFavToggle(post.id)}>
              {isFav ? "★ Unfavorite" : "☆ Favorite"}
            </Button>
          )}
        </Link>
      </div>
    </Card>
  );
}

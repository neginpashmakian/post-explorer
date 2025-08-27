import Button from "./Button";
type props = {
  page: number;
  total: number;
  limit: number;
  onPageChange: (p: number) => void;
};

export default function Pagination({
  page,
  total,
  limit,
  onPageChange,
}: props) {
  const pages = Math.max(1, Math.ceil(total / limit));
  const canPrev = page > 1;
  const canNext = page < pages;
  return (
    <div className="flex items-center gap-2 mt-4">
      <Button
        onClick={() => onPageChange(page - 1)}
        disabled={!canPrev}
        variant="secondary"
      >
        Previous
      </Button>
      <Button
        onClick={() => onPageChange(page + 1)}
        disabled={!canNext}
        variant="secondary"
      >
        Next
      </Button>
    </div>
  );
}

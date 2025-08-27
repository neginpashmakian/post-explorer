type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};
export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}: Props) {
  return (
    <label className="block mb-2">
      <span className="sr-only">Search</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border rounded px-3 py-2"
        aria-label="Search posts by title"
      />
    </label>
  );
}

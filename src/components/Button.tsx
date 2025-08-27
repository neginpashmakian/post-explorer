import { ButtonHTMLAttributes, PropsWithChildren } from "react";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export default function Button({
  variant = "primary",
  ...props
}: PropsWithChildren<Props>) {
  const base = "px-3 py-2 rounded focus:outline-none focus:ring";
  const styles =
    variant === "primary"
      ? "bg-black text-white hover:opacity-90"
      : "bg-gray-200 text-black hover:bg-gray-300";

  return (
    <button
      {...props}
      className={`${base} ${styles} ${props.className ?? ""}`}
    />
  );
}

import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  score: "low" | "medium" | "high";
}

export function ProductCard({ id, name, score }: ProductCardProps) {
  const scoreColor =
    score === "low"
      ? "text-emerald-300"
      : score === "medium"
      ? "text-amber-300"
      : "text-rose-300";

  return (
    <Link
      href={`/product/${id}`}
      className="block rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 hover:bg-white/10"
    >
      <div className="text-sm font-semibold text-slate-100">{name}</div>
      <div className={`mt-1 text-xs ${scoreColor}`}>Risk: {score}</div>
    </Link>
  );
}



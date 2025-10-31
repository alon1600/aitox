import Link from "next/link";

function ShoppingListItem({ 
  id,
  name, 
  alt, 
  riskLevel 
}: { 
  id: string;
  name: string; 
  alt: string;
  riskLevel: string;
}) {
  const riskColors: Record<string, string> = {
    "very-high": "text-rose-300",
    "high": "text-orange-300",
    "medium": "text-amber-300",
    "low": "text-emerald-300",
  };

  return (
    <li className="flex items-start justify-between gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 hover:bg-white/8 transition-all">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="text-sm font-semibold text-slate-100">{name}</div>
          <span className={`text-xs font-medium ${riskColors[riskLevel] || riskColors.medium}`}>
            {riskLevel.replace("-", " ").toUpperCase()}
          </span>
        </div>
        <div className="text-xs text-slate-400 mb-2">
          Safer alternative: <span className="text-slate-300 font-medium">{alt}</span>
        </div>
        <div className="flex items-center gap-2">
          <Link 
            href={`/product/${id}`}
            className="text-xs text-cyan-300 hover:text-cyan-200 underline"
          >
            View detailed evaluation
          </Link>
        </div>
      </div>
      <Link 
        href={`/product/${id}`}
        className="rounded-xl bg-white/10 hover:bg-white/15 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20 transition-all"
      >
        Evaluate
      </Link>
    </li>
  );
}

export default function RecommendationsPage() {
  return (
    <div className="mx-auto min-h-[100svh] w-full max-w-md px-6 pb-28 pt-10">
      <h1 className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 bg-clip-text text-2xl font-extrabold text-transparent">
        Personalized recommendations
      </h1>
      <p className="mt-2 text-slate-300">
        Here's a starter shopping list based on the items we detected. Replace
        high‑risk products with safer picks.
      </p>

      <ul className="mt-5 space-y-3">
        <ShoppingListItem 
          id="1"
          name="Non‑stick pan (PFOA/PTFE)" 
          alt="Ceramic-coated skillet" 
          riskLevel="high"
        />
        <ShoppingListItem 
          id="2"
          name="Plastic baby bottle" 
          alt="Borosilicate glass bottle" 
          riskLevel="very-high"
        />
        <ShoppingListItem 
          id="3"
          name="Fragrance hand soap" 
          alt="Unscented EWG‑verified soap" 
          riskLevel="medium"
        />
      </ul>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Link href="/upload" className="rounded-2xl bg-white/10 py-3 text-center font-semibold ring-1 ring-white/10">
          Add more photos
        </Link>
        <Link href="/shop" className="rounded-2xl bg-white py-3 text-center font-semibold text-slate-900 ring-1 ring-white/10">
          Shop safer picks
        </Link>
      </div>
    </div>
  );
}

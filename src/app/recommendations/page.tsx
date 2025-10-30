import Link from "next/link";

function ShoppingListItem({ name, alt }: { name: string; alt: string }) {
  return (
    <li className="flex items-start justify-between gap-3 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
      <div>
        <div className="text-sm font-semibold text-slate-100">{name}</div>
        <div className="text-xs text-slate-400">Safer alternative: {alt}</div>
      </div>
      <Link href="/shop" className="rounded-xl bg-white px-3 py-1 text-xs font-semibold text-slate-900 ring-1 ring-white/10">
        View
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
        Here’s a starter shopping list based on the items we detected. Replace
        high‑risk products with safer picks.
      </p>

      <ul className="mt-5 space-y-3">
        <ShoppingListItem name="Non‑stick pan (PFOA/PTFE)" alt="Ceramic-coated skillet" />
        <ShoppingListItem name="Plastic baby bottle" alt="Borosilicate glass bottle" />
        <ShoppingListItem name="Fragrance hand soap" alt="Unscented EWG‑verified soap" />
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



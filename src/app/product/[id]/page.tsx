interface Props {
  params: { id: string };
}

export default function ProductDetailPage({ params }: Props) {
  const { id } = params;
  return (
    <div className="mx-auto min-h-[100svh] w-full max-w-md px-6 pb-28 pt-10">
      <h1 className="text-2xl font-bold">Product #{id}</h1>
      <p className="mt-2 text-slate-300">
        Detailed toxicology summary and safer alternatives will appear here.
      </p>
      <div className="mt-4 space-y-3">
        <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
          <div className="text-sm font-semibold text-slate-100">Risk factors</div>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-300">
            <li>Ingredient disclosure</li>
            <li>Regulatory warnings</li>
            <li>Peer‑reviewed evidence</li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
          <div className="text-sm font-semibold text-slate-100">Safer alternatives</div>
          <p className="mt-2 text-sm text-slate-300">Coming soon.</p>
        </div>
      </div>
    </div>
  );
}



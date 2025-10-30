import { StatsCard } from "@/components/StatsCard";
import { SearchBar } from "@/components/SearchBar";
import { Chip } from "@/components/Chip";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col">
      <main className="flex flex-1 flex-col px-6 lg:px-6 pb-28 pt-10 lg:pt-16">
        <header className="text-center lg:text-left max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
              Make safer choices in seconds
            </span>
          </h1>
          <p className="mt-3 text-lg leading-7 text-slate-300">
            Instantly vet any product for hundreds of chemicals using research from
            <span className="ml-1 font-semibold text-slate-100">12,000+ peer‑reviewed studies</span>.
          </p>

          <div className="mt-6 lg:mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-xl">
            <a href="#search" className="rounded-2xl bg-white text-slate-900 py-3 font-semibold shadow ring-1 ring-white/10 hover:bg-slate-100">
              Start a free search
            </a>
            <Link href="/shop" className="rounded-2xl bg-white/10 py-3 font-semibold text-slate-100 shadow ring-1 ring-white/10 hover:bg-white/15 text-center">
              Browse safer products
            </Link>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            No account needed. Private, fast, and evidence‑backed.
          </p>
        </header>

        <div className="mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 lg:max-w-2xl">
            <div id="search">
              <SearchBar />
            </div>
            <section className="mt-5">
              <h3 className="text-center lg:text-left text-sm font-semibold text-slate-300">
                Try searching:
              </h3>
              <div className="mt-3 flex flex-wrap lg:justify-start justify-center gap-2">
                {["Teflon pans","Baby bottles","Shampoo","Rugs","Hand soap"].map((label) => (
                  <Chip key={label} label={label} />
                ))}
              </div>
            </section>

            <section className="mt-6">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-sm text-slate-400">Or</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <Link
                href="/upload"
                className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-white/10 py-4 text-base font-semibold text-slate-100 ring-1 ring-white/10 hover:bg-white/15"
              >
                <span className="text-xl">📷</span>
                Scan your home (beta)
              </Link>
            </section>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-16">
            <StatsCard
          stats={[
            { value: "500K+", label: "Products\nAnalyzed" },
            { value: "12K+", label: "Scientific\nStudies" },
            { value: "100%", label: "Expert\nVetted" },
          ].map((s) => ({ value: s.value, label: s.label.replace("\\n", " ") }))}
        />
          </div>
        </div>
        <section className="mt-12">
          <h2 className="text-center lg:text-left text-lg font-bold text-white">Why families and professionals trust AI Toxicologist</h2>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-4xl">
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="text-2xl">🧪</div>
              <div className="mt-2 text-sm font-semibold text-slate-100">Evidence‑based</div>
              <p className="mt-1 text-sm leading-6 text-slate-300">Scores grounded in toxicology literature and regulatory guidance.</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="text-2xl">⚡</div>
              <div className="mt-2 text-sm font-semibold text-slate-100">Instant</div>
              <p className="mt-1 text-sm leading-6 text-slate-300">Search any product and get risk flags in seconds.</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="text-2xl">🔒</div>
              <div className="mt-2 text-sm font-semibold text-slate-100">Private</div>
              <p className="mt-1 text-sm leading-6 text-slate-300">We don’t sell your data. Your searches stay on your device.</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 lg:col-span-1">
              <div className="text-2xl">✅</div>
              <div className="mt-2 text-sm font-semibold text-slate-100">Actionable</div>
              <p className="mt-1 text-sm leading-6 text-slate-300">Clear alternatives and simple steps to reduce exposure.</p>
            </div>
          </div>
        </section>

        <section className="mt-12 lg:max-w-3xl">
          <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
            <blockquote className="text-sm italic text-slate-200">“I finally feel confident buying baby products. The research summaries are gold.”</blockquote>
            <div className="mt-2 text-xs text-slate-400">— Jenna, new parent</div>
          </div>
        </section>

        <section className="mt-12">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-xl">
            <Link href="/shop" className="rounded-2xl bg-white text-center text-slate-900 py-3 font-semibold shadow ring-1 ring-white/10 hover:bg-slate-100">Shop safer picks</Link>
            <Link href="/profile" className="rounded-2xl bg-white/10 text-center py-3 font-semibold text-slate-100 ring-1 ring-white/10 hover:bg-white/15">Join the waitlist</Link>
          </div>
          <p className="mt-3 text-center text-xs text-slate-400">Free during beta. Cancel anytime.</p>
        </section>
      </main>
    </div>
  );
}

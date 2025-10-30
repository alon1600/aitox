import { StatsCard } from "@/components/StatsCard";
import { SearchBar } from "@/components/SearchBar";
import { Chip } from "@/components/Chip";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col">
      <main className="flex flex-1 flex-col px-6 lg:px-8 pb-28 pt-12 lg:pt-20">
        <header className="text-center lg:text-left max-w-4xl">
          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-indigo-200 via-fuchsia-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(139,92,246,0.3)]">
              Make safer choices in seconds
            </span>
          </h1>
          <p className="mt-5 lg:mt-6 text-xl lg:text-2xl leading-relaxed text-slate-200 font-light">
            Instantly vet any product for hundreds of chemicals using research from
            <span className="ml-1.5 font-semibold text-white">12,000+ peer‑reviewed studies</span>.
          </p>

          <div className="mt-8 lg:mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-2xl">
            <a href="#search" className="group rounded-2xl bg-white text-slate-900 px-6 py-4 font-semibold shadow-xl shadow-black/20 ring-1 ring-white/20 hover:bg-slate-50 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300 text-center lg:text-left">
              Start a free search
            </a>
            <Link href="/shop" className="group rounded-2xl bg-white/10 backdrop-blur-xl px-6 py-4 font-semibold text-white shadow-xl shadow-black/20 ring-1 ring-white/20 hover:bg-white/15 hover:ring-white/30 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300 text-center">
              Browse safer products
            </Link>
          </div>

          <p className="mt-4 lg:mt-5 text-sm text-slate-400/90">
            No account needed. Private, fast, and evidence‑backed.
          </p>
        </header>

        <div className="mt-10 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7 lg:max-w-2xl">
            <div id="search">
              <SearchBar />
            </div>
            <section className="mt-6 lg:mt-8">
              <h3 className="text-center lg:text-left text-sm font-semibold text-slate-300 uppercase tracking-wide">
                Try searching:
              </h3>
              <div className="mt-4 flex flex-wrap lg:justify-start justify-center gap-2.5">
                {["Teflon pans","Baby bottles","Shampoo","Rugs","Hand soap"].map((label) => (
                  <Chip key={label} label={label} />
                ))}
              </div>
            </section>

            <section className="mt-8">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/20" />
                <span className="text-sm font-medium text-slate-400">Or</span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/20 to-white/20" />
              </div>
              <Link
                href="/upload"
                className="mt-5 group flex w-full items-center justify-center gap-3 rounded-2xl bg-white/10 backdrop-blur-xl py-4 text-base font-semibold text-slate-100 shadow-lg shadow-black/20 ring-1 ring-white/20 hover:bg-white/15 hover:ring-white/30 hover:shadow-xl hover:shadow-black/30 transition-all duration-300"
              >
                <span className="text-xl">📷</span>
                Scan your home (beta)
              </Link>
            </section>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-20">
            <StatsCard
          stats={[
            { value: "500K+", label: "Products\nAnalyzed" },
            { value: "12K+", label: "Scientific\nStudies" },
            { value: "100%", label: "Expert\nVetted" },
          ].map((s) => ({ value: s.value, label: s.label.replace("\\n", " ") }))}
        />
          </div>
        </div>
        <section className="mt-16 lg:mt-20">
          <h2 className="text-center lg:text-left text-2xl lg:text-3xl font-bold text-white mb-8 lg:mb-10">Why families and professionals trust AI Toxicologist</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:max-w-5xl">
            <div className="group rounded-2xl bg-white/5 backdrop-blur-xl p-5 lg:p-6 ring-1 ring-white/10 hover:bg-white/8 hover:ring-white/20 transition-all duration-300">
              <div className="text-3xl mb-3">🧪</div>
              <div className="text-base font-semibold text-white mb-2">Evidence‑based</div>
              <p className="text-sm leading-relaxed text-slate-300">Scores grounded in toxicology literature and regulatory guidance.</p>
            </div>
            <div className="group rounded-2xl bg-white/5 backdrop-blur-xl p-5 lg:p-6 ring-1 ring-white/10 hover:bg-white/8 hover:ring-white/20 transition-all duration-300">
              <div className="text-3xl mb-3">⚡</div>
              <div className="text-base font-semibold text-white mb-2">Instant</div>
              <p className="text-sm leading-relaxed text-slate-300">Search any product and get risk flags in seconds.</p>
            </div>
            <div className="group rounded-2xl bg-white/5 backdrop-blur-xl p-5 lg:p-6 ring-1 ring-white/10 hover:bg-white/8 hover:ring-white/20 transition-all duration-300">
              <div className="text-3xl mb-3">🔒</div>
              <div className="text-base font-semibold text-white mb-2">Private</div>
              <p className="text-sm leading-relaxed text-slate-300">We don't sell your data. Your searches stay on your device.</p>
            </div>
            <div className="group rounded-2xl bg-white/5 backdrop-blur-xl p-5 lg:p-6 ring-1 ring-white/10 hover:bg-white/8 hover:ring-white/20 transition-all duration-300">
              <div className="text-3xl mb-3">✅</div>
              <div className="text-base font-semibold text-white mb-2">Actionable</div>
              <p className="text-sm leading-relaxed text-slate-300">Clear alternatives and simple steps to reduce exposure.</p>
            </div>
          </div>
        </section>

        <section className="mt-16 lg:mt-20 lg:max-w-3xl">
          <div className="rounded-3xl bg-white/5 backdrop-blur-xl p-6 lg:p-8 ring-1 ring-white/10 shadow-xl shadow-black/20">
            <blockquote className="text-base lg:text-lg italic text-slate-100 leading-relaxed">"I finally feel confident buying baby products. The research summaries are gold."</blockquote>
            <div className="mt-4 text-sm font-medium text-slate-400">— Jenna, new parent</div>
          </div>
        </section>

        <section className="mt-16 lg:mt-20">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-xl">
            <Link href="/shop" className="rounded-2xl bg-white text-center text-slate-900 px-6 py-4 font-semibold shadow-xl shadow-black/20 ring-1 ring-white/20 hover:bg-slate-50 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300">Shop safer picks</Link>
            <Link href="/profile" className="rounded-2xl bg-white/10 backdrop-blur-xl text-center px-6 py-4 font-semibold text-white shadow-xl shadow-black/20 ring-1 ring-white/20 hover:bg-white/15 hover:ring-white/30 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300">Join the waitlist</Link>
          </div>
          <p className="mt-4 text-center text-sm text-slate-400/90">Free during beta. Cancel anytime.</p>
        </section>
      </main>
    </div>
  );
}

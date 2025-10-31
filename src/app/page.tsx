import { StatsCard } from "@/components/StatsCard";
import { SearchBar } from "@/components/SearchBar";
import { Chip } from "@/components/Chip";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-[100svh] w-full max-w-[1920px] flex-col">
      <main className="flex flex-1 flex-col px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pb-28 pt-6 sm:pt-8 lg:pt-12 xl:pt-16">
        {/* Hero + Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 items-start">
          
          {/* Left Column: Hero + Search */}
          <div className="lg:col-span-8 xl:col-span-7 order-1">
            <div className="max-w-none lg:max-w-2xl xl:max-w-3xl">
              {/* Badge */}
              <header className="mb-8 sm:mb-10 lg:mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6 lg:mb-8">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">Your Home Toxicologist</span>
                </div>
                
                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold tracking-tight leading-[1.1] mb-4 sm:mb-6">
                  <span className="bg-gradient-to-r from-indigo-100 via-fuchsia-100 via-pink-100 to-cyan-100 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(139,92,246,0.4)] break-words">
                    Make safer choices in seconds
                  </span>
                </h1>
                
                {/* Description */}
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl leading-relaxed text-slate-300 font-light">
                  Instantly vet any product for hundreds of chemicals using research from
                  <span className="ml-1.5 font-semibold text-white bg-white/5 px-2 py-0.5 rounded">12,000+ peer-reviewed studies</span>.
                </p>
              </header>

              {/* Search Section */}
              <div id="search" className="mb-8 sm:mb-10 lg:mb-12">
                <div className="mb-4 lg:mb-6">
                  <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2">Ask anything</h2>
                  <p className="text-base text-slate-300">What product would you like to analyze?</p>
                </div>
                <SearchBar />
              </div>

              {/* Popular Queries */}
              <section className="mb-8 sm:mb-10 lg:mb-12">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                  Popular queries
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {["Teflon pans","Baby bottles","Shampoo","Rugs","Hand soap"].map((label) => (
                    <Chip key={label} label={label} />
                  ))}
                </div>
              </section>

              {/* Alternative Action */}
              <section className="mb-8 lg:mb-0">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-white/15" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Or</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/15 to-white/15" />
                </div>
                <Link
                  href="/upload"
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white/5 backdrop-blur-xl py-4 sm:py-5 text-base font-semibold text-slate-200 shadow-lg shadow-black/20 ring-1 ring-white/15 hover:bg-white/10 hover:ring-white/25 hover:shadow-xl hover:shadow-black/25 transition-all duration-300 border border-white/5"
                >
                  <span className="text-xl">📷</span>
                  <span>Scan your home</span>
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Beta</span>
                </Link>
              </section>
            </div>
          </div>

          {/* Right Column: Stats + Trust Badge */}
          <div className="lg:col-span-4 xl:col-span-5 order-2">
            <div className="lg:sticky lg:top-8 space-y-4 sm:space-y-6">
              <StatsCard
                stats={[
                  { value: "500K+", label: "Products Analyzed" },
                  { value: "12K+", label: "Scientific Studies" },
                  { value: "100%", label: "Expert Vetted" },
                ]}
              />
              
              {/* Trust Badge */}
              <div className="rounded-2xl glass p-5 sm:p-6 ring-1 ring-white/20 shadow-xl shadow-black/25">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 flex items-center justify-center ring-1 ring-emerald-400/30">
                    <span className="text-xl sm:text-2xl">✓</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white mb-1 break-words">Rigorously verified</div>
                    <p className="text-xs leading-relaxed text-slate-300 break-words">
                      Every analysis is backed by peer-reviewed research and expert validation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <section className="mt-16 sm:mt-20 lg:mt-24 xl:mt-32">
          <div className="max-w-7xl">
            <div className="mb-10 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                Why families and professionals trust us
              </h2>
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl">
                Built with intelligence, designed for ease, powered by rigorous science.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              <div className="group relative rounded-2xl bg-white/5 backdrop-blur-xl p-5 sm:p-6 ring-1 ring-white/10 hover:bg-white/8 hover:ring-white/20 hover:scale-[1.02] transition-all duration-300 border border-white/5">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/0 to-cyan-500/0 group-hover:from-indigo-500/10 group-hover:to-cyan-500/10 transition-all duration-300 -z-10"></div>
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🧪</div>
                <div className="text-sm sm:text-base font-semibold text-white mb-2">Evidence-based</div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-400">Scores grounded in toxicology literature and regulatory guidance.</p>
              </div>
              <div className="group relative rounded-2xl bg-white/5 backdrop-blur-xl p-5 sm:p-6 ring-1 ring-white/10 hover:bg-white/8 hover:ring-white/20 hover:scale-[1.02] transition-all duration-300 border border-white/5">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-fuchsia-500/0 to-pink-500/0 group-hover:from-fuchsia-500/10 group-hover:to-pink-500/10 transition-all duration-300 -z-10"></div>
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">⚡</div>
                <div className="text-sm sm:text-base font-semibold text-white mb-2">Instant</div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-400">Search any product and get risk flags in seconds.</p>
              </div>
              <div className="group relative rounded-2xl bg-white/5 backdrop-blur-xl p-5 sm:p-6 ring-1 ring-white/10 hover:bg-white/8 hover:ring-white/20 hover:scale-[1.02] transition-all duration-300 border border-white/5">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/10 group-hover:to-cyan-500/10 transition-all duration-300 -z-10"></div>
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🔒</div>
                <div className="text-sm sm:text-base font-semibold text-white mb-2">Private</div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-400">We don't sell your data. Your searches stay on your device.</p>
              </div>
              <div className="group relative rounded-2xl bg-white/5 backdrop-blur-xl p-5 sm:p-6 ring-1 ring-white/10 hover:bg-white/8 hover:ring-white/20 hover:scale-[1.02] transition-all duration-300 border border-white/5">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/0 to-purple-500/0 group-hover:from-violet-500/10 group-hover:to-purple-500/10 transition-all duration-300 -z-10"></div>
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">✅</div>
                <div className="text-sm sm:text-base font-semibold text-white mb-2">Actionable</div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-400">Clear alternatives and simple steps to reduce exposure.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="mt-16 sm:mt-20 lg:mt-24 xl:mt-32">
          <div className="max-w-4xl">
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl p-6 sm:p-8 lg:p-10 ring-1 ring-white/10 shadow-xl shadow-black/25 border border-white/5">
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-fuchsia-400/20 to-pink-400/20 flex items-center justify-center ring-2 ring-fuchsia-400/30">
                  <span className="text-lg sm:text-xl">"</span>
                </div>
                <div className="flex-1 min-w-0">
                  <blockquote className="text-base sm:text-lg lg:text-xl italic text-slate-100 leading-relaxed mb-3 sm:mb-4 break-words">
                    "I finally feel confident buying baby products. The research summaries are gold."
                  </blockquote>
                  <div className="text-xs sm:text-sm font-medium text-slate-400">— Jenna, new parent</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Footer */}
        <section className="mt-16 sm:mt-20 lg:mt-24 xl:mt-32">
          <div className="max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Link 
                href="/shop" 
                className="rounded-2xl bg-white text-center text-slate-900 px-5 sm:px-6 py-4 sm:py-5 font-semibold shadow-xl shadow-black/25 ring-1 ring-white/30 hover:bg-slate-50 hover:shadow-2xl hover:shadow-black/35 hover:scale-[1.02] transition-all duration-300"
              >
                Shop safer picks
              </Link>
              <Link 
                href="/profile" 
                className="rounded-2xl bg-white/10 backdrop-blur-xl text-center px-5 sm:px-6 py-4 sm:py-5 font-semibold text-white shadow-xl shadow-black/25 ring-1 ring-white/20 hover:bg-white/15 hover:ring-white/30 hover:shadow-2xl hover:shadow-black/30 hover:scale-[1.02] transition-all duration-300 border border-white/5"
              >
                Join the waitlist
              </Link>
            </div>
            <p className="mt-4 sm:mt-5 text-center text-xs sm:text-sm text-slate-500">Free during beta. Cancel anytime.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

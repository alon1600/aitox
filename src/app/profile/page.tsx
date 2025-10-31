import { WaitlistForm } from "@/components/WaitlistForm";

export default function ProfilePage() {
  return (
    <div className="mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col px-4 sm:px-6 lg:px-8 pb-28 pt-10 sm:pt-12 lg:pt-16">
      <div className="max-w-2xl mx-auto w-full">
        {/* Header */}
        <header className="mb-8 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">Join the Waitlist</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-indigo-100 via-fuchsia-100 via-pink-100 to-cyan-100 bg-clip-text text-transparent">
              Get Early Access
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl leading-relaxed text-slate-300 font-light">
            Be among the first to experience new features and updates. We'll keep you informed about product launches, new research integrations, and exclusive access.
          </p>
        </header>

        {/* Waitlist Form Card */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl p-6 sm:p-8 lg:p-10 ring-1 ring-white/10 shadow-xl shadow-black/25 border border-white/5 mb-8">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              Join the Waitlist
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Enter your email below and we'll notify you when new features are available.
            </p>
          </div>
          
          <WaitlistForm />
        </div>

        {/* Benefits Section */}
        <div className="space-y-4 sm:space-y-6">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
            What you'll get:
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-white/5 backdrop-blur-xl p-5 ring-1 ring-white/10 border border-white/5">
              <div className="text-2xl mb-3">🚀</div>
              <div className="text-sm font-semibold text-white mb-1">Early Access</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Be the first to try new features before they launch publicly.
              </p>
            </div>
            
            <div className="rounded-xl bg-white/5 backdrop-blur-xl p-5 ring-1 ring-white/10 border border-white/5">
              <div className="text-2xl mb-3">📧</div>
              <div className="text-sm font-semibold text-white mb-1">Exclusive Updates</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Get insights about new research integrations and product updates.
              </p>
            </div>
            
            <div className="rounded-xl bg-white/5 backdrop-blur-xl p-5 ring-1 ring-white/10 border border-white/5">
              <div className="text-2xl mb-3">💡</div>
              <div className="text-sm font-semibold text-white mb-1">Product Insights</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Learn about new safety features and how we're improving our platform.
              </p>
            </div>
            
            <div className="rounded-xl bg-white/5 backdrop-blur-xl p-5 ring-1 ring-white/10 border border-white/5">
              <div className="text-2xl mb-3">🔒</div>
              <div className="text-sm font-semibold text-white mb-1">Privacy First</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                We'll never spam you. Only important updates, and you can unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



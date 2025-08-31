import Link from 'next/link'

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl p-6 md:p-10 space-y-16">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-200/60 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-200/60 blur-3xl" />
        </div>

        <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-16">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs text-gray-700">
              🎓 MTech in AI • Resource Hub
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              All your <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">semester resources</span> in one place.
            </h1>
            <p className="text-gray-700 text-lg">
              A collaborative hub for IITJ MTech in AI students to upload, organize, and discover lecture notes,
              assignments, lab materials, and blog posts — neatly grouped by <strong>Semester → Subject → Series</strong>.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/blog" className="rounded-xl px-4 py-2 border bg-indigo-600 text-white hover:opacity-95">Browse Blog</Link>
              <Link href="/create/post" className="rounded-xl px-4 py-2 border hover:bg-white">
                Create a Post
              </Link>
              <a href="#features" className="rounded-xl px-4 py-2 border hover:bg-white">
                Explore Features
              </a>
            </div>

            <div className="flex items-center gap-6 pt-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" /> Fine-grained visibility
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500" /> MDX + code highlighting
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-purple-500" /> Series & semester wise
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border bg-white/70 backdrop-blur p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                {['Semester 1','Semester 2','Semester 3','Semester 4'].map((label, i) => (
                  <a key={i} href="/blog" className="group rounded-xl border p-4 hover:shadow-sm transition">
                    <div className="text-sm text-gray-500">{label}</div>
                    <div className="mt-1 font-semibold">Explore resources →</div>
                    <div className="mt-2 text-xs text-gray-500 group-hover:text-gray-700">
                      Notes • Labs • Slides • Links
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-6 rounded-xl border p-4 bg-gradient-to-r from-indigo-600/10 to-fuchsia-600/10">
                <div className="text-sm text-gray-600">Quick actions</div>
                <div className="mt-2 flex flex-wrap gap-3">
                  <Link href="/create/doc" className="rounded-lg border px-3 py-1.5 bg-white hover:bg-gray-50">Upload a Doc</Link>
                  <Link href="/create/post" className="rounded-lg border px-3 py-1.5 bg-white hover:bg-gray-50">Write Notes</Link>
                  <Link href="/blog" className="rounded-lg border px-3 py-1.5 bg-white hover:bg-gray-50">Recent Posts</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="space-y-10">
        <header className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold">Built for AI cohorts</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether it’s DSA, ML, NLP, or CV — keep everything discoverable and secure, with sensible defaults for students and moderators.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Semester → Subject → Series',
              desc: 'Organize resources exactly how classes run. Group multi-part content as a series.'
            },
            {
              title: 'Blog & MDX notes',
              desc: 'Write with Markdown/MDX and highlight code with Shiki. Perfect for cheatsheets & lab guides.'
            },
            {
              title: 'Docs & Links',
              desc: 'Upload PDFs/slides privately, or add external links (Drive, Papers, YouTube).'
            },
            {
              title: 'Visibility & sharing',
              desc: 'Public, signed-in, classroom/semester/subject/series, custom lists, and link-only tokens.'
            },
            {
              title: 'Moderation',
              desc: 'Mark official posts, keep an audit trail (extendable to approvals and roles).'
            },
            {
              title: 'Fast by default',
              desc: 'Next.js App Router with PPR and streaming for snappy page loads.'
            }
          ].map((f, i) => (
            <div key={i} className="rounded-2xl border p-6 bg-white hover:shadow-sm transition">
              <div className="text-2xl">✨</div>
              <h3 className="mt-3 font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-3xl border bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white p-10 md:p-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">MTech in AI Resource Hub</h2>
        <p className="mt-2 text-indigo-100 max-w-2xl mx-auto">
          Join your classmates in building a living knowledge base. Share notes, organize docs, and learn together.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/create/post" className="rounded-xl px-4 py-2 border border-white/30 bg-white/10 hover:bg-white/20">
            Start writing
          </Link>
          <Link href="/blog" className="rounded-xl px-4 py-2 border border-white/30 bg-white/0 hover:bg-white/10">
            See what’s new
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MTech in AI — CampusHub
      </footer>
    </main>
  )
}

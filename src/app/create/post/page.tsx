import { prisma } from '@/lib/db'
import { createPost } from '@/actions/post'

export default async function CreatePostPage() {
  const subjects = await prisma.subject.findMany({ orderBy: { name: 'asc' }, take: 100, include: { semester: { include: { classroom: true } } } })
  const series = await prisma.series.findMany({ orderBy: { title: 'asc' }, take: 200 })

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">New Post</h1>
      <form action={createPost} className="space-y-3">
        <label className="block">Subject
          <select name="subjectId" className="w-full border rounded p-2" required>
            <option value="">Select subject…</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>
                {s.semester.classroom.slug} / {s.semester.slug} / {s.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">Series (optional)
          <select name="seriesId" className="w-full border rounded p-2">
            <option value="">—</option>
            {series.map(x => (<option key={x.id} value={x.id}>{x.title}</option>))}
          </select>
        </label>
        <input name="title" placeholder="Title" className="w-full border rounded p-2" required />
        <input name="slug" placeholder="slug-with-dashes" className="w-full border rounded p-2" required />
        <textarea name="mdx" placeholder="Write in MDX (supports GFM, fenced code)…" className="w-full border rounded p-2 h-64" required />

        <div className="grid md:grid-cols-2 gap-3">
          <label className="block">Status
            <select name="status" className="w-full border rounded p-2">
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Publish</option>
            </select>
          </label>
          <label className="block">Official (mods only)
            <select name="isOfficial" className="w-full border rounded p-2">
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </label>
        </div>

        <fieldset className="border rounded p-3 space-y-2">
          <legend className="text-sm font-medium px-1">Visibility</legend>
          <label className="block">Scope
            <select name="visibilityScope" className="w-full border rounded p-2">
              <option value="PUBLIC">Public</option>
              <option value="SCHOOL">Signed-in users</option>
              <option value="CLASSROOM">Classroom</option>
              <option value="SEMESTER">Semester</option>
              <option value="SUBJECT">Subject</option>
              <option value="SERIES">Series</option>
              <option value="CUSTOM">Custom list (scopeId)</option>
              <option value="LINK">Link-only (share token)</option>
            </select>
          </label>
          <input name="scopeId" placeholder="scopeId (required for CLASSROOM/SEMESTER/SUBJECT/SERIES/CUSTOM)" className="w-full border rounded p-2" />
        </fieldset>

        <div className="flex gap-2">
          <button className="border rounded px-3 py-2" type="submit">Save</button>
        </div>
      </form>
    </main>
  )
}

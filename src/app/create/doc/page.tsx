import { prisma } from '@/lib/db'
import { uploadDoc } from '@/actions/doc'

export default async function CreateDocPage() {
  const subjects = await prisma.subject.findMany({ orderBy: { name: 'asc' }, take: 100, include: { semester: { include: { classroom: true } } } })
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Upload Document</h1>
      <form action={uploadDoc} className="space-y-3">
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
        <input name="title" placeholder="Title" className="w-full border rounded p-2" required />
        <input type="file" name="file" className="w-full" required />

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

        <button className="border rounded px-3 py-2" type="submit">Upload</button>
      </form>
    </main>
  )
}

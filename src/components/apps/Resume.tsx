import { profile, skills } from "@/lib/content";

export function ResumeApp() {
  return (
    <div className="h-full overflow-y-auto bg-white p-6 text-[13px] text-neutral-800">
      <header className="border-b-2 border-blue-900 pb-3">
        <h1 className="text-xl font-bold text-blue-900">{profile.name}</h1>
        <p className="text-neutral-600">{profile.role} &middot; {profile.location}</p>
        <p className="text-neutral-500">
          {profile.email} &middot;{" "}
          <a href={profile.github} target="_blank" rel="noreferrer" className="text-blue-700 underline">
            {profile.github.replace("https://", "")}
          </a>
        </p>
      </header>

      <section className="mt-4">
        <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wide">Education</h2>
        <p className="mt-1">{profile.college}</p>
        <p className="text-neutral-600">
          {profile.degree} &middot; Expected {profile.graduating}
        </p>
      </section>

      <section className="mt-4">
        <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wide">Skills</h2>
        <table className="mt-2 w-full border-collapse text-left">
          <tbody>
            {skills.map((s) => (
              <tr key={s.name} className="border-b border-neutral-200">
                <td className="py-1 pr-3 font-medium">{s.name}</td>
                <td className="py-1 text-neutral-600">{s.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-4">
        <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wide">Note</h2>
        <p className="mt-1 text-neutral-600">
          Second-year student, no professional experience yet -- this page won&apos;t pretend
          otherwise. See the Projects window for real, working, deployed builds instead of a list
          of claimed skills.
        </p>
      </section>
    </div>
  );
}

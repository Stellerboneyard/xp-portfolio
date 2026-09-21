import { projects } from "@/lib/content";

export function ProjectsApp() {
  return (
    <div className="h-full overflow-y-auto bg-[#ece9d8] p-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {projects.map((p) => (
          <a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="xp-panel flex flex-col gap-1 p-3 text-[13px] text-neutral-800 transition hover:brightness-[1.03]"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-900">{p.title}</span>
              <span
                className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                  p.tag === "Live" ? "bg-green-200 text-green-800" : "bg-neutral-200 text-neutral-600"
                }`}
              >
                {p.tag}
              </span>
            </div>
            <p className="text-neutral-600">{p.body}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

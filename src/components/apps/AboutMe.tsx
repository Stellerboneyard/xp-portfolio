import { bio, profile } from "@/lib/content";
import { UserIcon } from "@/components/icons";

export function AboutMeApp() {
  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto p-4 text-[13px] text-neutral-800">
      <div className="flex items-center gap-3">
        <UserIcon size={56} />
        <div>
          <p className="text-base font-bold text-blue-900">{profile.name}</p>
          <p className="text-neutral-600">{profile.role}</p>
          <p className="text-neutral-500">{profile.location}</p>
        </div>
      </div>
      <div className="xp-inset space-y-2 p-3 leading-relaxed">
        {bio.map((line) => (
          <p key={line.slice(0, 12)}>{line}</p>
        ))}
      </div>
      <div className="xp-inset p-3 text-neutral-700">
        <p>
          <span className="font-bold">College:</span> {profile.college}
        </p>
        <p>
          <span className="font-bold">Degree:</span> {profile.degree}
        </p>
        <p>
          <span className="font-bold">Graduating:</span> {profile.graduating}
        </p>
      </div>
    </div>
  );
}

import { openTo, profile } from "@/lib/content";
import { ContactIcon } from "@/components/icons";

export function ContactApp() {
  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto p-4 text-[13px] text-neutral-800">
      <div className="flex items-center gap-3">
        <ContactIcon size={44} />
        <p className="text-base font-bold text-blue-900">Get in touch</p>
      </div>
      <div className="xp-inset space-y-2 p-3">
        <p>
          <span className="font-bold">Email:</span>{" "}
          <a href={`mailto:${profile.email}`} className="text-blue-700 underline">
            {profile.email}
          </a>
        </p>
        <p>
          <span className="font-bold">GitHub:</span>{" "}
          <a href={profile.github} target="_blank" rel="noreferrer" className="text-blue-700 underline">
            {profile.github.replace("https://", "")}
          </a>
        </p>
        <p>
          <span className="font-bold">Location:</span> {profile.location}
        </p>
      </div>
      <div className="xp-inset p-3">
        <p className="font-bold">Open to:</p>
        <ul className="mt-1 list-disc pl-5 text-neutral-700">
          {openTo.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

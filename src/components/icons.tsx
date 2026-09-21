// Original SVG icon set styled after the early-2000s "Luna" desktop look
// (rounded, gradient-shaded, saturated) -- no traced or copied bitmap
// assets, every shape here is hand-built.

type IconProps = { size?: number; className?: string };

export function UserIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className}>
      <defs>
        <linearGradient id="user-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7fb8e6" />
          <stop offset="100%" stopColor="#2f6fa8" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="10" fill="url(#user-body)" />
      <circle cx="24" cy="19" r="8" fill="#fff" opacity="0.95" />
      <path d="M9 41c1-9 8-14 15-14s14 5 15 14" fill="#fff" opacity="0.95" />
    </svg>
  );
}

export function AboutIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
      <defs>
        <linearGradient id="about-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a7d4ff" />
          <stop offset="100%" stopColor="#3f7dc9" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="17" fill="url(#about-g)" stroke="#1f4d80" strokeWidth="1.5" />
      <rect x="18" y="16" width="4" height="14" rx="1.5" fill="#fff" />
      <circle cx="20" cy="10.5" r="2.6" fill="#fff" />
    </svg>
  );
}

export function ResumeIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
      <defs>
        <linearGradient id="resume-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dce6f2" />
        </linearGradient>
      </defs>
      <path d="M9 3h15l7 7v27a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill="url(#resume-g)" stroke="#7a93ad" strokeWidth="1.2" />
      <path d="M24 3v6a1 1 0 0 0 1 1h6z" fill="#b9cbe0" />
      <rect x="11" y="16" width="16" height="2" rx="1" fill="#3f7dc9" />
      <rect x="11" y="21" width="16" height="2" rx="1" fill="#8fa9c4" />
      <rect x="11" y="26" width="11" height="2" rx="1" fill="#8fa9c4" />
    </svg>
  );
}

export function ProjectsIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
      <defs>
        <linearGradient id="folder-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd97a" />
          <stop offset="100%" stopColor="#f2a93c" />
        </linearGradient>
      </defs>
      <path d="M4 12a2 2 0 0 1 2-2h9l3 3h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" fill="url(#folder-g)" stroke="#c67c1e" strokeWidth="1.2" />
      <path d="M4 14h32v2H4z" fill="#ffffff" opacity="0.35" />
      <path d="M13 22l3 3-3 3M20 28l4-9" stroke="#8a4c0e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function ContactIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
      <defs>
        <linearGradient id="mail-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9fd6a8" />
          <stop offset="100%" stopColor="#3f9a54" />
        </linearGradient>
      </defs>
      <rect x="4" y="9" width="32" height="22" rx="3" fill="url(#mail-g)" stroke="#276b37" strokeWidth="1.2" />
      <path d="M5 11l15 11 15-11" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MinesweeperIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
      <rect x="4" y="4" width="32" height="32" rx="4" fill="#c0c0c0" stroke="#7a7a7a" strokeWidth="1.2" />
      <circle cx="20" cy="20" r="9" fill="#2b2b2b" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="20"
          y1="20"
          x2={20 + 12 * Math.cos((angle * Math.PI) / 180)}
          y2={20 + 12 * Math.sin((angle * Math.PI) / 180)}
          stroke="#2b2b2b"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      ))}
      <circle cx="17" cy="17" r="2" fill="#fff" opacity="0.8" />
    </svg>
  );
}

export function RecycleBinIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
      <defs>
        <linearGradient id="bin-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e7edf4" />
          <stop offset="100%" stopColor="#b9c6d6" />
        </linearGradient>
      </defs>
      <path d="M11 13h18l-1.6 20.4a2 2 0 0 1-2 1.6H14.6a2 2 0 0 1-2-1.6z" fill="url(#bin-g)" stroke="#6f8299" strokeWidth="1.2" />
      <rect x="8" y="9" width="24" height="3.2" rx="1.4" fill="#8fa4bc" />
      <rect x="16" y="5" width="8" height="3" rx="1.2" fill="#8fa4bc" />
      <path d="M16 17v13M20 17v13M24 17v13" stroke="#6f8299" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function NotepadIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
      <rect x="7" y="4" width="26" height="32" rx="1.5" fill="#fffef2" stroke="#9a9a7a" strokeWidth="1.2" />
      <rect x="7" y="4" width="6" height="32" fill="#f2c94c" opacity="0.7" />
      <line x1="17" y1="12" x2="29" y2="12" stroke="#8896b3" strokeWidth="1.2" />
      <line x1="17" y1="17" x2="29" y2="17" stroke="#8896b3" strokeWidth="1.2" />
      <line x1="17" y1="22" x2="29" y2="22" stroke="#8896b3" strokeWidth="1.2" />
      <line x1="17" y1="27" x2="25" y2="27" stroke="#8896b3" strokeWidth="1.2" />
    </svg>
  );
}

export function PaintIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
      <path
        d="M20 5c8 0 14 6 14 13 0 5-3 8-7 8h-3a2 2 0 0 0-1.6 3.2l.6.8A2 2 0 0 1 21 33c-9 0-15-7-15-15C6 11 12 5 20 5z"
        fill="#f4f4f4"
        stroke="#8a8a8a"
        strokeWidth="1.2"
      />
      <circle cx="13" cy="17" r="2.2" fill="#ed1c24" />
      <circle cx="16" cy="12" r="2.2" fill="#22b14c" />
      <circle cx="23" cy="11" r="2.2" fill="#00a2e8" />
      <circle cx="28" cy="15" r="2.2" fill="#fff200" />
      <circle cx="14" cy="23" r="2.2" fill="#a349a4" />
    </svg>
  );
}

export function SolitaireIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
      <rect x="4" y="9" width="20" height="27" rx="2" fill="#fff" stroke="#7a7a7a" strokeWidth="1" transform="rotate(-8 14 22)" />
      <rect x="15" y="6" width="20" height="27" rx="2" fill="#fff" stroke="#7a7a7a" strokeWidth="1" />
      <text x="18" y="17" fontSize="9" fontWeight="700" fill="#e0121e">A</text>
      <text x="18" y="27" fontSize="10" fill="#e0121e">{"♥"}</text>
    </svg>
  );
}

export function ComputerIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
      <defs>
        <linearGradient id="pc-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e5eef8" />
          <stop offset="100%" stopColor="#b7c9de" />
        </linearGradient>
      </defs>
      <rect x="5" y="7" width="30" height="19" rx="1.5" fill="url(#pc-g)" stroke="#5c7291" strokeWidth="1.2" />
      <rect x="8" y="10" width="24" height="13" fill="#1a3d73" />
      <rect x="14" y="27" width="12" height="3" fill="#b7c9de" stroke="#5c7291" strokeWidth="1" />
      <rect x="10" y="30" width="20" height="2.5" rx="1" fill="#8fa4bc" />
    </svg>
  );
}

export function GitHubGlyph({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} fill="currentColor">
      <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.49c-2.22.48-2.69-1.07-2.69-1.07-.36-.93-.89-1.17-.89-1.17-.72-.5.06-.49.06-.49.8.06 1.22.83 1.22.83.71 1.21 1.87.86 2.33.66.07-.52.28-.86.5-1.06-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z" />
    </svg>
  );
}

export function LinkedInGlyph({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className}>
      <rect width="16" height="16" rx="2.5" fill="#0a66c2" />
      <path
        d="M3.6 6.4h1.8V12H3.6zM4.5 3.6a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM7 6.4h1.7v.77h.02c.24-.44.83-.9 1.7-.9 1.82 0 2.16 1.14 2.16 2.62V12h-1.8V9.26c0-.65-.01-1.5-.92-1.5-.93 0-1.07.7-1.07 1.44V12H7z"
        fill="#fff"
      />
    </svg>
  );
}

export function MailGlyph({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className}>
      <rect x="1" y="3.5" width="14" height="9" rx="1.5" fill="#3f9a54" />
      <path d="M2 4.5l6 4.5 6-4.5" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CommandPromptIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
      <rect x="4" y="6" width="32" height="28" rx="2" fill="#1a1a1a" stroke="#7a7a7a" strokeWidth="1" />
      <path d="M9 14l6 5-6 5" stroke="#e5e5e5" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="17" y1="24" x2="27" y2="24" stroke="#e5e5e5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function DisplayIcon({ size = 40, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
      <defs>
        <linearGradient id="disp-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f6a6c1" />
          <stop offset="50%" stopColor="#8fd6e8" />
          <stop offset="100%" stopColor="#c9e88f" />
        </linearGradient>
      </defs>
      <rect x="5" y="7" width="30" height="19" rx="1.5" fill="url(#disp-g)" stroke="#5c7291" strokeWidth="1.2" />
      <rect x="14" y="27" width="12" height="3" fill="#b7c9de" stroke="#5c7291" strokeWidth="1" />
      <rect x="10" y="30" width="20" height="2.5" rx="1" fill="#8fa4bc" />
    </svg>
  );
}

export function StartOrb({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <defs>
        <linearGradient id="start-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8fd66a" />
          <stop offset="100%" stopColor="#2f8f3a" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="9" height="9" rx="2" fill="url(#start-g)" />
      <rect x="14" y="1" width="9" height="9" rx="2" fill="url(#start-g)" opacity="0.85" />
      <rect x="1" y="14" width="9" height="9" rx="2" fill="url(#start-g)" opacity="0.85" />
      <rect x="14" y="14" width="9" height="9" rx="2" fill="url(#start-g)" opacity="0.7" />
    </svg>
  );
}

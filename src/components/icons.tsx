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

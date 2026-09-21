// A "live" version of UserIcon with a slow, subtle eye-blink loop (pure CSS
// keyframes on two eye shapes -- see .xp-avatar-eye in globals.css). Used
// only on the login screen and Start Menu header, where the little bit of
// life actually gets noticed; the plain UserIcon stays static everywhere
// else so it doesn't compete for attention at icon size.
export function AnimatedAvatar({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <defs>
        <linearGradient id="avatar-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7fb8e6" />
          <stop offset="100%" stopColor="#2f6fa8" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="10" fill="url(#avatar-body)" />
      <circle cx="24" cy="19" r="8" fill="#fff" opacity="0.95" />
      <rect x="19.5" y="17" width="2.6" height="4" rx="1.3" fill="#2f6fa8" className="xp-avatar-eye" />
      <rect
        x="26"
        y="17"
        width="2.6"
        height="4"
        rx="1.3"
        fill="#2f6fa8"
        className="xp-avatar-eye xp-avatar-eye-delay"
      />
      <path d="M9 41c1-9 8-14 15-14s14 5 15 14" fill="#fff" opacity="0.95" />
    </svg>
  );
}

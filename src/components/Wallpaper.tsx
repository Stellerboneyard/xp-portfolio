// An original hill-and-sky wallpaper with the name carved into the grass,
// in the spirit of the classic XP desktop -- but hand-built SVG shapes and
// gradients, not a copy of any real photo or wallpaper asset.
export function Wallpaper() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f7de0" />
          <stop offset="45%" stopColor="#6fa3ea" />
          <stop offset="100%" stopColor="#cfe6ff" />
        </linearGradient>
        <linearGradient id="wp-hill-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8fcf6a" />
          <stop offset="100%" stopColor="#5fae44" />
        </linearGradient>
        <linearGradient id="wp-hill-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6fc24a" />
          <stop offset="100%" stopColor="#3f9c2c" />
        </linearGradient>
        <linearGradient id="wp-text" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dff5c8" />
          <stop offset="100%" stopColor="#8fd66a" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="1600" height="900" fill="url(#wp-sky)" />

      <g opacity="0.85">
        <ellipse cx="220" cy="130" rx="90" ry="26" fill="#ffffff" opacity="0.8" />
        <ellipse cx="290" cy="115" rx="60" ry="20" fill="#ffffff" opacity="0.7" />
        <ellipse cx="1300" cy="90" rx="110" ry="28" fill="#ffffff" opacity="0.75" />
        <ellipse cx="1220" cy="105" rx="60" ry="18" fill="#ffffff" opacity="0.6" />
      </g>

      <path d="M0,560 C300,470 500,640 820,560 C1100,490 1350,600 1600,520 L1600,900 L0,900 Z" fill="url(#wp-hill-back)" />
      <path
        d="M0,660 C260,600 480,700 760,650 C1040,600 1280,700 1600,640 L1600,900 L0,900 Z"
        fill="url(#wp-hill-front)"
      />

      <g transform="translate(180 740) rotate(-6)">
        <text
          x="0"
          y="0"
          fontFamily="Arial Black, Arial, sans-serif"
          fontWeight="900"
          fontSize="150"
          fill="#2c7a1e"
          opacity="0.55"
          transform="translate(6 8)"
        >
          ARYAN RAJ
        </text>
        <text x="0" y="0" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="150" fill="url(#wp-text)">
          ARYAN RAJ
        </text>
      </g>
    </svg>
  );
}

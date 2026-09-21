const DRIVES = [
  { name: "Local Disk (C:)", used: "41.2 GB", free: "18.8 GB", pct: 69 },
  { name: "Projects (D:)", used: "6.4 GB", free: "23.6 GB", pct: 21 },
  { name: "CD Drive (E:)", used: null, free: null, pct: 0 },
];

export function MyComputerApp() {
  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto p-4 text-[13px] text-neutral-800">
      <p className="text-neutral-600">Hard Disk Drives</p>
      <div className="space-y-2">
        {DRIVES.map((d) => (
          <div key={d.name} className="xp-panel flex items-center gap-3 p-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#dce6f2] text-lg">
              {"\u{1F4BF}"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-blue-900">{d.name}</p>
              {d.used ? (
                <>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded bg-neutral-200">
                    <div className="h-full bg-blue-500" style={{ width: `${d.pct}%` }} />
                  </div>
                  <p className="mt-0.5 text-[11px] text-neutral-500">
                    {d.used} used, {d.free} free
                  </p>
                </>
              ) : (
                <p className="text-[11px] text-neutral-400">No disc</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-neutral-400">
        (Cosmetic -- like everything else here it&apos;s telling you the truth: it&apos;s dressing, not a real filesystem.)
      </p>
    </div>
  );
}

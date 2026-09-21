import { ExplorerChrome } from "@/components/ExplorerChrome";
import { RecycleBinIcon } from "@/components/icons";

export function RecycleBinApp() {
  return (
    <ExplorerChrome
      appId="recycle-bin"
      addressIcon={<RecycleBinIcon size={14} />}
      addressLabel="Recycle Bin"
      statusText="0 objects"
    >
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center text-[13px] text-neutral-600">
        <RecycleBinIcon size={64} />
        <p className="font-bold text-neutral-500">This folder is empty.</p>
        <p className="max-w-[26ch] text-neutral-500">
          Nothing gets quietly deleted here -- mistakes get fixed in the open, not hidden in a bin.
        </p>
      </div>
    </ExplorerChrome>
  );
}

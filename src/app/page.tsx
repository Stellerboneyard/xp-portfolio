"use client";

import { useState } from "react";
import { BootScreen } from "@/components/BootScreen";
import { LoginScreen } from "@/components/LoginScreen";
import { Desktop } from "@/components/Desktop";
import { ShutdownScreen } from "@/components/ShutdownScreen";
import { WindowManagerProvider } from "@/lib/windowManager";

type Screen = "boot" | "login" | "desktop" | "shutdown";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("boot");
  // Bumped every time we return to the login screen so the desktop's window
  // state (open/minimized/positions) resets on the next session, same as a
  // real log off.
  const [sessionKey, setSessionKey] = useState(0);

  return (
    <div className="fixed inset-0 h-[100dvh] w-full overflow-hidden text-[13px]">
      {screen === "boot" && <BootScreen onDone={() => setScreen("login")} />}
      {screen === "login" && (
        <LoginScreen
          onLogin={() => {
            setSessionKey((k) => k + 1);
            setScreen("desktop");
          }}
        />
      )}
      {screen === "desktop" && (
        <WindowManagerProvider key={sessionKey}>
          <Desktop onLogOff={() => setScreen("login")} onShutDown={() => setScreen("shutdown")} />
        </WindowManagerProvider>
      )}
      {screen === "shutdown" && <ShutdownScreen onRestart={() => setScreen("boot")} />}
    </div>
  );
}

import type { ReactNode } from "react";
import "../tokens/index.css";

type Accent = "cyan" | "violet" | "magenta" | "emerald" | "amber";
type Radius = "none" | "small" | "medium" | "large";

export interface AuroraProviderProps {
  children: ReactNode;
  mode?: "dark" | "light";
  accent?: Accent;
  radius?: Radius;
  glow?: boolean;
  scaling?: number;
  className?: string;
}

export function AuroraProvider({
  children,
  mode = "dark",
  accent = "cyan",
  radius = "medium",
  glow = true,
  scaling = 1,
  className,
}: AuroraProviderProps) {
  return (
    <div
      data-aurora-theme={mode}
      data-aurora-accent={accent}
      data-aurora-radius={radius}
      data-aurora-glow={glow || undefined}
      className={className}
      style={scaling !== 1 ? { fontSize: `${scaling}rem` } : undefined}
    >
      {children}
    </div>
  );
}

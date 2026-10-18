import { MeshDriftBackground } from "@/components/mesh-drift-background";

export function Atmosphere({ children }: { children: React.ReactNode }) {
  return (
    <div className="project-background unified-atmosphere">
      <MeshDriftBackground />
      {children}
    </div>
  );
}

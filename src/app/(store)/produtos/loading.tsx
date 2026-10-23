import { BrandLoader } from "@/components/brand-loader";

export default function Loading() {
  // Keep the streaming fallback within the dynamic catalog routes.
  return (
    <div
      className="route-brand-loading"
      role="status"
      aria-label="Carregando conteúdo"
    >
      <BrandLoader />
    </div>
  );
}

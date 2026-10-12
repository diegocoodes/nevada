import { BrandLoader } from "@/components/brand-loader";

export default function Loading() {
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

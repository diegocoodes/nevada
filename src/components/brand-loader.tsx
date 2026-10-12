import Image from "next/image";

export function BrandLoader({
  logo = "/images/nevada-logo-2026.png",
}: {
  logo?: string;
}) {
  return (
    <div className="brand-loader">
      <div className="brand-loader-glow" aria-hidden="true" />
      <Image
        className="brand-loader-logo"
        src={logo}
        alt="Nevada Protection Films"
        width={982}
        height={182}
        sizes="(max-width: 600px) 72vw, 380px"
        loading="eager"
      />
      <div className="brand-loader-track" aria-hidden="true">
        <span />
      </div>
      <p>PROTEÇÃO EM SUA MELHOR FORMA.</p>
    </div>
  );
}

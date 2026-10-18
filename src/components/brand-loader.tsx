import Image from "next/image";

export function BrandLoader({
  logo = "/images/retem-logo.svg",
  name = "Retém Estética Premium",
}: {
  logo?: string;
  name?: string;
}) {
  return (
    <div className="brand-loader">
      <div className="brand-loader-glow" aria-hidden="true" />
      <Image
        className="brand-loader-logo"
        src={logo}
        alt={name}
        width={1000}
        height={logo.endsWith("retem-re.svg") ? 440 : 260}
        sizes="(max-width: 600px) 72vw, 380px"
        loading="eager"
      />
      <div className="brand-loader-track" aria-hidden="true">
        <span />
      </div>
      <p>CUIDADO EM CADA DETALHE.</p>
    </div>
  );
}

const text = "RETÉM · CUIDADO EM CADA DETALHE";

export function BrandMarquee() {
  return (
    <div className="brand-marquee">
      <span className="sr-only">{text}</span>
      <div className="brand-marquee-track" aria-hidden="true">
        {[0, 1].map((group) => (
          <div className="brand-marquee-group" key={group}>
            {[0, 1, 2].map((copy) => (
              <span className="brand-marquee-item" key={copy}>
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

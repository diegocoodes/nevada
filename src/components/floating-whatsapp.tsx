import { contactUrl } from "@/lib/utils";

export function FloatingWhatsApp({ whatsapp }: { whatsapp: string }) {
  return (
    <a
      className="floating-whatsapp"
      href={contactUrl(whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a RETÉM pelo WhatsApp"
    >
      <span className="floating-whatsapp-label" aria-hidden="true">
        Fale com a RETÉM
      </span>
      <svg
        viewBox="0 0 32 32"
        width="31"
        height="31"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M26.8 15.6a10.8 10.8 0 0 1-16 9.5l-6.3 1.7 1.7-6.1a10.8 10.8 0 1 1 20.6-5.1Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m11.6 9.7 1.8 3.5-1.3 1.4c1.1 2.2 2.8 3.9 5 5l1.4-1.4 3.6 1.8c.2 1.6-1 3-2.5 3-5.9-.4-10.7-5.2-11-11.1 0-1.5 1.4-2.7 3-2.2Z"
          fill="currentColor"
          transform="translate(1 -1) scale(.9)"
        />
      </svg>
    </a>
  );
}

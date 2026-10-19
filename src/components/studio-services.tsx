"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { services, serviceCaptions } from "@/data/services";

export function StudioServices() {
  const id = useId();
  const [selected, setSelected] = useState(services[0]);
  return (
    <div className="atelier-services-grid">
      <div
        className="atelier-service-list"
        role="group"
        aria-label="Serviços Retém"
      >
        {services.map((service) => (
          <div
            key={service.id}
            className="atelier-service-option"
            data-selected={selected.id === service.id}
          >
            <h3>
              <button
                type="button"
                aria-pressed={selected.id === service.id}
                aria-controls={`${id}-panel`}
                onClick={() => setSelected(service)}
              >
                <span>{service.name}</span>
                <Plus size={18} aria-hidden="true" />
              </button>
            </h3>
          </div>
        ))}
        <p className="atelier-service-note">
          Cada projeto começa com uma conversa.
          <br />
          Encontre a solução que faz sentido para você.
        </p>
      </div>
      <div
        id={`${id}-panel`}
        className="atelier-service-panel"
        role="region"
        aria-label={selected.name}
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="atelier-service-image lines-preview">
          <Image
            key={selected.id}
            src={selected.image}
            alt={selected.name}
            fill
            sizes="(max-width: 760px) 100vw, 55vw"
          />
        </div>
        <div className="atelier-service-content">
          <p className="atelier-kicker">{serviceCaptions[selected.slug]}</p>
          <p>{selected.description}</p>
          <Link
            className="atelier-link"
            href={`/contato?servico=${encodeURIComponent(selected.name)}`}
            aria-label={`Consultar ${selected.name}`}
          >
            Solicitar orçamento <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

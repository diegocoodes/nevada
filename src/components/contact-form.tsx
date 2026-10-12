"use client";

import type { FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { contactUrl } from "@/lib/utils";

export function ContactForm({
  whatsapp,
  includeProject = true,
}: {
  whatsapp: string;
  includeProject?: boolean;
}) {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    if (name.length < 2) {
      nameInput.setCustomValidity("Informe seu nome.");
      nameInput.reportValidity();
      return;
    }
    const email = String(data.get("email") || "").trim();
    const project = String(data.get("project") || "").trim();
    const message = [
      "Olá, Nevada! Gostaria de conversar sobre meu projeto.",
      "",
      `Nome: ${name}`,
      `E-mail: ${email}`,
      ...(project ? ["", `Projeto: ${project}`] : []),
    ].join("\n");
    const url = new URL(contactUrl(whatsapp), window.location.origin);
    url.searchParams.set("text", message);
    window.location.assign(url.toString());
  };

  return (
    <form className="contact-form" onSubmit={submit}>
      <label htmlFor="contact-name">
        Seu nome <span aria-hidden="true">*</span>
      </label>
      <input
        id="contact-name"
        name="name"
        autoComplete="name"
        placeholder="Como podemos chamar você?"
        required
        minLength={2}
        maxLength={100}
        onInput={(event) => event.currentTarget.setCustomValidity("")}
      />
      <label htmlFor="contact-email">
        Seu e-mail <span aria-hidden="true">*</span>
      </label>
      <input
        id="contact-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="voce@empresa.com.br"
        required
        maxLength={254}
      />
      {includeProject && (
        <>
          <label htmlFor="contact-project">
            Sobre seu projeto{" "}
            <span className="contact-optional">(opcional)</span>
          </label>
          <textarea
            id="contact-project"
            name="project"
            placeholder="O que você quer proteger ou transformar?"
            rows={2}
            maxLength={1500}
          />
        </>
      )}
      <button type="submit">
        Vamos conversar <ArrowUpRight size={19} aria-hidden="true" />
      </button>
    </form>
  );
}

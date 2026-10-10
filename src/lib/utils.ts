import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function money(cents: number | null) {
  return cents === null
    ? "Sob consulta"
    : new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(cents / 100);
}
export function contactUrl(phone: string) {
  return /^\d{10,15}$/.test(phone) ? `https://wa.me/${phone}` : "/contato";
}

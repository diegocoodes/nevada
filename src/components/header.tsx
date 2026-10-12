"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search, ShoppingBag, ArrowUpRight } from "lucide-react";
import { useCart } from "@/stores/cart";
import { useHydrated } from "@/hooks/use-hydrated";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
const links = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/sobre", label: "Sobre nós" },
  { href: "/contato", label: "Contato" },
];
export function Brand({
  logo = "/images/nevada-logo-2026.png",
  name = "Nevada",
}: {
  logo?: string;
  name?: string;
}) {
  return (
    <Link href="/" className="brand" aria-label={`${name}, início`}>
      <Image
        className="brand-logo"
        src={logo || "/images/nevada-logo-2026.png"}
        alt={name}
        width={982}
        height={182}
        sizes="(max-width: 600px) 150px, 190px"
      />
    </Link>
  );
}
export function Header({ logo, name }: { logo: string; name: string }) {
  const home = usePathname() === "/";
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const cart = useCart();
  const hydrated = useHydrated();
  const count = hydrated ? cart.items.reduce((s, i) => s + i.quantity, 0) : 0;
  return (
    <>
      <div className={`announcement ${home ? "announcement-home" : ""}`}>
        A proteção certa começa com a escolha certa.{" "}
        <Link href="/produtos">
          Conheça a linha Nevada <ArrowUpRight size={12} />
        </Link>
      </div>
      <header
        className={`header ${home ? "header-home" : ""} ${scrolled ? "header-scrolled" : ""}`}
      >
        <div className="container header-inner">
          <Brand logo={logo} name={name} />
          <nav className="desktop-nav" aria-label="Navegação principal">
            {links.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              aria-label="Pesquisar produtos"
              onClick={() => setSearch(true)}
            >
              <Search size={21} />
            </button>
            <button
              className="cart-trigger"
              aria-label={`Abrir carrinho, ${count} itens`}
              onClick={() => cart.setOpen(true)}
            >
              <ShoppingBag size={20} />
              <span className="cart-label">Carrinho</span>
              <span className="cart-count" key={count}>
                {count}
              </span>
            </button>
            <button
              className="icon-button mobile-toggle"
              aria-label="Abrir menu"
              onClick={() => setMobile(true)}
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>
      <Dialog open={mobile} onOpenChange={setMobile}>
        <DialogContent className="store-dialog mobile-menu">
          <DialogTitle className="h3">Explore Nevada</DialogTitle>
          <DialogDescription className="sr-only">
            Navegação principal
          </DialogDescription>
          <nav>
            {links.map((l) => (
              <Link onClick={() => setMobile(false)} key={l.href} href={l.href}>
                {l.label}
                <ArrowUpRight size={20} />
              </Link>
            ))}
          </nav>
        </DialogContent>
      </Dialog>
      <Dialog open={search} onOpenChange={setSearch}>
        <DialogContent className="store-dialog">
          <DialogTitle className="h3">O que você procura?</DialogTitle>
          <DialogDescription className="muted">
            Pesquise por produto ou linha.
          </DialogDescription>
          <form
            action="/produtos"
            className="search-form"
            onSubmit={() => setSearch(false)}
          >
            <label className="sr-only" htmlFor="header-search">
              Pesquisar produto
            </label>
            <input
              id="header-search"
              name="q"
              placeholder="PPF, películas, produtos de aplicação..."
              maxLength={120}
              autoFocus
            />
            <Button type="submit" size="icon" aria-label="Pesquisar">
              <Search size={20} />
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

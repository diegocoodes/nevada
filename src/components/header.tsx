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
import { isDistributorPath } from "@/lib/brand";
const links = [
  { href: "/", label: "Início" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre nós" },
  { href: "/contato", label: "Contato" },
  { href: "/distribuidora", label: "Loja Distribuidora" },
];
export function Brand({
  logo = "/images/retem-logo.svg",
  name = "Retém Estética Premium",
  adaptive = true,
  dark = false,
}: {
  logo?: string;
  name?: string;
  adaptive?: boolean;
  dark?: boolean;
}) {
  const pathname = usePathname();
  const distributor = adaptive && isDistributorPath(pathname);
  return (
    <Link
      href={distributor ? "/distribuidora" : "/"}
      className={`brand ${distributor ? "brand-distributor" : ""}`}
      aria-label={
        distributor ? "Retém Loja Distribuidora, início" : `${name}, início`
      }
    >
      <Image
        className="brand-logo"
        src={
          distributor
            ? "/images/retem-re.svg"
            : dark
              ? "/images/retem-logo-dark.svg"
              : logo || "/images/retem-logo.svg"
        }
        alt={distributor ? "RE — Retém Loja Distribuidora" : name}
        width={distributor ? 820 : 1000}
        height={distributor ? 360 : 260}
        sizes="(max-width: 600px) 150px, 190px"
      />
      <span className="brand-descriptor">
        {distributor ? "LOJA DISTRIBUIDORA" : "ESTÉTICA PREMIUM"}
      </span>
    </Link>
  );
}
export function Header({ logo, name }: { logo: string; name: string }) {
  const pathname = usePathname();
  const home = pathname === "/";
  const distributor = isDistributorPath(pathname);
  const navigation = distributor
    ? [
        { href: "/", label: "Estética Premium" },
        { href: "/distribuidora", label: "Distribuidora" },
        { href: "/produtos", label: "Produtos" },
        { href: "/contato", label: "Contato" },
      ]
    : links;
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
        {distributor
          ? "RETÉM LOJA DISTRIBUIDORA · NEVADA FILMS E ORIGIN PELÍCULAS"
          : "RETÉM · PPF, PELÍCULAS E CUIDADO AUTOMOTIVO"}{" "}
        <Link href={distributor ? "/" : "/distribuidora"}>
          {distributor ? "Conheça a estética" : "Conheça a distribuidora"}{" "}
          <ArrowUpRight size={12} />
        </Link>
      </div>
      <header
        className={`header ${home ? "header-home" : ""} ${scrolled ? "header-scrolled" : ""}`}
      >
        <div className="container header-inner">
          <Brand logo={logo} name={name} />
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navigation.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className={
                  l.href === "/distribuidora" ? "nav-distributor" : undefined
                }
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            {distributor ? (
              <>
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
              </>
            ) : (
              <Link href="/contato" className="header-appointment">
                Fale com a Retém <ArrowUpRight size={17} />
              </Link>
            )}
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
          <DialogTitle className="h3">Explore a Retém</DialogTitle>
          <DialogDescription className="sr-only">
            Navegação principal
          </DialogDescription>
          <nav>
            {navigation.map((l) => (
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

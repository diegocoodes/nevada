"use client";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Product, Category } from "@/types/store";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
export function Catalog({
  products,
  categories,
  initialQuery,
  initialCategory,
  initialBrand = "",
  contactHref,
}: {
  products: Product[];
  categories: Category[];
  initialQuery: string;
  initialCategory: string;
  initialBrand?: string;
  contactHref: string;
}) {
  const [q, setQ] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState(initialBrand);
  const [sort, setSort] = useState("recent");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [attribute, setAttribute] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(false);
  const options = [
    ...new Set(
      products.flatMap((p) =>
        p.variants.flatMap((v) =>
          Object.entries(v.attributes).map(([k, val]) => `${k}: ${val}`),
        ),
      ),
    ),
  ].sort();
  const filtered = useMemo(() => {
    const price = (p: Product) =>
      Math.min(
        ...p.variants.flatMap((v) =>
          v.priceCents === null ? [] : [v.priceCents],
        ),
      );
    const rows = products.filter(
      (p) =>
        p.name
          .toLocaleLowerCase("pt-BR")
          .includes(q.toLocaleLowerCase("pt-BR")) &&
        (!category || p.category.slug === category) &&
        (!brand || (p.brand ?? "nevada") === brand) &&
        p.variants.some(
          (v) =>
            ((!min && !max) ||
              (v.priceCents !== null &&
                (!min || v.priceCents >= Number(min) * 100) &&
                (!max || v.priceCents <= Number(max) * 100))) &&
            (!attribute ||
              Object.entries(v.attributes).some(
                ([k, val]) => `${k}: ${val}` === attribute,
              )),
        ),
    );
    return sort === "name"
      ? rows.sort((a, b) => a.name.localeCompare(b.name))
      : sort === "low"
        ? rows.sort((a, b) => price(a) - price(b))
        : sort === "high"
          ? rows.sort((a, b) => price(b) - price(a))
          : rows;
  }, [products, q, category, brand, sort, min, max, attribute]);
  const change = (fn: () => void) => {
    fn();
    setPage(1);
  };
  const reset = () =>
    change(() => {
      setQ("");
      setCategory("");
      setBrand("");
      setMin("");
      setMax("");
      setAttribute("");
      setSort("recent");
    });
  return (
    <div className="catalog">
      <aside className={`filters ${filters ? "filters-open" : ""}`}>
        <h2 className="h3">Encontre sua solução</h2>
        <label>
          Pesquisar
          <div className="input-icon">
            <Search size={18} />
            <input
              value={q}
              onChange={(e) => change(() => setQ(e.target.value))}
              placeholder="Nome do produto"
            />
          </div>
        </label>
        <fieldset>
          <legend>Marcas distribuídas</legend>
          {[
            { value: "", label: "Todas as marcas" },
            { value: "nevada", label: "Nevada Films" },
            { value: "origin", label: "Origin Películas" },
          ].map((item) => (
            <label className="radio-label" key={item.value}>
              <input
                type="radio"
                name="brand"
                checked={brand === item.value}
                onChange={() => change(() => setBrand(item.value))}
              />
              {item.label}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>Linhas de produtos</legend>
          <label className="radio-label">
            <input
              type="radio"
              name="category"
              checked={!category}
              onChange={() => change(() => setCategory(""))}
            />
            Todas as linhas
          </label>
          {categories.map((c) => (
            <label className="radio-label" key={c.id}>
              <input
                type="radio"
                name="category"
                checked={category === c.slug}
                onChange={() => change(() => setCategory(c.slug))}
              />
              {c.name}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>Preço em R$</legend>
          <div className="price-inputs">
            <label>
              <span className="sr-only">Preço mínimo</span>
              <input
                type="number"
                min="0"
                value={min}
                onChange={(e) => change(() => setMin(e.target.value))}
                placeholder="De"
              />
            </label>
            <label>
              <span className="sr-only">Preço máximo</span>
              <input
                type="number"
                min="0"
                value={max}
                onChange={(e) => change(() => setMax(e.target.value))}
                placeholder="Até"
              />
            </label>
          </div>
        </fieldset>
        <label>
          Características
          <select
            value={attribute}
            onChange={(e) => change(() => setAttribute(e.target.value))}
          >
            <option value="">Todas as variações</option>
            {options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <button className="text-button" onClick={reset}>
          Limpar filtros
        </button>
      </aside>
      <div>
        <div className="catalog-toolbar">
          <span className="muted" aria-live="polite">
            {filtered.length} produtos encontrados
          </span>
          <button
            className="filter-toggle button button-outline"
            onClick={() => setFilters(!filters)}
            aria-expanded={filters}
          >
            <SlidersHorizontal size={16} />
            Filtros
          </button>
          <label className="sort-label">
            <span className="sr-only">Ordenar produtos</span>
            <select
              value={sort}
              onChange={(e) => change(() => setSort(e.target.value))}
            >
              <option value="recent">Mais recentes</option>
              <option value="name">Nome de A a Z</option>
              <option value="low">Menor preço</option>
              <option value="high">Maior preço</option>
            </select>
          </label>
        </div>
        <Reveal
          stagger
          className="product-grid catalog-grid"
          key={`${page}:${q}:${brand}:${category}:${sort}:${min}:${max}:${attribute}`}
        >
          {filtered.slice((page - 1) * 9, page * 9).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Reveal>
        {!filtered.length && (
          <div className="empty">
            <Search size={36} />
            <h2>
              {brand === "origin"
                ? "Conheça a linha Origin Películas."
                : "Nenhum produto encontrado."}
            </h2>
            <p className="muted">
              {brand === "origin"
                ? "Fale com a Retém para conhecer as opções, medidas e disponibilidade da Origin Películas."
                : "Tente outro nome ou ajuste os filtros."}
            </p>
            {brand === "origin" && (
              <Button asChild>
                <Link href={contactHref}>Consultar Origin Películas</Link>
              </Button>
            )}
            <Button variant="outline" onClick={reset}>
              Limpar filtros
            </Button>
          </div>
        )}
        {filtered.length > 9 && (
          <nav className="pagination" aria-label="Páginas do catálogo">
            {Array.from({ length: Math.ceil(filtered.length / 9) }, (_, n) => (
              <button
                key={n}
                aria-current={page === n + 1 ? "page" : undefined}
                onClick={() => setPage(n + 1)}
              >
                {n + 1}
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}

import Link from "next/link";
export default function NotFound() {
  return (
    <main className="container section empty">
      <p className="eyebrow">PÁGINA NÃO ENCONTRADA</p>
      <h1>Vamos voltar ao caminho certo.</h1>
      <Link href="/produtos" className="button button-primary">
        Explorar catálogo
      </Link>
    </main>
  );
}

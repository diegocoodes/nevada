import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/types/store";
export function CategoryCard({ category: c }: { category: Category }) {
  return (
    <Link className="category-card" href={`/produtos?categoria=${c.slug}`}>
      <Image
        src={c.image}
        alt={c.name}
        fill
        sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
      />
      <div>
        <span className="small">{c.description}</span>
        <h3>
          {c.name}
          <ArrowUpRight size={24} />
        </h3>
      </div>
    </Link>
  );
}

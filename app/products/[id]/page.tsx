// app/products/[id]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import ProductCard from "../../components/ProductCard";
import Stars from "../../components/Stars";
import { getProduct, products, relatedProducts } from "../../data/products";

// Lazy-load the heavy Reviews section on demand
const Reviews = dynamic(() => import("./Reviews"), {
  loading: () => (
    <div className="reviews-loading">
      <p>Loading reviews…</p>
    </div>
  ),
});

// Pre-build one static page per product at build time.
export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

// Dynamic per-page metadata based on the current product route
export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const product = getProduct(params.id);
  if (!product) return { title: "Product not found | ShipYard" };
  return {
    title: `${product.name} | ShipYard`,
    description: product.tagline,
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);

  // If the id in the URL does not match a product, show the 404 page.
  if (!product) {
    notFound();
  }

  const related = relatedProducts(product);

  return (
    <main className="container">
      <nav className="crumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href={`/#${product.category}`}>{product.category}</Link>
        <span>/</span>
        <span className="crumbs-here">{product.name}</span>
      </nav>

      <article className="detail">
        <div className="detail-art">
          {product.badge && <span className="card-badge">{product.badge}</span>}
          <Image
            src={product.image}
            alt={product.name}
            width={460}
            height={345}
            className="detail-img"
            priority
          />
        </div>

        <div className="detail-body">
          <span className="card-category">{product.category}</span>
          <h1 className="detail-name">{product.name}</h1>
          <p className="detail-tagline">{product.tagline}</p>
          <Stars rating={product.rating} />
          <span className="detail-price">${product.price}</span>
          <p className="detail-desc">{product.description}</p>

          <h2 className="detail-specs-title">Specs</h2>
          <ul className="detail-specs">
            {product.specs.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>
        </div>
      </article>

      {/* Lazy-loaded customer reviews section */}
      <Reviews productId={product.id} />

      {related.length > 0 && (
        <section className="related">
          <div className="section-head">
            <h2 className="section-title">More in {product.category}</h2>
          </div>
          <div className="grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

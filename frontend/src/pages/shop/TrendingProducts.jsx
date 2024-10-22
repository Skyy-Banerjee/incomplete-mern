import { useState } from "react";
import ProductCard from "./ProductCard";
import products from "../../data/products.json";

function TrendingProducts() {
  const [visibleProducts, setVisibleProducts] = useState(8);

  function loadMoreProducts() {
    setVisibleProducts((prevCount) => prevCount + 4);
  }

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader mb-12">
        Discover the HOTTEST PICKS: Elevate Your Style With Our Curated
        Collection Of Trending Women's Fashion Products...
      </p>
      {/* PRODUCT CARD */}
      <div className="mt-12">
        <ProductCard products={products.slice(0, visibleProducts)} />
      </div>
      {/* Load more products btn */}
      <div className="product__btn">
        {visibleProducts < products.length && (
          <button onClick={loadMoreProducts} className="btn">
            Load More..
          </button>
        )}
      </div>
    </section>
  );
}

export default TrendingProducts;

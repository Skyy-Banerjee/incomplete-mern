import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../../data/products.json";
import ProductCard from "../shop/ProductCard";
function CategoryPage() {
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const filtered = products.filter(
      (product) => product.category === categoryName.toLowerCase()
    );
    setFilteredProducts(filtered);
  }, [categoryName]);
  //console.log(categoryName);

  //! to load it from the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">{categoryName}</h2>
        <p className="section__subheader">
          Browse a diverse range of categories, from chic dresses to versatile
          accessories. Be a fashion-icon today!
        </p>
      </section>
      {/* PRODUCTS CARD */}
      <div className="section__container">
        <ProductCard products={filteredProducts} />
      </div>
    </>
  );
}

export default CategoryPage;

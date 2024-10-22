import { useState } from "react";
// import productsData from "../../data/products.json";
import ProductCard from "./ProductCard";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

// Filters configuration
const filters = {
  categories: ["all", "accessories", "dress", "jewellery", "cosmetics"],
  colors: ["all", "black", "red", "golden", "blue", "silver", "beige", "green"],
  priceRanges: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "Above $200", min: 200, max: Infinity },
  ],
};

function ShopPage() {
  const [filterState, setFilterState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(8);

  const { category, color, priceRange } = filterState;
  const [minPrice, maxPrice] = priceRange.split("-").map(Number);

  const {
    data: { products = [], totalPages, totalProducts } = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: category !== "all" ? category : "",
    color: color !== "all" ? color : "",
    minPrice: isNaN(minPrice) ? "" : minPrice,
    maxPrice: isNaN(maxPrice) ? "" : maxPrice,
    page: currentPage,
    limit: ProductsPerPage,
  });

  function clearFilters() {
    setFilterState({
      category: "all",
      color: "all",
      priceRange: "",
    });
  }

  if (isLoading) {
    return <div>Loading... ⌛</div>;
  }

  if (error) {
    return <div>Error loading products.</div>;
  }

  const startProduct = (currentPage - 1) * ProductsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  //pagination fx
  function handlePageChange(pageNumb) {
    if (pageNumb > 0 && pageNumb <= totalPages) {
      setCurrentPage(pageNumb);
    }
  }

  return (
    <>
      {/* Shop Header Section */}
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Shop Page</h2>
        <p className="section__subheader">
          Discover the HOTTEST PICKS: Elevate Your Style With Our Curated
          Collection Of Trending Women's Fashion Products...
        </p>
      </section>

      {/* Shop Filtering and Product Display Section */}
      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          {/* Filtering Component */}
          <ShopFiltering
            filters={filters}
            filterState={filterState}
            setFilterState={setFilterState} // Fix: Use correct state setter function
            clearFilters={clearFilters}
          />

          {/* Product Display */}
          <div>
            <h3 className="text-xl font-medium mb-4">
              Showing {startProduct} to {endProduct} of {totalProducts} products
            </h3>
            <ProductCard products={products} />
            {/* Pagination Controls */}
            <div className="mt-6 flex justify-center">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2">
                Previous
              </button>
              {[...Array(totalPages)].map((_, idx) => {
                return (
                  <button
                    onClick={() => handlePageChange(idx + 1)}
                    key={idx}
                    className={`px-4 py-2 ${
                      currentPage === idx + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    } rounded-md mx-1`}>
                    {idx + 1}
                  </button>
                );
              })}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2">
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ShopPage;

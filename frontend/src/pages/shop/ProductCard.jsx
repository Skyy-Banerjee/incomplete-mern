import { Link } from "react-router-dom";
import RatingStars from "../../components/RatingStars";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

function ProductCard({ products }) {
  const dispatch = useDispatch();
  function handleAddToCart(product) {
    dispatch(addToCart(product));
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product, idx) => {
        return (
          <div key={idx} className="product__card">
            <div className="relative">
              <Link to={`/shop/${product._id}`}>
                <img
                  src={product.image}
                  alt="product-image"
                  className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300"
                />
              </Link>
              <div className="hover:block top-3 right-3 absolute">
                <button
                  onClick={(evt) => {
                    evt.stopPropagation();
                    handleAddToCart(product);
                  }}>
                  <i className="ri-shopping-cart-2-line bg-primary p-1.5 text-white hover:bg-primary-dark"></i>
                </button>
              </div>
            </div>
            {/* PRODUCT DESC. */}
            <div className="product__card__content">
              <h4>{product.name}</h4>
              <p>
                ${product.price} {/* Added the $ before product.price */}
                {product?.oldPrice ? <s>${product?.oldPrice}</s> : null}
              </p>
              <RatingStars rating={product.rating} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductCard;

import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/features/cart/cartSlice";

function OrderSummary() {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.cart.products);
  const { selectedItems, totalPrice, tax, grandTotal, taxRate } = useSelector(
    (store) => store.cart
  );
  function handleClearCart() {
    dispatch(clearCart());
  }
  return (
    <div className="bg-primary-light mt-5 rounded text-base">
      <div className="px-6 py-4 space-y-5">
        <h2 className="text-xl text-text-dark">
          ORDER SUMMARY <i className="ri-file-list-3-line"></i>
        </h2>
        <p className="text-text-dark mt-2">Selected Items: {selectedItems} </p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <p>
          Tax ({taxRate * 100}%): ${tax.toFixed(2)}
        </p>
        <h3 className="font-bold ">Grand_Total: ${grandTotal.toFixed(2)}</h3>
      </div>
      <div className="px-4 mb-6">
        <button className="bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4 hover:bg-red-400 hover:text-gray-800 transition-colors duration-250" 
        
        onClick={(evt) => {
          evt.stopPropagation();
          handleClearCart()
}}>
          <span className="mr-2">Clear Cart</span>
          <i className="ri-delete-bin-6-line"></i>
        </button>
        <button className="bg-green-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4 hover:bg-green-400 hover:text-gray-800 transition-colors duration-250">
          <span className="mr-2">Checkout</span>{" "}
          <i className="ri-refund-line"></i>
          <i className="ri-arrow-right-line"></i>
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;

import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1234/api/user/cart/get",
        { withCredentials: true }
      );
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.post(
        "http://localhost:1234/api/user/cart/remove/",
        { productId },
        { withCredentials: true }
      );

      // Update the state to remove the item from the frontend
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId._id !== productId)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-slate-800 text-center">
        Your Cart
      </h2>
      {cartItems.length === 0 ? (
        <p className="text-slate-600 text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => {
            const originalPrice = item.productId.price;
            const discountedPrice = (originalPrice * 0.85).toFixed(2); // 15% discount

            return (
              <div
                key={item.productId._id}
                className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-xl shadow-md transition-transform transform "
              >
                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="ml-4 flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-medium text-slate-900">
                    {item.productId.name}
                  </h3>
                  <p className="text-slate-600">
                    {item.productId.manufacturer}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start space-x-2 mt-1">
                    <p className="text-gray-500 line-through">
                      ₹{originalPrice}
                    </p>
                    <p className="text-green-600 font-semibold">
                      ₹{discountedPrice}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item.productId._id)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-200 mt-3 sm:mt-0"
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CartPage;

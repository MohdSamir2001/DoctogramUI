import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1234/api/user/cart/get",
        { withCredentials: true }
      );
      const validCartItems = response.data.filter((item) => item.productId);
      setCartItems(validCartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleDelete = async (cartId) => {
    try {
      await axios.post(
        "http://localhost:1234/api/user/cart/remove/",
        { cartId },
        { withCredentials: true }
      );
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== cartId)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleQuantityChange = async (cartId, action) => {
    try {
      const response = await axios.put(
        "http://localhost:1234/api/user/cart/update",
        { cartId, action },
        { withCredentials: true }
      );

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === cartId
            ? {
                ...item,
                quantity: response.data.cartItem.quantity,
                productId: {
                  ...item.productId,
                  quantityInStore:
                    response.data.cartItem.productId.quantityInStore,
                },
              }
            : item
        )
      );

      if (response.data.warning) {
        alert(response.data.warning);
      }
    } catch (error) {
      console.error("Error updating quantity:", error.response?.data?.message);
      alert(error.response?.data?.message || "Failed to update quantity");
    }
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const discountedPrice = item.productId.price * 0.85;
    return total + discountedPrice * item.quantity;
  }, 0);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Cart Items */}
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => {
              if (!item.productId) return null;

              const originalPrice = item.productId.price;
              const discountedPrice = (originalPrice * 0.85).toFixed(2);
              const remainingStock =
                item.productId.quantityInStore - item.quantity;

              return (
                <div
                  key={item._id}
                  className="flex items-center bg-white p-4 rounded-lg shadow-sm"
                >
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    className="w-28 h-28 object-cover rounded-lg"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.productId.name}
                    </h3>
                    <p className="text-gray-600">
                      {item.productId.manufacturer}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-gray-500 line-through">
                        Rs {originalPrice}
                      </p>
                      <p className="text-green-600 font-semibold">
                        Rs {discountedPrice}
                      </p>
                    </div>

                    {/* Stock Status & Warnings */}
                    {remainingStock <= 0 ? (
                      <p className="text-red-500 font-semibold">
                        Please wait for this medicine, currently out of stock.
                      </p>
                    ) : remainingStock < 3 ? (
                      <p className="text-yellow-500 font-semibold">
                        Hurry! Only {remainingStock} left in stock.
                      </p>
                    ) : (
                      <p className="text-green-600">In Stock</p>
                    )}

                    {/* Quantity Controls */}
                    <div className="flex items-center mt-2">
                      <button
                        className="bg-gray-300 px-3 py-1 rounded-l-lg disabled:opacity-50"
                        onClick={() =>
                          handleQuantityChange(item._id, "decrease")
                        }
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <p className="px-4 py-1 border">{item.quantity}</p>
                      <button
                        className="bg-gray-300 px-3 py-1 rounded-r-lg disabled:opacity-50"
                        onClick={() =>
                          handleQuantityChange(item._id, "increase")
                        }
                        disabled={remainingStock <= 0}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right: Order Summary */}
          <div className="md:w-1/3">
            <div className="bg-white p-4 rounded-lg shadow-md sticky top-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Order Summary
              </h3>

              {cartItems.map((item) => {
                if (!item.productId) return null;

                const discountedPrice = (item.productId.price * 0.85).toFixed(
                  2
                );
                const totalItemPrice = (
                  discountedPrice * item.quantity
                ).toFixed(2);
                return (
                  <div key={item._id} className="border-b py-2">
                    <p className="font-medium text-gray-800">
                      {item.productId.name}
                    </p>
                    <div className="flex justify-between text-gray-600 text-sm">
                      <p>
                        Rs {discountedPrice} x {item.quantity}
                      </p>
                      <p className="font-semibold">Rs {totalItemPrice}</p>
                    </div>
                  </div>
                );
              })}

              <hr className="my-2" />
              <div className="flex justify-between font-semibold text-gray-800">
                <p>Total</p>
                <p>Rs {totalPrice.toFixed(2)}</p>
              </div>

              {/* Proceed to Checkout Button */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate("/order-page")}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const OrderPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1234/api/user/cart/get",
        {
          withCredentials: true,
        }
      );
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    await axios.post(
      "http://localhost:1234/api/user/cart/create-order",
      {
        medicines: cartItems.map((item) => ({
          medicineId: item.productId._id,
          quantity: item.quantity,
        })),
        totalPrice: cartItems.reduce(
          (total, item) => total + item.productId.price * item.quantity * 0.85,
          0
        ),
      },
      { withCredentials: true }
    );
    navigate("/order-confirmation");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Review Your Order
      </h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-md">
          {cartItems.map((item) => (
            <div key={item.productId._id} className="border-b py-2">
              <p className="font-medium text-gray-800">{item.productId.name}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-gray-800 font-semibold">
                Rs {item.productId.price * item.quantity}
              </p>
            </div>
          ))}
          <hr className="my-2" />
          <div className="flex justify-between font-semibold text-gray-800">
            <p>Total</p>
            <p>Rs {totalPrice.toFixed(2)}</p>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderPage;

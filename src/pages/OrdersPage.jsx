import axios from "axios";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1234/api/user/cart/get-orders",
        {
          withCredentials: true,
        }
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders placed yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">
                Order ID: {order._id}
              </h3>
              <p className="text-gray-600">Status: {order.status}</p>
              <ul className="mt-2 text-gray-700">
                {order.medicines.map((item) => (
                  <li key={item.medicineId._id} className="border-b py-1">
                    {item.medicineId.name} - {item.quantity} pcs
                  </li>
                ))}
              </ul>
              <p className="font-semibold mt-2">Total: Rs {order.totalPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

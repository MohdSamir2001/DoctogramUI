import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router";

const Pharmacy = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState({});
  const navigate = useNavigate();

  const quantity = 1;

  // Fetch user's cart items
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1234/api/user/cart/get`,
        { withCredentials: true }
      );
      const cartItems = response.data;
      const cartMap = {};
      cartItems.forEach((item) => {
        cartMap[item?.productId?._id] = true;
      });
      setAddedToCart(cartMap);
    } catch (error) {
      console.error("Error fetching cart items", error);
    }
  };

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1234/api/user/all-medicines",
          { withCredentials: true }
        );
        setMedicines(response?.data?.medicines);
      } catch (error) {
        toast.error("Failed to fetch medicines");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
    fetchCartItems(); // Fetch cart data on mount
  }, []);

  const handleAddToCart = async (productId, quantityInStore) => {
    if (quantityInStore === 0) {
      toast.warning(
        "This item is currently out of stock, we will restock it soon."
      );
      return;
    }

    try {
      await axios.post(
        "http://localhost:1234/api/user/cart/add",
        { productId, quantity },
        { withCredentials: true }
      );
      toast.success("Medicine added to cart");
      setAddedToCart((prev) => ({ ...prev, [productId]: true }));
    } catch (err) {
      toast.error("Failed to add medicine to cart");
    }
  };

  if (loading) {
    return <p className="text-center text-lg animate-pulse">Loading...</p>;
  }

  if (medicines.length === 0) {
    return (
      <p className="text-center text-lg text-red-500">No medicines found</p>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Pharmacy
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {medicines.map((med) => {
          const discount = 15;
          const discountedPrice = (med.price * (1 - discount / 100)).toFixed(2);

          return (
            <div
              key={med._id}
              className="border rounded-xl p-4 shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={med.image}
                  alt={med.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-md">
                  {discount}% OFF
                </span>
              </div>
              <h3 className="text-lg font-semibold mt-2 text-gray-800">
                {med.name}
              </h3>
              <p className="text-sm text-gray-500">By {med.manufacturer}</p>
              <p className="text-sm font-semibold mt-1">
                {med.noOfTablets} Tablet(s) in Strip
              </p>
              <div className="flex items-center mt-2 space-x-2">
                <p className="text-gray-500 line-through text-sm">
                  ₹{med.price}
                </p>
                <p className="text-lg font-bold text-green-600">
                  ₹{discountedPrice}
                </p>
              </div>
              <p className="text-xs text-gray-500">Inclusive of all taxes</p>

              {med.quantityInStore === 0 ? (
                <p className="text-red-600 font-semibold text-sm mt-2">
                  We will restock this item soon
                </p>
              ) : null}

              <button
                className={`w-full flex items-center justify-center gap-2 mt-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                  med.quantityInStore > 0
                    ? addedToCart[med._id]
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
                disabled={med.quantityInStore === 0}
                onClick={() =>
                  addedToCart[med._id]
                    ? navigate("/cart-page")
                    : handleAddToCart(med._id, med.quantityInStore)
                }
              >
                <FaShoppingCart />
                {med.quantityInStore > 0
                  ? addedToCart[med._id]
                    ? "Go to Cart"
                    : "Add To Cart"
                  : "Out Of Stock"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pharmacy;

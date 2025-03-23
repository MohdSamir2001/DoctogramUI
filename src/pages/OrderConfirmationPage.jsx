import { useEffect } from "react";
import { useNavigate } from "react-router";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect user to home or orders page after a delay
    const timer = setTimeout(() => {
      navigate("/orders");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold text-green-600">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-700 mt-2">
          Thank you for your purchase. Your order is being processed.
        </p>
        <p className="text-gray-500 mt-1">Redirecting to orders page...</p>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;

import React, { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const MyAppointments = () => {
  const navigate = useNavigate();
  const backendUrl = "http://localhost:1234"; // Update with your actual backend URL
  const token = useSelector((store) => store.user);

  const [appointments, setAppointments] = useState([]);
  const [payment, setPayment] = useState("");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1]) - 1]} ${
      dateArray[2]
    }`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        withCredentials: true,
      });
      setAppointments(data.appointments.reverse());
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Secure payment for your appointment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verifyRazorpay`,
            response,
            { withCredentials: true }
          );
          if (data.success) {
            toast.success("Payment successful!");
            getUserAppointments();
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId },
        { withCredentials: true }
      );
      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const appointmentStripe = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-stripe`,
        { appointmentId },
        { withCredentials: true }
      );
      if (data.success) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="bg-slate-600 rounded-lg min-h-screen p-6 sm:p-10 text-white">
      <h2 className="text-2xl font-semibold border-b pb-3">My Appointments</h2>

      <div className="mt-6">
        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col sm:flex-row gap-6 mt-4"
            >
              {/* Doctor Image */}
              <img
                className="w-36 h-36 object-cover rounded-lg"
                src={item.doctorData.image}
                alt={item.doctorData.name}
              />

              {/* Doctor Details */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold">
                  {item.doctorData.name}
                </h3>
                <p className="text-gray-300">{item.doctorData.speciality}</p>
                <p className="text-gray-400">
                  Experience: {item.doctorData.experience} years
                </p>
                <p className="mt-3">{item.doctorData.about}</p>
                <p className="mt-2 text-sm text-gray-400">
                  <span className="font-semibold">Date & Time:</span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 justify-center">
                {!item.cancelled &&
                  !item.payment &&
                  !item.isCompleted &&
                  payment !== item._id && (
                    <button
                      onClick={() => setPayment(item._id)}
                      className="w-full py-2  border rounded-lg bg-blue-600 hover:bg-blue-500 transition text-white font-semibold"
                    >
                      Pay Online
                    </button>
                  )}

                {!item.cancelled &&
                  !item.payment &&
                  !item.isCompleted &&
                  payment === item._id && (
                    <>
                      <button
                        onClick={() => appointmentStripe(item._id)}
                        className="w-full py-2 border rounded-lg bg-gray-700 hover:bg-gray-600 transition text-white"
                      >
                        Pay with Stripe
                      </button>
                      <button
                        onClick={() => appointmentRazorpay(item._id)}
                        className="w-full py-2 border rounded-lg bg-gray-700 hover:bg-gray-600 transition text-white"
                      >
                        Pay with Razorpay
                      </button>
                    </>
                  )}

                {!item.cancelled && item.payment && !item.isCompleted && (
                  <button className="w-full  py-2 border rounded-lg bg-green-600 text-white font-semibold">
                    Paid
                  </button>
                )}

                {item.isCompleted && (
                  <button className="w-full py-2 border rounded-lg text-green-500 border-green-500">
                    Completed
                  </button>
                )}

                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="w-full px-6 py-2 border rounded-lg bg-red-600 hover:bg-red-500 transition text-white font-semibold"
                  >
                    Cancel Appointment
                  </button>
                )}

                {item.cancelled && !item.isCompleted && (
                  <button className="w-full px-6 py-2 border rounded-lg text-red-500 border-red-500">
                    Appointment Cancelled
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-300 mt-6">
            No Appointments Found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { toast } from "react-toastify";

const AppointmentPage = () => {
  const { docId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const token = useSelector((store) => store.user);
  const backendUrl = "http://localhost:1234";

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Fetch doctor details
  const fetchDoctor = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/get-doctor/${docId}`,
        { withCredentials: true }
      );
      if (data.success) {
        setDoctor(data.doctor);
      } else {
        toast.error("Doctor not found");
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to load doctor data");
      console.error(error);
    }
  };

  // Generate available slots
  const getAvailableSlots = () => {
    if (!doctor) return;

    let today = new Date();
    let slots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      currentDate.setHours(i === 0 ? Math.max(today.getHours() + 1, 10) : 10);
      currentDate.setMinutes(0);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      let daySlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let slotDate = `${currentDate.getDate()}_${
          currentDate.getMonth() + 1
        }_${currentDate.getFullYear()}`;
        let isSlotAvailable =
          !doctor.slots_booked?.[slotDate]?.includes(formattedTime);

        if (isSlotAvailable) {
          daySlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      if (daySlots.length) {
        slots.push(daySlots);
      }
    }

    setDocSlots(slots);
  };

  // Book an appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warning("Login to book an appointment");
      return navigate("/login");
    }

    const date = docSlots[slotIndex][0].datetime;
    const slotDate = `${date.getDate()}_${
      date.getMonth() + 1
    }_${date.getFullYear()}`;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        fetchDoctor();
        navigate("/user-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to book appointment");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, [docId]);

  useEffect(() => {
    if (doctor) {
      getAvailableSlots();
    }
  }, [doctor]);

  return doctor ? (
    <div className="bg-slate-600 rounded-lg min-h-screen text-white p-6 sm:p-10">
      {/* Doctor Details Card */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 sm:p-10 rounded-lg shadow-lg flex flex-col sm:flex-row gap-6">
        <img
          className="w-full sm:w-48 h-48 object-cover rounded-lg"
          src={doctor.image}
          alt={doctor.name}
        />
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{doctor.name}</h2>
          <p className="text-gray-300">
            {doctor.degree} - {doctor.speciality}
          </p>
          <p className="mt-2 text-gray-400">
            Experience: {doctor.experience} years
          </p>
          <p className="mt-3">{doctor.about}</p>
          <p className="mt-4 font-semibold text-lg">Fee: ₹{doctor.fees}</p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="max-w-4xl mx-auto mt-8">
        <h3 className="text-xl font-semibold">Booking Slots</h3>

        {/* Date Selection */}
        <div className="flex gap-3 overflow-x-auto mt-4 pb-2">
          {docSlots.map((item, index) => (
            <button
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`px-4 py-2 rounded-lg transition ${
                slotIndex === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              {daysOfWeek[item[0].datetime.getDay()]} <br />
              {item[0].datetime.getDate()}
            </button>
          ))}
        </div>

        {/* Time Selection */}
        <div className="flex gap-3 overflow-x-auto mt-4 pb-2">
          {docSlots.length &&
            docSlots[slotIndex].map((item, index) => (
              <button
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`px-4 py-2 rounded-lg transition ${
                  item.time === slotTime
                    ? "bg-green-500 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {item.time.toLowerCase()}
              </button>
            ))}
        </div>

        {/* Book Appointment Button */}
        <button
          onClick={bookAppointment}
          className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-500 transition text-white font-semibold rounded-lg"
        >
          Book an Appointment
        </button>
      </div>
    </div>
  ) : null;
};

export default AppointmentPage;

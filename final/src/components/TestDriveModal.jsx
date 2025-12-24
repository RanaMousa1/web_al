import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API_URL from '../config/api';

const TestDriveModal = ({ onClose, carId, carName }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("10:00");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const isValidPhone = (phone) => {
    return /^[0-9]{8,15}$/.test(phone);
  };

  const isWeekend = (d) => {
    const day = d.getDay();
    return day === 0 || day === 6;
  };

  const isOfficeClosed = (t) => {
    const hour = parseInt(t.split(":")[0]);
    return hour < 9 || hour > 17;
  };

  const handleConfirm = async () => {
    setMessage("");

    if (!name || !email || !phone) {
      setMessage("❌ Please fill all fields.");
      return;
    }

    if (name.length < 3) {
      setMessage("❌ Name must be at least 3 characters.");
      return;
    }

    if (!isValidPhone(phone)) {
      setMessage("❌ Phone number must be numeric (8–15 digits).");
      return;
    }

    if (date < new Date()) {
      setMessage("❌ You cannot book in the past.");
      return;
    }

    if (isWeekend(date)) {
      setMessage("❌ Test drives are not available on weekends.");
      return;
    }

    if (isOfficeClosed(time)) {
      setMessage("❌ Test drives only available from 09:00 to 17:00.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/test-drives`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId: carId,
          name,
          email,
          phone,
          date: `${date.toDateString()} ${time}`
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ " + data.message);
      } else {
        setMessage("❌ " + (data.error || 'Failed to book test drive'));
      }

    } catch (err) {
      setMessage("❌ Could not connect to server");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] p-6 rounded-lg relative">

        <button onClick={onClose} className="absolute top-3 right-3 text-xl">✖</button>

        <h2 className="text-2xl font-bold mb-4">Schedule Test Drive</h2>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Car</label>
          <input
            type="text"
            value={carName || 'Not specified'}
            disabled
            className="w-full p-3 border rounded bg-gray-100"
          />
        </div>

        <label className="block mb-2 font-medium">Select Date</label>
        <DatePicker
          selected={date}
          onChange={(d) => setDate(d)}
          minDate={new Date()}
          className="w-full p-3 border rounded mb-4"
        />

        <label className="block mb-2 font-medium">Select Time</label>
        <select value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-3 border rounded mb-4">
          <option>09:00</option>
          <option>10:00</option>
          <option>11:00</option>
          <option>12:00</option>
          <option>13:00</option>
          <option>14:00</option>
          <option>15:00</option>
          <option>16:00</option>
          <option>17:00</option>
        </select>

        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 border rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-3 border rounded mb-4"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {message && (
          <div className={`p-3 rounded mb-4 text-sm ${message.includes("❌") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message}
          </div>
        )}

        <button
          onClick={handleConfirm}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
        >
          Confirm Booking
        </button>

      </div>
    </div>
  );
};

export default TestDriveModal;

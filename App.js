import React, { useState, useEffect } from "react";

const banquetNames = ["Ujjwala", "Haveli", "Rajwada"];
const ADMIN_PASSWORD = "admin123";

const initialBookings = {
  Ujjwala: [{ date: "2024-12-10", slot: "Day" }],
  Haveli: [],
  Rajwada: [],
};

function BookingManager() {
  const [initialized, setInitialized] = useState(false);
  const [selectedBanquet, setSelectedBanquet] = useState("Ujjwala");
  const [bookings, setBookings] = useState({});
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [newBooking, setNewBooking] = useState({ date: "", slot: "Day" });
  const [adminMode, setAdminMode] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [expenses, setExpenses] = useState({});
  const [newExpense, setNewExpense] = useState({ label: "", amount: "" });

  useEffect(() => {
    setBookings(initialBookings);
    setExpenses({ Ujjwala: [], Haveli: [], Rajwada: [] });
    setInitialized(true);
  }, []);

  const isDateBooked = (date) => {
    return bookings[selectedBanquet]?.some(
      (b) => b.date === new Date(date).toISOString().split("T")[0]
    );
  };

  const addBooking = () => {
    if (newBooking.date && !isDateBooked(newBooking.date)) {
      setBookings((prev) => ({
        ...prev,
        [selectedBanquet]: [...prev[selectedBanquet], newBooking],
      }));
      setNewBooking({ date: "", slot: "Day" });
    }
  };

  const addExpense = () => {
    if (newExpense.label && newExpense.amount) {
      setExpenses((prev) => ({
        ...prev,
        [selectedBanquet]: [...prev[selectedBanquet], newExpense],
      }));
      setNewExpense({ label: "", amount: "" });
    }
  };

  const handleAdminToggle = () => {
    if (!adminUnlocked) {
      const input = window.prompt("Enter admin password:");
      if (input === ADMIN_PASSWORD) {
        setAdminUnlocked(true);
        setAdminMode(true);
      } else {
        alert("Incorrect password.");
      }
    } else {
      setAdminMode(!adminMode);
    }
  };

  if (!initialized) return <div>Loading...</div>;

  return (
    <div>
      <h1>{selectedBanquet.toUpperCase()} RESORT & BANQUET</h1>
      <label>Select Banquet:</label>
      <select
        value={selectedBanquet}
        onChange={(e) => setSelectedBanquet(e.target.value)}
      >
        {banquetNames.map((b) => (
          <option key={b}>{b}</option>
        ))}
      </select>

      <h2>Booking Calendar</h2>
      <input
        type="date"
        onChange={(e) => {
          const selected = e.target.value;
          if (!isDateBooked(selected)) {
            window.open(
              `https://wa.me/917668235102?text=I want to book ${selectedBanquet} on ${selected}`,
              "_blank"
            );
          } else {
            alert("Already booked.");
          }
        }}
      />

      <hr />
      <button onClick={handleAdminToggle}>
        {adminMode ? "🔒 Close Admin Panel" : "🔓 Open Admin Panel"}
      </button>

      {adminMode && (
        <div style={{ marginTop: "20px" }}>
          <h3>Add Booking</h3>
          <input
            type="date"
            value={newBooking.date}
            onChange={(e) =>
              setNewBooking({ ...newBooking, date: e.target.value })
            }
          />
          <select
            value={newBooking.slot}
            onChange={(e) =>
              setNewBooking({ ...newBooking, slot: e.target.value })
            }
          >
            <option>Day</option>
            <option>Night</option>
          </select>
          <button onClick={addBooking}>Add</button>

          <ul>
            {bookings[selectedBanquet].map((b, i) => (
              <li key={i}>
                📌 {b.date} - {b.slot}
              </li>
            ))}
          </ul>

          <h3>Expenses</h3>
          <input
            type="text"
            placeholder="Description"
            value={newExpense.label}
            onChange={(e) =>
              setNewExpense({ ...newExpense, label: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={(e) =>
              setNewExpense({ ...newExpense, amount: e.target.value })
            }
          />
          <button onClick={addExpense}>Add Expense</button>
          <ul>
            {expenses[selectedBanquet].map((ex, idx) => (
              <li key={idx}>
                ₹{ex.amount} - {ex.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BookingManager;
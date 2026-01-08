import { useState } from "react";
import {
  FaBell,
  FaCog,
  FaHome,
  FaNewspaper,
  FaStickyNote
} from "react-icons/fa";
import AddUser from "./AddUser";
import "./admin.css";
import { useNavigate } from "react-router-dom";
const API_BASE = "https://eduproapi.vercel.app"; 
const Activate = () => {
  const [activeTab, setActiveTab] = useState("key");
  const [showModal, setShowModal] = useState(false);
  const [license, setLicense] = useState("");
const [pin, setPin] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();



// const activate = async () => {
//   if (!license.trim()) return alert("Enter activation key");

//   try {
//     const res = await window.api.activateApp(license);
//     if (res.status && res.activationKey) {
//       localStorage.setItem("isActivated", "true");
//       localStorage.setItem("activationKey", res.activationKey);
//       alert("Activated successfully!");
//       navigate("/dashboard");
//     } else {
//       alert(res.message || "Activation failed");
//     }
//   } catch (err) {
//     alert("Activation failed: " + err.message);
//   }
// };

// const activateWithPin = async () => {
//   if (!pin.trim() || !phoneNumber.trim()) return alert("PIN and phone number required");

//   try {
//     const res = await window.api.activateWithPin({ pin, phoneNumber });
//     if (res.status && res.activationKey) {
//       localStorage.setItem("isActivated", "true");
//       localStorage.setItem("activationKey", res.activationKey);
//       alert("Activated successfully!");
//       navigate("/dashboard");
//     } else {
//       alert(res.message || "Invalid PIN");
//     }
//   } catch (err) {
//     alert("Activation failed: " + err.message);
//   }
// };
  

// 🔑 ACTIVATE WITH LICENSE KEY (optional – if you still support it)
  const activate = async () => {
    if (!license.trim()) {
      alert("Enter activation key");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/user/activate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "license",
          license,
          productKey: getDeviceId(),
        }),
      });

      const data = await res.json();

      if (data.status) {
        localStorage.setItem("isActivated", "true");
        localStorage.setItem("activationKey", data.activationKey);
        alert("Activated successfully!");
        navigate("/dashboard");
      } else {
        alert(data.message || "Activation failed");
      }
    } catch (err) {
      alert("Activation failed");
    }
  };

  // 🔢 ACTIVATE WITH PIN (MAIN ONE YOU USE)
  const activateWithPin = async () => {
    if (!pin.trim()) {
      alert("PIN required");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/user/activate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "pin",
          pin,
          productKey: getDeviceId(),
        }),
      });

      const data = await res.json();

      if (data.status) {
        localStorage.setItem("isActivated", "true");
        localStorage.setItem("activationKey", data.activationKey);
        alert("Activated successfully!");
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid PIN");
      }
    } catch (err) {
      alert("Activation failed");
    }
  };



return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="profile">
          <div className="avatar" />
          <div className="bell">
            <FaBell />
            <span className="badge">23</span>
          </div>
        </div>

        <nav>
          <button className="active"  onClick={() => navigate("/dashboard")}><FaHome /> Home</button>
          <button><FaStickyNote /> Notes</button>
          <button><FaNewspaper /> News</button>
          <button><FaCog /> Settings</button>
        </nav>

        <AddUser open={showModal} onClose={() => setShowModal(false)} />
      </aside>

      {/* MAIN */}
      <main className="bodys">
        <header className="headers">
          <h1>Activate App</h1>
        </header>

        <section className="activate-container">
          {/* TABS */}
          <div className="activate-tabs">
            <button
              className={activeTab === "pin" ? "tab active" : "tab"}
              onClick={() => setActiveTab("pin")}
            >
              I Have a PIN
            </button>

            <button
              className={activeTab === "key" ? "tab active" : "tab"}
              onClick={() => setActiveTab("key")}
            >
              I Have a Activation Key
            </button>

            <button
              className={activeTab === "buy" ? "tab active" : "tab"}
              onClick={() => setActiveTab("buy")}
            >
              I Want to Buy
            </button>
          </div>

          {/* FORM */}
          {activeTab === "key" && (
            <div className="activate-form">
              <label>Enter Activation Key</label>
            <input
  type="text"
  placeholder="Enter activation key"
  value={license}
  onChange={(e) => setLicense(e.target.value)}
/>


           <button className="activate-btn" onClick={activate}>
  Activate App
</button>

            </div>
          )}
          {/* FORM */}
{activeTab === "pin" && (
  <div className="activate-form">
    <p className="activate-info">
      Create a new temporary profile for an additional user.
      Guest accounts can be edited by the owner's account only.
    </p>

  
      <label>Enter PIN</label>
<input
  type="text"
  placeholder="Enter PIN"
  value={pin}
  onChange={(e) => setPin(e.target.value)}
/>

  

   
      <label>Phone Number</label>
  <input
  type="text"
  placeholder="Enter phone number"
  value={phoneNumber}
  onChange={(e) => setPhoneNumber(e.target.value)}
/>

  
<button className="activate-btn" onClick={activateWithPin}>
  Activate App
</button>


  </div>
)}
{/* I WANT TO BUY */}
{activeTab === "buy" && (
  <div className="activate-form">

    <button className="buy-input">
      <span>Buy with ATM Card</span>
      <span className="arrow">→</span>
    </button>

    <button className="buy-input">
      <span>Buy from Sales Point</span>
      <span className="arrow">→</span>
    </button>

    <button className="buy-input">
      <span>Pay in the Bank</span>
      <span className="arrow">→</span>
    </button>

  </div>
)}


        </section>
      </main>
    </div>
  );
};

export default Activate;

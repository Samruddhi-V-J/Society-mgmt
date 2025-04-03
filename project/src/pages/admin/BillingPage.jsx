// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const BillingPage = () => {
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [userDetails, setUserDetails] = useState(null);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       const userEmail = localStorage.getItem("userEmail"); // Get stored email
//       if (!userEmail) return;

//       try {
//         const res = await axios.get(`http://localhost:8080/usersdata/by-email?email=${userEmail}`);
//         setUserDetails(res.data);
//       } catch (error) {
//         console.error("Error fetching resident details:", error);
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   const handlePayNow = () => {
//     setShowPaymentModal(true);
//   };

//   const handlePayment = async () => {
//     if (!userDetails) {
//       alert("User details not loaded. Please try again.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axios.post("http://localhost:8080/api/payments/create-order?amount=3500&currency=INR");
//       const order = res.data;

//       const options = {
//         key: "rzp_test_cwlqEaF9z4PSNf",
//         amount: order.amount,
//         currency: order.currency,
//         name: userDetails.name, // ✅ Dynamically fetched user name
//         description: `Maintenance Bill for Flat ${userDetails.flatNo}`, // ✅ Dynamically fetched flat number
//         order_id: order.id,
//         handler: async function (response) {
//           alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
//           await savePaymentDetails(order.amount, response);
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const razor = new window.Razorpay(options);
//       razor.open();
//     } catch (error) {
//       console.error("Error creating order:", error);
//     } finally {
//       setLoading(false);
//       setShowPaymentModal(false);
//     }
//   };

//   const savePaymentDetails = async (amount, response) => {
//     if (!userDetails) return;

//     try {
//       await axios.post("http://localhost:8080/api/payments/save", {
//         name: userDetails.name, // ✅ Dynamically fetched name
//         phoneNo: userDetails.phone,
//         flatNo: userDetails.flatNo, // ✅ Dynamically fetched flat number
//         amountPaid: amount / 100,
//         paymentStatus: "Success",
//         transactionId: response.razorpay_payment_id,
//         paymentMode: "Razorpay",
//         dateOfPayment: new Date().toISOString(),
//       });
//     } catch (error) {
//       console.error("Error saving payment details:", error);
//     }
//   };

//   return (
//     <div className="billing-container">
//       <main className="main-content">
//         <header className="header">
//           <h1>Billings</h1>
//           <div className="user-info">
//             <span>{userDetails ? userDetails.name : "Loading..."}</span>
//             <div className="avatar"></div>
//           </div>
//         </header>

//         <div className="billing-content">
//           <div className="bill-card">
//             <h2>Monthly Maintenance Bill: 3500/-</h2>
//             <p>Flat No: {userDetails ? userDetails.flatNo : "Loading..."}</p> {/* ✅ Displaying Flat No */}
//             <button className="pay-now-btn" onClick={handlePayNow}>
//               Pay Now
//             </button>
//           </div>
//         </div>
//       </main>

//       {showPaymentModal && (
//         <div className="payment-modal">
//           <div className="payment-content">
//             <h2>Payment Request from CommUnity</h2>
//             <div className="payment-details">
//               <p>PAYMENT FOR</p>
//               <p>Maintenance bill for flat {userDetails?.flatNo}</p> {/* ✅ Displaying dynamically */}
//               <p>RECEIPT</p>
//               <p>REF172649455401</p>
//               <p>AMOUNT PAYABLE</p>
//               <p className="amount">INR 3,500.00</p>
//             </div>
//             <button className="continue-btn" onClick={handlePayment}>
//               {loading ? "Processing..." : "Continue"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BillingPage;



import React, { useState, useEffect } from "react";
import axios from "axios";

const BillingPage = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("Pending");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) return;

      try {
        const res = await axios.get(`http://localhost:8080/usersdata/by-email?email=${userEmail}`);
        setUserDetails(res.data);

        const paymentRes = await axios.get(`http://localhost:8080/api/payments/status?email=${userEmail}`);
        setPaymentStatus(paymentRes.data.status);
      } catch (error) {
        console.error("Error fetching resident details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handlePayNow = () => {
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    if (!userDetails) {
      alert("User details not loaded. Please try again.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/payments/create-order?amount=3500&currency=INR");
      const order = res.data;

      const options = {
        key: "rzp_test_cwlqEaF9z4PSNf",
        amount: order.amount,
        currency: order.currency,
        name: userDetails.name,
        description: `Maintenance Bill for Flat ${userDetails.flatNo}`,
        order_id: order.id,
        handler: async function (response) {
          alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          await savePaymentDetails(order.amount, response);
          setPaymentStatus("Success");
        },
        theme: {
          color: "#007bff",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setLoading(false);
      setShowPaymentModal(false);
    }
  };

  const savePaymentDetails = async (amount, response) => {
    if (!userDetails) return;

    try {
      await axios.post("http://localhost:8080/api/payments/save", {
        name: userDetails.name,
        phoneNo: userDetails.phone,
        flatNo: userDetails.flatNo,
        amountPaid: amount / 100,
        paymentStatus: "Success",
        transactionId: response.razorpay_payment_id,
        paymentMode: "Razorpay",
        dateOfPayment: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error saving payment details:", error);
    }
  };

  // 🔹 Updated Styles
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    main: {
      background: "#fff",
      padding: "25px",
      borderRadius: "12px",
      width: "380px",
      textAlign: "center",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      border: "1px solid #ddd",
    },
    header: {
      fontSize: "24px",
      fontWeight: "600",
      marginBottom: "15px",
      color: "#333",
    },
    billCard: {
      background: "#f5f5f5",
      padding: "15px",
      borderRadius: "8px",
      marginTop: "15px",
      border: "1px solid #ddd",
    },
    amount: {
      fontSize: "26px",
      fontWeight: "bold",
      color: "#007bff",
      margin: "10px 0",
    },
    payNowBtn: {
      background: "#007bff",
      color: "white",
      border: "none",
      padding: "10px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "background 0.3s ease",
      fontSize: "16px",
    },
    payNowBtnHover: {
      background: "#0056b3",
    },
    paidText: {
      fontSize: "18px",
      color: "green",
      fontWeight: "bold",
      marginTop: "10px",
    },
    modalOverlay: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      width: "320px",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    },
    continueBtn: {
      background: "#28a745",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
      marginTop: "10px",
      transition: "background 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <header>
          <h1 style={styles.header}>Billing</h1>
          <div>
            <span>{userDetails ? userDetails.name : "Loading..."}</span>
          </div>
        </header>

        <div style={styles.billCard}>
          <h2>Maintenance Bill</h2>
          <p>Flat No: {userDetails ? userDetails.flatNo : "Loading..."}</p>
          <p style={styles.amount}>₹3,500.00</p>

          {paymentStatus === "Success" ? (
            <p style={styles.paidText}>✅ Maintenance Paid</p>
          ) : (
            <button
              style={styles.payNowBtn}
              onClick={handlePayNow}
              onMouseOver={(e) => (e.target.style.background = styles.payNowBtnHover.background)}
              onMouseOut={(e) => (e.target.style.background = styles.payNowBtn.background)}
            >
              Pay Now
            </button>
          )}
        </div>
      </main>

      {showPaymentModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>Payment Request</h2>
            <p>Maintenance bill for flat {userDetails?.flatNo}</p>
            <p>Receipt: REF172649455401</p>
            <p style={styles.amount}>₹3,500.00</p>
            <button style={styles.continueBtn} onClick={handlePayment}>
              {loading ? "Processing..." : "Continue"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingPage;

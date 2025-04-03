// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "../../components/Navbar";
// import { Box, Typography, Button, Card, CardContent, CircularProgress, Modal } from "@mui/material";

// const BillingPage = () => {
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [userDetails, setUserDetails] = useState(null);
//   const [paymentStatus, setPaymentStatus] = useState("Pending");

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       const userEmail = localStorage.getItem("userEmail");
//       if (!userEmail) return;

//       try {
//         const res = await axios.get(`http://localhost:8080/usersdata/by-email?email=${userEmail}`);
//         setUserDetails(res.data);

//         const paymentRes = await axios.get(`http://localhost:8080/api/payments/status?email=${userEmail}`);
//         setPaymentStatus(paymentRes.data.status);
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
//         name: userDetails.name,
//         description: `Maintenance Bill for Flat ${userDetails.flatNo}`,
//         order_id: order.id,
//         handler: async function (response) {
//           alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
//           await savePaymentDetails(order.amount, response);
//           setPaymentStatus("Success");
//         },
//         theme: { color: "#007bff" },
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
//         name: userDetails.name,
//         phoneNo: userDetails.phone,
//         flatNo: userDetails.flatNo,
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
//     <Box className="complaints-section" p={4}>
//        <Navbar title="Billing Management" />


//     <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", backgroundColor: "#f4f6f8", p: 4 }}>
     
//       <Card sx={{ width: 400, textAlign: "center", p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: "#fff" }}>
//         <CardContent>
//           <Typography variant="h5" fontWeight="bold" gutterBottom>
//             Maintenance Bill
//           </Typography>
//           <Typography variant="subtitle1">
//             Flat No: <b>{userDetails ? userDetails.flatNo : "Loading..."}</b>
//           </Typography>
//           <Typography variant="h4" color="primary" sx={{ fontWeight: "bold", my: 2 }}>
//             ₹3,500.00
//           </Typography>

//           {paymentStatus === "Success" ? (
//             <Typography variant="h6" sx={{ color: "green", fontWeight: "bold" }}>
//               ✅ Maintenance Paid
//             </Typography>
//           ) : (
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: "#007bff",
//                 color: "white",
//                 fontWeight: "bold",
//                 mt: 2,
//                 px: 4,
//                 "&:hover": { backgroundColor: "#0056b3" },
//               }}
//               onClick={handlePayNow}
//             >
//               Pay Now
//             </Button>
//           )}
//         </CardContent>
//       </Card>

//       <Modal open={showPaymentModal} onClose={() => setShowPaymentModal(false)}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 320,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//             textAlign: "center",
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             Payment Request
//           </Typography>
//           <Typography variant="body1">Maintenance bill for flat {userDetails?.flatNo}</Typography>
//           <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
//             Receipt: <b>REF172649455401</b>
//           </Typography>
//           <Typography variant="h4" color="primary" fontWeight="bold" sx={{ mt: 2 }}>
//             ₹3,500.00
//           </Typography>

//           <Button
//             variant="contained"
//             color="success"
//             sx={{ mt: 3, px: 4 }}
//             onClick={handlePayment}
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Continue"}
//           </Button>
//         </Box>
//       </Modal>
//     </Box>

//     </Box>

//   );
// };

// export default BillingPage;





import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { Box, Typography, Button, Card, CardContent, CircularProgress, Modal } from "@mui/material";

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
        theme: { color: "#007bff" },
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

  return (
    <Box className="complaints-section" p={4}>
      <Navbar title="Billing Management" />

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", backgroundColor: "#f4f6f8", p: 4 }}>
        <Card sx={{ width: 400, textAlign: "center", p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: "#fff" }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Maintenance Bill
            </Typography>
            <Typography variant="subtitle1">
              Flat No: <b>{userDetails ? userDetails.flatNo : "Loading..."}</b>
            </Typography>
            <Typography variant="h4" color="primary" sx={{ fontWeight: "bold", my: 2 }}>
              ₹3,500.00
            </Typography>

            {paymentStatus === "Success" ? (
              <Typography variant="h6" sx={{ color: "green", fontWeight: "bold" }}>
                ✅ Maintenance Paid
              </Typography>
            ) : (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#007bff",
                  color: "white",
                  fontWeight: "bold",
                  mt: 2,
                  px: 4,
                  "&:hover": { backgroundColor: "#0056b3" },
                }}
                onClick={handlePayNow}
              >
                Pay Now
              </Button>
            )}
          </CardContent>
        </Card>

        <Modal open={showPaymentModal} onClose={() => setShowPaymentModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 320,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Payment Request
            </Typography>
            <Typography variant="body1">Maintenance bill for flat {userDetails?.flatNo}</Typography>
            <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
              Receipt: <b>REF172649455401</b>
            </Typography>
            <Typography variant="h4" color="primary" fontWeight="bold" sx={{ mt: 2 }}>
              ₹3,500.00
            </Typography>

            <Button
              variant="contained"
              color="success"
              sx={{ mt: 3, px: 4 }}
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Continue"}
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default BillingPage;

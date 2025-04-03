import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Paper, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import { FaEnvelope } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { PiBuildingApartmentFill } from "react-icons/pi";

function AdminDashboard() {
  const [selectedBlock, setSelectedBlock] = useState("blockA");
  const [residents, setResidents] = useState([]);

  const TOTAL_FLATS = 40; // Fixed number of total flats

  useEffect(() => {
    axios
      .get("http://localhost:8080/usersdata/resident-all")
      .then((response) => {
        console.log("API Response:", response.data);
        setResidents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching residents:", error);
      });
  }, []);

  // Extract unique occupied flats
  const occupiedFlats = new Set(residents.map((resident) => resident.flatNo));

  const stats = [
    { title: "Total Blocks", value: "2" },
    { title: "Total Flats", value: TOTAL_FLATS },
    { title: "Occupied Flats", value: occupiedFlats.size }, // Count unique occupied flats
    { title: "Available Flats", value: TOTAL_FLATS - occupiedFlats.size }, // Available = Total - Occupied
    
  ];

  return (
    <div className="page">
      <Navbar title="Resident Dashboard" />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 3,
        }}
      >
        {stats.map((stat, index) => (
          <Paper
            key={index}
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: "white",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              {stat.title}
            </Typography>
            <Typography
              variant="h3"
              sx={{ color: "#1B2B65", fontWeight: "bold" }}
            >
              {stat.value}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Typography variant="h5" sx={{ mt: 4 }}>
        Resident Details
      </Typography>

      {/* Block Toggle Buttons */}
      <div className="block-buttons">
        <button
          className={selectedBlock === "blockA" ? "active" : ""}
          onClick={() => setSelectedBlock("blockA")}
        >
          Block A
        </button>
        <button
          className={selectedBlock === "blockB" ? "active" : ""}
          onClick={() => setSelectedBlock("blockB")}
        >
          Block B
        </button>
      </div>

      {/* Residents Grid */}
      <div className="resident-container">
        {residents
          .filter((resident) => {
            const block = resident.flatNo
              ? resident.flatNo.charAt(0).toUpperCase()
              : "";
            return block === (selectedBlock === "blockA" ? "A" : "B");
          })
          .map((resident) => (
            <div key={resident.id} className="resident-card">
              <div className="resident-description">
                <h3>
                  <strong>{resident.name}</strong>
                </h3>
                <p>
                  Block -{" "}
                  {resident.flatNo ? resident.flatNo.charAt(0).toUpperCase() : "N/A"}{" "}
                </p>
                <p>
                  <MdHome className="icon" /> Flat No : {resident.flatNo || "N/A"}{" "}
                </p>
                <p>
                  <PiBuildingApartmentFill className="icon" /> Society :{" "}
                  {resident.societyName || "N/A"}{" "}
                </p>
                <p>
                  <FaEnvelope className="icon" /> Postal Code : {resident.postal || "N/A"}{" "}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminDashboard;

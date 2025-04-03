import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ResidentList.css";
import { FaUserCircle, FaUsers, FaSignOutAlt, FaHome, FaEnvelope, FaBuilding } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { MdMarkEmailRead } from "react-icons/md";
import { PiBuildingApartmentFill } from "react-icons/pi";



const ResidentList = () => {
    const [selectedBlock, setSelectedBlock] = useState("blockA"); 
    const [residents, setResidents] = useState([]);
    const user = { name: "John Doe" };

    useEffect(() => {
        axios.get("http://localhost:8080/usersdata/resident-all")
        .then((response) => {
            console.log("API Response:", response.data);
            setResidents(response.data);
        })
        .catch((error) => {
            console.error("Error fetching residents:", error);
        });
    }, []);

    return (
        <div className="container">
            {/* Navbar */}

            {/* Spacing below navbar */}
            <div className="spacing"></div>

            {/* Block Toggle Buttons */}
            <div className="block-buttons">
                <button className={selectedBlock === "blockA" ? "active" : ""} onClick={() => setSelectedBlock("blockA")}>
                    Block A
                </button>
                <button className={selectedBlock === "blockB" ? "active" : ""} onClick={() => setSelectedBlock("blockB")}>
                    Block B
                </button>
            </div>

            {/* Residents Grid */}
            <div className="resident-container">
                {residents
                    .filter((resident) => {
                        const block = resident.flatNo ? resident.flatNo.charAt(0).toUpperCase() : ""; // Extract first letter
                        return block === (selectedBlock === "blockA" ? "A" : "B");
                    })
                    .map((resident) => (
                        <div key={resident.id} className="resident-card">
                            <div className="resident-description">
                                <h3><strong>{resident.name}</strong></h3>

                                <p>Block - {resident.flatNo.charAt(0).toUpperCase()} </p>
                                <p> <MdHome className="icon" />  Flat No : {resident.flatNo} </p>
                                <p> <PiBuildingApartmentFill className="icon" />  Society : {resident.societyName} </p>
                                <p> <FaEnvelope className="icon" />  Postal Code :  {resident.postal} </p>

                            </div>
                        </div>
                ))}
            </div>
        </div>
    );
};

export default ResidentList;


// import React, { useState, useEffect } from 'react';
// import { Users } from 'lucide-react';
// import axios from 'axios';
// import BlockSelector from './BlockSelector';
// import ResidentCard from './ResidentCard';


// const ResidentList = () => {
//   const [residents, setResidents] = useState([]);
//   const [selectedBlock, setSelectedBlock] = useState('A');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchResidents = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/usersdata/resident-all');
//         setResidents(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch residents');
//         setLoading(false);
//       }
//     };

//     fetchResidents();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-xl text-blue-600">Loading...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-xl text-red-600">{error}</div>
//       </div>
//     );
//   }

//   const blocks = Array.from(new Set(residents.map(r => r.block)));
//   const filteredResidents = residents.filter(r => r.block === selectedBlock);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex items-center gap-4 mb-8">
//         <Users className="w-8 h-8 text-blue-600" />
//         <h1 className="text-3xl font-bold">Apartments</h1>
//       </div>

//       <BlockSelector
//         selectedBlock={selectedBlock}
//         blocks={blocks}
//         onBlockChange={setSelectedBlock}
//       />

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredResidents.map((resident) => (
//           <ResidentCard key={resident.id} resident={resident} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ResidentList;
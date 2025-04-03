// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Building2, User, Phone, Mail, Home } from 'lucide-react';

// const ResidentProfile = () => {
//   const { id } = useParams();
//   const [resident, setResident] = useState(null);

//   useEffect(() => {
//     const fetchResident = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/usersdata/${id}`);
//         setResident(response.data);
//       } catch (error) {
//         console.error('Error fetching resident:', error);
//       }
//     };

//     fetchResident();
//   }, [id]);

//   if (!resident) return <div className="text-center">Loading...</div>;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">User Profile</h1>

//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-8 text-white">
//           <h2 className="text-2xl font-bold">{resident.name}</h2>
//           <p className="mt-2">Flat - {resident.flatNo}</p>
//         </div>

//         <div className="p-8">
//           <h3 className="text-xl text-blue-600 font-semibold mb-6">INFORMATION</h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <div>
//                 <p className="text-gray-500 text-sm">Society Name</p>
//                 <div className="flex items-center gap-2 mt-1">
//                   <Building2 className="w-5 h-5 text-gray-400" />
//                   <p>{resident.societyName}</p>
//                 </div>
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm">Block</p>
//                 <div className="flex items-center gap-2 mt-1">
//                   <Home className="w-5 h-5 text-gray-400" />
//                   <p>Block {resident.block}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <p className="text-gray-500 text-sm">Name</p>
//                 <div className="flex items-center gap-2 mt-1">
//                   <User className="w-5 h-5 text-gray-400" />
//                   <p>{resident.name}</p>
//                 </div>
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm">Flat No</p>
//                 <div className="flex items-center gap-2 mt-1">
//                   <Building2 className="w-5 h-5 text-gray-400" />
//                   <p>{resident.flatNo}</p>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <p className="text-gray-500 text-sm">Phone</p>
//               <div className="flex items-center gap-2 mt-1">
//                 <Phone className="w-5 h-5 text-gray-400" />
//                 <p>{resident.phone}</p>
//               </div>
//             </div>

//             <div>
//               <p className="text-gray-500 text-sm">Email</p>
//               <div className="flex items-center gap-2 mt-1">
//                 <Mail className="w-5 h-5 text-gray-400" />
//                 <p>{resident.email}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResidentProfile;



import './ResidentProfile.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Building2, User, Phone, Mail, Home } from 'lucide-react';

const ResidentProfile = () => {
  const { id } = useParams();
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResident = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/usersdata/${id}`);
        setResident(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch resident details');
        setLoading(false);
      }
    };

    fetchResident();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-blue-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!resident) return <div className="text-center">Resident not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-8 text-white">
          <h2 className="text-2xl font-bold">{resident.name}</h2>
          <p className="mt-2">Flat - {resident.flatNo}</p>
        </div>

        <div className="p-8">
          <h3 className="text-xl text-blue-600 font-semibold mb-6">INFORMATION</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm">Society Name</p>
                <div className="flex items-center gap-2 mt-1">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  <p>{resident.societyName}</p>
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Block</p>
                <div className="flex items-center gap-2 mt-1">
                  <Home className="w-5 h-5 text-gray-400" />
                  <p>Block {resident.block}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm">Name</p>
                <div className="flex items-center gap-2 mt-1">
                  <User className="w-5 h-5 text-gray-400" />
                  <p>{resident.name}</p>
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Flat No</p>
                <div className="flex items-center gap-2 mt-1">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  <p>{resident.flatNo}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Phone</p>
              <div className="flex items-center gap-2 mt-1">
                <Phone className="w-5 h-5 text-gray-400" />
                <p>{resident.phone}</p>
              </div>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="w-5 h-5 text-gray-400" />
                <p>{resident.email}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentProfile;
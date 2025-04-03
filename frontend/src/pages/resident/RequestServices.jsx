// import Navbar from '../../components/Navbar';
// import { useState, useEffect } from 'react';
// import { TextField, Button, Paper, Typography, Box, Grid } from '@mui/material';

// function RequestServices() {
//   const [serviceType, setServiceType] = useState('Water Can');
//   const [name, setName] = useState('');
//   const [address, setAddress] = useState('');
//   const [phone, setPhone] = useState('');
//   const [notes, setNotes] = useState('');
//   const [requests, setRequests] = useState([]);
//   const [vendors, setVendors] = useState([]);

//   const services = ['Water Can', 'House Keeping', 'Gas', 'Plumbing', 'Garbage Collection'];

//   // Fetch all service requests
//   const fetchRequests = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/service-requests/all-services');
//       if (response.ok) {
//         const data = await response.json();
//         setRequests(Array.isArray(data) ? data : []);
//       } else {
//         console.error('Failed to fetch service requests.');
//       }
//     } catch (error) {
//       console.error('Error fetching service requests:', error);
//     }
//   };

//   // Fetch vendors by service type
//   const fetchVendors = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/vendors/service/${serviceType}`);
//       if (response.ok) {
//         const data = await response.json();
//         console.log('Fetched Vendors:', data); // Debugging output
//         setVendors(Array.isArray(data) ? data : data.vendors || []);
//       } else {
//         console.error('Failed to fetch vendors.');
//       }
//     } catch (error) {
//       console.error('Error fetching vendors:', error);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//     fetchVendors();
//   }, [serviceType]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const requestData = { serviceType, name, address, phoneNo: phone, additionalNotes: notes };

//     try {
//       const response = await fetch('http://localhost:8080/service-requests/add-services', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(requestData),
//       });

//       if (response.ok) {
//         alert('Service request sent successfully!');
//         setName('');
//         setAddress('');
//         setPhone('');
//         setNotes('');
//         fetchRequests();
//       } else {
//         alert('Failed to send service request.');
//       }
//     } catch (error) {
//       alert('Error: ' + error.message);
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Navbar title="Request Services" />

//       {/* <Typography variant="h4" sx={{ mb: 4 }}>
//         Request Services
//       </Typography> */}

//       <Grid container spacing={4}>
//         {/* Left Panel: Service Request Form */}
//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Select Service Type
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
//             {services.map((service) => (
//               <Button
//                 key={service}
//                 variant={serviceType === service ? 'contained' : 'outlined'}
//                 onClick={() => setServiceType(service)}
//                 sx={{
//                   backgroundColor: serviceType === service ? '#0D2847' : 'transparent',
//                   color: serviceType === service ? 'white' : '#0D2847',
//                 }}
//               >
//                 {service}
//               </Button>
//             ))}
//           </Box>

//           <Paper sx={{ p: 3 }}>
//             <Typography variant="h6" sx={{ mb: 2 }}>
//               Service Request Form
//             </Typography>
//             <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
//               <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} required />
//               <TextField
//                 label="Address"
//                 multiline
//                 rows={2}
//                 fullWidth
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 required
//               />
//               <TextField
//                 label="Phone No"
//                 fullWidth
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 required
//               />
//               <TextField
//                 label="Additional Notes"
//                 multiline
//                 rows={3}
//                 fullWidth
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//               />
//               <Button type="submit" variant="contained" sx={{ backgroundColor: '#0D2847' }}>
//                 Submit Request
//               </Button>
//             </Box>
//           </Paper>
//         </Grid>

//         {/* Right Panel: Submitted Service Requests */}
//         <Grid item xs={12} md={6}>
//           <Typography variant="h5" sx={{ mb: 3 }}>
//             Submitted Service Requests
//           </Typography>
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//             {requests.length > 0 ? (
//               requests.map((request) => (
//                 <Paper key={request.id} sx={{ p: 3, borderLeft: `5px solid #0D2847` }}>
//                   <Typography variant="h6">{request.serviceType}</Typography>
//                   <Typography>
//                     <strong>Name:</strong> {request.name}
//                   </Typography>
//                   <Typography>
//                     <strong>Address:</strong> {request.address}
//                   </Typography>
//                   <Typography>
//                     <strong>Phone:</strong> {request.phoneNo}
//                   </Typography>
//                   <Typography>
//                     <strong>Notes:</strong> {request.additionalNotes || 'N/A'}
//                   </Typography>
//                 </Paper>
//               ))
//             ) : (
//               <Typography>No service requests available.</Typography>
//             )}
//           </Box>
//         </Grid>
//       </Grid>

//       {/* Full Width: Available Vendors */}
//       <Box sx={{ mt: 6 }}>
//         <Typography variant="h5" sx={{ mb: 3 }}>
//           Available Vendors
//         </Typography>
//         {vendors.length > 0 ? (
//           <Grid container spacing={2}>
//             {vendors.map((vendor) => (
//               <Grid item xs={12} sm={4} key={vendor.id}>
//                 <Paper
//                   sx={{
//                     p: 3,
//                     borderLeft: `5px solid #0D2847`,
//                     backgroundColor: '#F5F5F5', // Faint Background Color
//                     transition: 'transform 0.2s',
//                     '&:hover': { transform: 'scale(1.05)' },
//                   }}
//                 >
//                   <Typography variant="h6">{vendor.name}</Typography>
//                   <Typography>
//                     <strong>Service:</strong> {vendor.service}
//                   </Typography>
//                   <Typography>
//                     <strong>Company:</strong> {vendor.company}
//                   </Typography>
//                   <Typography>
//                     <strong>Phone:</strong> {vendor.phoneNo}
//                   </Typography>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Typography>No vendors available for this service.</Typography>
//         )}
//       </Box>
//     </Box>
//   );
// }

// export default RequestServices;




import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, Box, Grid } from '@mui/material';

function RequestServices() {
  const [serviceType, setServiceType] = useState('Water Can');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [vendors, setVendors] = useState([]);

  const services = ['Water Can', 'House Keeping', 'Gas', 'Plumbing', 'Garbage Collection'];

  // Fetch vendors by service type
  const fetchVendors = async () => {
    try {
      const response = await fetch(`http://localhost:8080/vendors/service/${serviceType}`);
      if (response.ok) {
        const data = await response.json();
        setVendors(Array.isArray(data) ? data : data.vendors || []);
      } else {
        console.error('Failed to fetch vendors.');
      }
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, [serviceType]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = { serviceType, name, address, phoneNo: phone, additionalNotes: notes };

    try {
      const response = await fetch('http://localhost:8080/service-requests/add-services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert('Service request sent successfully!');
        setName('');
        setAddress('');
        setPhone('');
        setNotes('');
      } else {
        alert('Failed to send service request.');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Navbar title="Request Services" />

      <Grid container spacing={4}>
        {/* Left Panel: Service Request Form */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Select Service Type
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
            {services.map((service, index) => (
              <Button
                key={service}
                variant={serviceType === service ? 'contained' : 'outlined'}
                onClick={() => setServiceType(service)}
                sx={{
                  backgroundColor: serviceType === service ? '#0D2847' : 'transparent',
                  color: serviceType === service ? 'white' : '#0D2847',
                  width: 'calc(25% - 8px)',
                }}
              >
                {service}
              </Button>
            ))}
          </Box>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Service Request Form
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} required />
              <TextField
                label="Address"
                multiline
                rows={2}
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <TextField
                label="Phone No"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <TextField
                label="Additional Notes"
                multiline
                rows={3}
                fullWidth
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#0D2847' }}>
                Submit Request
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Right Panel: Available Vendors */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Available Vendors
          </Typography>
          {vendors.length > 0 ? (
            <Grid container spacing={2}>
              {vendors.map((vendor) => (
                <Grid item xs={12} sm={6} key={vendor.id}>
                  <Paper
                    sx={{
                      p: 3,
                      borderLeft: `5px solid #0D2847`,
                      backgroundColor: '#F5F5F5',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'scale(1.05)' },
                    }}
                  >
                    <Typography variant="h6">{vendor.name}</Typography>
                    <Typography>
                      <strong>Service:</strong> {vendor.service}
                    </Typography>
                    <Typography>
                      <strong>Company:</strong> {vendor.company}
                    </Typography>
                    <Typography>
                      <strong>Phone:</strong> {vendor.phoneNo}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No vendors available for this service.</Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default RequestServices;

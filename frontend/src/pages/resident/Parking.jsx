// import Navbar from '../../components/Navbar';

// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Tabs,
//   Tab,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';

// const StyledCard = styled(Card)(({ theme }) => ({
//   margin: theme.spacing(2),
//   borderRadius: theme.spacing(1),
// }));

// const StatCard = styled(Card)(({ theme, color }) => ({
//   padding: theme.spacing(2),
//   backgroundColor: color,
//   color: 'white',
//   minWidth: 200,
//   textAlign: 'center',
//   borderRadius: theme.spacing(1),
// }));

// function Parking() {
//   const [currentBlock, setCurrentBlock] = useState('all');
//   const [parkingData, setParkingData] = useState({
//     total: 0,
//     occupied: 0,
//     available: 0,
//     spots: [],
//   });
//   const [openForm, setOpenForm] = useState(false);
//   const [formData, setFormData] = useState({
//     parkingId: '',
//     flatNumber: '',
//     block: '',
//     status: 'Available',
//   });

//   // Fetch Parking Data from Backend
//   const fetchParkingData = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/parking');
//       const spots = response.data;

//       const occupied = spots.filter((spot) => spot.status === 'Occupied').length;
//       const available = spots.filter((spot) => spot.status === 'Available').length;

//       setParkingData({
//         total: spots.length,
//         occupied,
//         available,
//         spots,
//       });
//     } catch (error) {
//       console.error('Error fetching parking data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchParkingData();
//   }, []);

//   const handleBlockChange = (newValue) => {
//     setCurrentBlock(newValue);
//   };

//   const handleOpenForm = () => setOpenForm(true);
//   const handleCloseForm = () => setOpenForm(false);

//   // Handle Form Input Change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Submit Form Data to Backend
//   const handleSubmit = async () => {
//     try {
//       await axios.post('http://localhost:8080/parking', formData);
//       handleCloseForm();
//       fetchParkingData(); // Refresh Data
//     } catch (error) {
//       console.error('Error adding parking spot:', error);
//     }
//   };

//   // Filter Parking Data Based on Block
//   const filteredSpots = currentBlock === 'all'
//     ? parkingData.spots
//     : parkingData.spots.filter((spot) => spot.block === currentBlock);

//   return (
//     <div className="page">
//       <Navbar title="Parking Management" />

//       {/* Stats Section */}
//       <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
//         <StatCard color="#64B5F6">
//           <Typography variant="h4">{parkingData.total}</Typography>
//           <Typography>Total Parking Lots</Typography>
//         </StatCard>

//         <StatCard color="#E57373">
//           <Typography variant="h4">{parkingData.occupied}</Typography>
//           <Typography>Occupied Lots</Typography>
//         </StatCard>

//         <StatCard color="#81C784">
//           <Typography variant="h4">{parkingData.available}</Typography>
//           <Typography>Available Lots</Typography>
//         </StatCard>
//       </Box>

// {/* Block Selector - Aligning Buttons in the Same Row with Reduced Width */}
// <Box sx={{ display: 'flex', gap: 1, mb: 2, justifyContent: 'rigjt' }}>
//   <Button
//     variant={currentBlock === 'all' ? 'contained' : 'outlined'}
//     onClick={() => handleBlockChange('all')}
//     sx={{ minWidth: 80, width: 100 }} // Adjust width here
//   >
//     All
//   </Button>
//   <Button
//     variant={currentBlock === 'A' ? 'contained' : 'outlined'}
//     onClick={() => handleBlockChange('A')}
//     sx={{ minWidth: 80, width: 100 }} // Adjust width here
//   >
//     Block A
//   </Button>
//   <Button
//     variant={currentBlock === 'B' ? 'contained' : 'outlined'}
//     onClick={() => handleBlockChange('B')}
//     sx={{ minWidth: 80, width: 100 }} // Adjust width here
//   >
//     Block B
//   </Button>
// </Box>

//       {/* Parking Details */}
//       <StyledCard>
//         <CardContent>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>No</TableCell>
//                   <TableCell>Parking ID</TableCell>
//                   <TableCell>Flat Number</TableCell>
//                   <TableCell>Block</TableCell>
//                   <TableCell>Status</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredSpots.map((spot, index) => (
//                   <TableRow key={spot.id}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{spot.parkingId}</TableCell>
//                     <TableCell>{spot.flatNumber}</TableCell>
//                     <TableCell>{spot.block}</TableCell>
//                     <TableCell>{spot.status}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </StyledCard>

//       {/* Add Parking Button */}
//       {/* <Button
//         variant="contained"
//         color="primary"
//         onClick={handleOpenForm}
//         sx={{ position: 'fixed', bottom: 20, right: 20 }}
//       >
//         Add Parking
//       </Button> */}

//       {/* Add Parking Button - Fixed at Bottom Right with Reduced Width */}
// <Button
//   variant="contained"
//   color="primary"
//   onClick={handleOpenForm}
//   sx={{
//     position: 'fixed',
//     bottom: 20,
//     right: 20,
//     width: 150, // Set fixed width
//     zIndex: 1000, // Ensures it stays above other elements
//   }}
// >
//   Add Parking
// </Button>

//       {/* Add Parking Form */}
//       <Dialog open={openForm} onClose={handleCloseForm}>
//         <DialogTitle>Add New Parking Spot</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Parking ID"
//             name="parkingId"
//             value={formData.parkingId}
//             onChange={handleInputChange}
//             fullWidth
//             margin="dense"
//           />
//           <TextField
//             label="Flat Number"
//             name="flatNumber"
//             value={formData.flatNumber}
//             onChange={handleInputChange}
//             fullWidth
//             margin="dense"
//           />
//           <TextField
//             label="Block"
//             name="block"
//             value={formData.block}
//             onChange={handleInputChange}
//             fullWidth
//             margin="dense"
//           />
//           <FormControl fullWidth margin="dense">
//             <InputLabel>Status</InputLabel>
//             <Select
//               name="status"
//               value={formData.status}
//               onChange={handleInputChange}
//             >
//               <MenuItem value="Available">Available</MenuItem>
//               <MenuItem value="Occupied">Occupied</MenuItem>
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseForm} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default Parking;



import Navbar from '../../components/Navbar';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  borderRadius: theme.spacing(1),
}));

const StatCard = styled(Card)(({ theme, color }) => ({
  padding: theme.spacing(2),
  backgroundColor: color,
  color: 'white',
  minWidth: 200,
  textAlign: 'center',
  borderRadius: theme.spacing(1),
}));

function Parking() {
  const [currentBlock, setCurrentBlock] = useState('all');
  const [parkingData, setParkingData] = useState({
    total: 0,
    occupied: 0,
    available: 0,
    spots: [],
  });

  // Fetch Parking Data from Backend
  const fetchParkingData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/parking');
      const spots = response.data;

      const occupied = spots.filter((spot) => spot.status === 'Occupied').length;
      const available = spots.filter((spot) => spot.status === 'Available').length;

      setParkingData({
        total: spots.length,
        occupied,
        available,
        spots,
      });
    } catch (error) {
      console.error('Error fetching parking data:', error);
    }
  };

  useEffect(() => {
    fetchParkingData();
  }, []);

  const handleBlockChange = (newValue) => {
    setCurrentBlock(newValue);
  };

  // Filter Parking Data Based on Block
  const filteredSpots = currentBlock === 'all'
    ? parkingData.spots
    : parkingData.spots.filter((spot) => spot.block === currentBlock);

  return (
    <div className="page">
      <Navbar title="Parking Management" />

      {/* Stats Section */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <StatCard color="#64B5F6">
          <Typography variant="h4">{parkingData.total}</Typography>
          <Typography>Total Parking Lots</Typography>
        </StatCard>

        <StatCard color="#E57373">
          <Typography variant="h4">{parkingData.occupied}</Typography>
          <Typography>Occupied Lots</Typography>
        </StatCard>

        <StatCard color="#81C784">
          <Typography variant="h4">{parkingData.available}</Typography>
          <Typography>Available Lots</Typography>
        </StatCard>
      </Box>

      {/* Block Selector */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2, justifyContent: 'left' }}>
        <Button
          variant={currentBlock === 'all' ? 'contained' : 'outlined'}
          onClick={() => handleBlockChange('all')}
          sx={{ minWidth: 80, width: 100 }}
        >
          All
        </Button>
        <Button
          variant={currentBlock === 'A' ? 'contained' : 'outlined'}
          onClick={() => handleBlockChange('A')}
          sx={{ minWidth: 80, width: 100 }}
        >
          Block A
        </Button>
        <Button
          variant={currentBlock === 'B' ? 'contained' : 'outlined'}
          onClick={() => handleBlockChange('B')}
          sx={{ minWidth: 80, width: 100 }}
        >
          Block B
        </Button>
      </Box>

      {/* Parking Details */}
      <StyledCard>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Parking ID</TableCell>
                  <TableCell>Flat Number</TableCell>
                  <TableCell>Block</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSpots.map((spot, index) => (
                  <TableRow key={spot.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{spot.parkingId}</TableCell>
                    <TableCell>{spot.flatNumber}</TableCell>
                    <TableCell>{spot.block}</TableCell>
                    <TableCell>{spot.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </StyledCard>
    </div>
  );
}

export default Parking;

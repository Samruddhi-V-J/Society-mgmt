import Navbar from '../../components/Navbar';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton
} from '@mui/material';
import { Edit } from '@mui/icons-material'; // Import Edit Icon
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
  const [openForm, setOpenForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    parkingId: '',
    flatNumber: '',
    block: '',
    status: 'Available',
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

  // Open Form for Adding or Editing
  const handleOpenForm = (spot = null) => {
    if (spot) {
      setFormData(spot);
      setEditMode(true);
    } else {
      setFormData({ parkingId: '', flatNumber: '', block: '', status: 'Available' });
      setEditMode(false);
    }
    setOpenForm(true);
  };

  const handleCloseForm = () => setOpenForm(false);

  // Handle Form Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/parking', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.status === 200 || response.status === 201) {
        console.log('Parking spot saved successfully:', response.data);
        fetchParkingData(); // Refresh data after successful save
        handleCloseForm(); // Close form
      } else {
        console.error('Failed to save parking spot:', response);
      }
    } catch (error) {
      console.error('Error saving parking spot:', error);
    }
  };
  
  // Filter Parking Data Based on Block
  const filteredSpots =
    currentBlock === 'all'
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
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        {['all', 'A', 'B'].map((block) => (
          <Button
            key={block}
            variant={currentBlock === block ? 'contained' : 'outlined'}
            onClick={() => handleBlockChange(block)}
            sx={{ minWidth: 80, width: 100 }}
          >
            {block === 'all' ? 'All' : `Block ${block}`}
          </Button>
        ))}
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
                  <TableCell>Actions</TableCell>
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
                    <TableCell>
                      <IconButton onClick={() => handleOpenForm(spot)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </StyledCard>

      {/* Add Parking Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenForm()}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 150,
          zIndex: 1000,
        }}
      >
        Add Parking
      </Button>

      {/* Add/Edit Parking Form */}
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>{editMode ? 'Edit Parking Spot' : 'Add New Parking Spot'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Parking ID"
            name="parkingId"
            value={formData.parkingId}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            disabled={editMode}
          />
          <TextField
            label="Flat Number"
            name="flatNumber"
            value={formData.flatNumber}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Block"
            name="block"
            value={formData.block}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select name="status" value={formData.status} onChange={handleInputChange}>
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Occupied">Occupied</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Parking;

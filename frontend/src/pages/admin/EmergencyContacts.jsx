
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';

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
  Tabs,
  Tab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

// Styled Material-UI Card
const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  borderRadius: theme.spacing(1),
}));

function EmergencyContacts() {
  const [currentBlock, setCurrentBlock] = useState('A');
  const [securityGuards, setSecurityGuards] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [newGuard, setNewGuard] = useState({ name: '', block: 'A', phone: '' });

  // Fetch guards from backend when the component loads
  useEffect(() => {
    fetchGuards();
  }, []);

  // Fetch security guards from Spring Boot API
  const fetchGuards = async () => {
    try {
      const response = await axios.get('http://localhost:8080/guards');
      setSecurityGuards(response.data);
    } catch (error) {
      console.error('Error fetching guards:', error);
    }
  };

  // Handle Block Change (Switch Between Blocks A and B)
  const handleBlockChange = (event, newValue) => {
    setCurrentBlock(newValue);
  };

  // Open the Add Security Form
  const handleOpenForm = () => {
    setOpenForm(true);
  };

  // Close the Add Security Form
  const handleCloseForm = () => {
    setOpenForm(false);
    setNewGuard({ name: '', block: 'A', phone: '' });
  };

  // Handle Form Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGuard({ ...newGuard, [name]: value });
  };

  // Submit the Form - Add New Guard to Backend
  const handleAddGuard = async () => {
    try {
      await axios.post('http://localhost:8080/guards', newGuard);
      fetchGuards(); // Refresh list after adding new guard
      handleCloseForm(); // Close form after submission
    } catch (error) {
      console.error('Error adding guard:', error);
    }
  };

  return (
    <div className="page">
      <Navbar title="Emergency Contacts" />

      {/* Tabs for Block Navigation & Add Security Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        {/* <Tabs value={currentBlock} onChange={handleBlockChange}>
          <Tab value="A" label="Block - A" />
          <Tab value="B" label="Block - B" />
        </Tabs> */}
         <Tabs
    value={currentBlock}
    onChange={(event, newValue) => setCurrentBlock(newValue)}
  >
    <Tab value="A" label="Block - A" />
    <Tab value="B" label="Block - B" />
  </Tabs>

        <Button
          // variant="contained"
          // sx={{ bgcolor: '#1a237e', '&:hover': { bgcolor: '#0d1b60' } }}
          variant="contained"
  sx={{
    bgcolor: '#1a237e',
    '&:hover': { bgcolor: '#0d1b60' },
    width: '150px' // Reduced width
  }}
          onClick={handleOpenForm}
        >
          Add Security
        </Button>
      </Box>

      {/* Security Guards Information Card */}
      <StyledCard>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Block - {currentBlock}
          </Typography>

          {/* Security Guards Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Block</TableCell>
                  <TableCell>Phone Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {securityGuards
                  .filter((guard) => guard.block === currentBlock)
                  .map((guard, index) => (
                    <TableRow key={guard.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{guard.name}</TableCell>
                      <TableCell>{guard.block}</TableCell>
                      <TableCell>{guard.phone}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </StyledCard>

      {/* Add Security Form (Dialog) */}
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>Add New Security Guard</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={newGuard.name}
            onChange={handleInputChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Block"
            name="block"
            value={newGuard.block}
            onChange={handleInputChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={newGuard.phone}
            onChange={handleInputChange}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddGuard} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EmergencyContacts;

import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Grid, MenuItem, Select } from '@mui/material';
import Navbar from '../../components/Navbar';

function Complaints() {
  const [complaints, setComplaints] = useState([]);

  // Fetch complaints from the backend
  const fetchComplaints = async () => {
    try {
      const response = await fetch('http://localhost:8080/complaints/all-complaints');
      if (response.ok) {
        const data = await response.json();
        setComplaints(data.map(complaint => ({ ...complaint, status: complaint.status || 'Unsolved' })));
      } else {
        console.error('Failed to fetch complaints');
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Handle status update

  const handleStatusChange = async (id, newStatus) => {
    try {
      const complaintToUpdate = complaints.find(complaint => complaint.id === id);
      
      if (!complaintToUpdate) {
        console.error('Complaint not found');
        return;
      }
  
      const updatedComplaint = { ...complaintToUpdate, status: newStatus };
  
      const response = await fetch(`http://localhost:8080/complaints/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedComplaint), // Send the whole complaint object
      });
  
      if (response.ok) {
        setComplaints(prevComplaints =>
          prevComplaints.map(complaint =>
            complaint.id === id ? updatedComplaint : complaint
          )
        );
      } else {
        console.error('Failed to update complaint status');
      }
    } catch (error) {
      console.error('Error updating complaint status:', error);
    }
  };
  
  // const handleStatusChange = async (id, newStatus) => {
  //   try {
  //     const response = await fetch(`http://localhost:8080/complaints/update/${id}`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ status: newStatus }),
  //     });

  //     if (response.ok) {
  //       setComplaints(prevComplaints =>
  //         prevComplaints.map(complaint =>
  //           complaint.id === id ? { ...complaint, status: newStatus } : complaint
  //         )
  //       );
  //     } else {
  //       console.error('Failed to update complaint status');
  //     }
  //   } catch (error) {
  //     console.error('Error updating complaint status:', error);
  //   }
  // };

  return (
    <Box className="complaints-section" p={4}>
      <Navbar title="Complaints Management" />

      {/* Statistics */}
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Paper sx={{ p: 3, flex: 1, textAlign: 'center', mx: 1 }}>
          <Typography variant="h6">Total Complaints</Typography>
          <Typography variant="h4">{complaints.length}</Typography>
        </Paper>
        <Paper sx={{ p: 3, flex: 1, textAlign: 'center', mx: 1 }}>
          <Typography variant="h6">Solved</Typography>
          <Typography variant="h4">{complaints.filter((c) => c.status === 'Solved').length}</Typography>
        </Paper>
        <Paper sx={{ p: 3, flex: 1, textAlign: 'center', mx: 1 }}>
          <Typography variant="h6">Unsolved</Typography>
          <Typography variant="h4">{complaints.filter((c) => c.status === 'Unsolved').length}</Typography>
        </Paper>
      </Box>

      {/* Complaint List */}
      <Typography variant="h5" mb={2}>Complaint History</Typography>
      <Grid container spacing={2}>
        {complaints.map((complaint) => (
          <Grid item xs={12} md={6} key={complaint.id}>
            <Paper sx={{ p: 3, borderLeft: `5px solid ${complaint.status === 'Solved' ? 'green' : 'red'}` }}>
              <Typography variant="h6" gutterBottom>{complaint.title}</Typography>
              <Typography>{complaint.description}</Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                By: {complaint.name} | Status: {complaint.status}
              </Typography>
              
              {/* Status Change Dropdown */}
              <Select
                value={complaint.status}
                onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                fullWidth
                sx={{ mt: 2 }}
                disabled={complaint.status === 'Solved'}
              >
                <MenuItem value="Solved">Solved</MenuItem>
                <MenuItem value="Unsolved">Unsolved</MenuItem>
              </Select>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Complaints;
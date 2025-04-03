import React, { useState, useEffect } from 'react';
// import Navbar from './Navbar';

import Navbar from '../components/Navbar'

import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ResidentList() {
  const navigate = useNavigate();
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/usersdata/residents');
        setResidents(response.data);
      } catch (error) {
        console.error('Error fetching residents:', error);
      }
    };

    fetchResidents();
  }, []);

  return (
    <div className="page">
      {/* <Navbar title="Resident List Management" /> */}

      <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
        {/* <Typography variant="h4" gutterBottom>
          Resident List
        </Typography> */}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Flat Number</TableCell>
                <TableCell>Block</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Family Members</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {residents.map((resident) => (
                <TableRow key={resident.id}>
                  <TableCell>{resident.name}</TableCell>
                  <TableCell>{resident.flatNumber}</TableCell>
                  <TableCell>{resident.block}</TableCell>
                  <TableCell>{resident.phone}</TableCell>
                  <TableCell>{resident.familyMembers}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => navigate('/dashboard')}
                      sx={{
                        bgcolor: '#1a237e',
                        '&:hover': {
                          bgcolor: '#0D2847'
                        }
                      }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default ResidentList;
import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, Box, Grid } from '@mui/material';

function RequestServices() {
  const [serviceType, setServiceType] = useState('Water Can');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [requests, setRequests] = useState([]);
  const [vendors, setVendors] = useState([]);

  const [serialNo, setSerialNo] = useState('');
  const [company, setCompany] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const services = ['Water Can', 'House Keeping', 'Gas', 'Plumbing', 'Garbage Collection'];

  // Fetch all service requests
  const fetchRequests = async () => {
    try {
      const response = await fetch('http://localhost:8080/service-requests/all-services');
      if (response.ok) {
        const data = await response.json();
        setRequests(Array.isArray(data) ? data : []);
      } else {
        console.error('Failed to fetch service requests.');
      }
    } catch (error) {
      console.error('Error fetching service requests:', error);
    }
  };

  // Fetch vendors by service type
  const fetchVendors = async () => {
    try {
      const response = await fetch(`http://localhost:8080/vendors/service/${serviceType}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched Vendors:', data); // Debugging output
        setVendors(Array.isArray(data) ? data : data.vendors || []);
      } else {
        console.error('Failed to fetch vendors.');
      }
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchVendors();
  }, [serviceType]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const vendorData = { serialNo, name, serviceType, company, phoneNo };

    try {
      const response = await fetch('http://localhost:8080/vendors/add-vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vendorData),
      });

      if (response.ok) {
        alert('Vendor added successfully!');
        setSerialNo('');
        setName('');
        setCompany('');
        setPhoneNo('');
        fetchVendors();
      } else {
        alert('Failed to add vendor.');
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

          {/* Updated: Services Grid - 3 services per row */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {services.map((service) => (
              <Grid item xs={12} sm={4} key={service}>
                <Button
                  variant={serviceType === service ? 'contained' : 'outlined'}
                  onClick={() => setServiceType(service)}
                  sx={{
                    width: '100%',
                    backgroundColor: serviceType === service ? '#0D2847' : 'transparent',
                    color: serviceType === service ? 'white' : '#0D2847',
                  }}
                >
                  {service}
                </Button>
              </Grid>
            ))}
          </Grid>

          {/* Vendor Form */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Vendor Details Form
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField label="Serial No" fullWidth value={serialNo} onChange={(e) => setSerialNo(e.target.value)} required />
              <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} required />
              <TextField label="Company" fullWidth value={company} onChange={(e) => setCompany(e.target.value)} required />
              <TextField label="Phone No" fullWidth value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required />
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#0D2847' }}>
                Add Vendor
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Right Panel: Submitted Service Requests */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Submitted Service Requests
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {requests.length > 0 ? (
              requests.map((request) => (
                <Paper key={request.id} sx={{ p: 3, borderLeft: `5px solid #0D2847` }}>
                  <Typography variant="h6">{request.serviceType}</Typography>
                  <Typography><strong>Name:</strong> {request.name}</Typography>
                  <Typography><strong>Address:</strong> {request.address}</Typography>
                  <Typography><strong>Phone:</strong> {request.phoneNo}</Typography>
                  <Typography><strong>Notes:</strong> {request.additionalNotes || 'N/A'}</Typography>
                </Paper>
              ))
            ) : (
              <Typography>No service requests available.</Typography>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Full Width: Available Vendors */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Available Vendors
        </Typography>
        {vendors.length > 0 ? (
          <Grid container spacing={2}>
            {vendors.map((vendor) => (
              <Grid item xs={12} sm={4} key={vendor.id}>
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
                  <Typography><strong>Service:</strong> {vendor.serviceType}</Typography>
                  <Typography><strong>Company:</strong> {vendor.company}</Typography>
                  <Typography><strong>Phone:</strong> {vendor.phoneNo}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No vendors available for this service.</Typography>
        )}
      </Box>
    </Box>
  );
}

export default RequestServices;

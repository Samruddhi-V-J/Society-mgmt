import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  LocalPolice as PoliceIcon,
  LocalFireDepartment as FireIcon,
  LocalHospital as HospitalIcon,
  ElectricBolt as ElectricityIcon,
  GasMeter as GasIcon,
  Person as ManagerIcon,
  Engineering as MaintenanceIcon,
} from '@mui/icons-material';
import Navbar from '../../components/Navbar';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#1a237e',
  borderRadius: '50%',
  padding: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}));

const emergencyContacts = [
  {
    title: 'Police Station',
    description: 'Local police department',
    icon: PoliceIcon,
    phone: '100',
  },
  {
    title: 'Fire Department',
    description: 'Nearest fire station',
    icon: FireIcon,
    phone: '101',
  },
  {
    title: 'Hospital / Ambulance',
    description: 'Emergency medical services',
    icon: HospitalIcon,
    phone: '108',
  },
  {
    title: 'Electricity Department',
    description: 'Power outage helpline',
    icon: ElectricityIcon,
    phone: '1912',
  },
  {
    title: 'Gas Leakage Helpline',
    description: 'Emergency gas supply issue',
    icon: GasIcon,
    phone: '1906',
  },
  {
    title: 'Society Manager',
    description: 'Contact for society',
    icon: ManagerIcon,
    phone: '9876543210',
  },
  {
    title: 'Lift Maintenance',
    description: 'Lift repair service',
    icon: MaintenanceIcon,
    phone: '18001234567',
  },
];

function Posts() {
  return (
    <div className="page">
      <Navbar title="Emergency Contacts" />
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#1a237e', fontWeight: 500 }}>
            Emergency Contact Numbers
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Important contacts for emergency situations
          </Typography>

          <Grid container spacing={3}>
            {emergencyContacts.map((contact, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <StyledCard>
                  <CardContent>
                    <IconWrapper>
                      <contact.icon sx={{ color: 'white', fontSize: 32 }} />
                    </IconWrapper>
                    <Typography variant="h6" gutterBottom>
                      {contact.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {contact.description}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mt: 2, 
                        color: '#1a237e',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      {contact.phone}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}

export default Posts;
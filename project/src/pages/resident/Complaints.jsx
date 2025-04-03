// import { useState, useEffect } from 'react';
// import { Box, Typography, TextField, Button, Paper, Grid } from '@mui/material';
// import Navbar from '../../components/Navbar';

// function Complaints() {
//   const [formData, setFormData] = useState({
//     name: '',
//     title: '',
//     description: '',
//   });

//   const [complaints, setComplaints] = useState([]);

//   // Fetch complaints from the backend
//   const fetchComplaints = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/complaints/all-complaints');
//       if (response.ok) {
//         const data = await response.json();
//         setComplaints(data);
//       } else {
//         console.error('Failed to fetch complaints');
//       }
//     } catch (error) {
//       console.error('Error fetching complaints:', error);
//     }
//   };

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   // Handle form changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Submit form to backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:8080/complaints/add-complaints', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         alert('Complaint submitted successfully');
//         setFormData({ name: '', title: '', description: '' });
//         fetchComplaints(); // Refresh complaints list
//       } else {
//         alert('Failed to submit complaint');
//       }
//     } catch (error) {
//       console.error('Error submitting complaint:', error);
//     }
//   };

//   return (

     
//     <Box className="complaints-section" p={4}>
//       <Navbar title="Complaints Management" />
  
//       {/* <Typography variant="h4" mb={4}>Complaint Management</Typography> */}

//       {/* Statistics */}
//       <Box display="flex" justifyContent="space-between" mb={4}>
//         <Paper sx={{ p: 3, flex: 1, textAlign: 'center', mx: 1 }}>
//           <Typography variant="h6">Total Complaints</Typography>
//           <Typography variant="h4">{complaints.length}</Typography>
//         </Paper>
//         <Paper sx={{ p: 3, flex: 1, textAlign: 'center', mx: 1 }}>
//           <Typography variant="h6">Solved</Typography>
//           <Typography variant="h4">{complaints.filter((c) => c.status === 'Solved').length}</Typography>
//         </Paper>
//         <Paper sx={{ p: 3, flex: 1, textAlign: 'center', mx: 1 }}>
//           <Typography variant="h6">Unsolved</Typography>
//           <Typography variant="h4">{complaints.filter((c) => c.status === 'Unsolved').length}</Typography>
//         </Paper>
//       </Box>

//       {/* Complaint Form */}
//       <Paper sx={{ p: 4, mb: 4 }}>
//         <Typography variant="h5" mb={2}>Submit a Complaint</Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             fullWidth
//             multiline
//             rows={4}
//             margin="normal"
//             required
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             sx={{ mt: 2, backgroundColor: '#0D2847', '&:hover': { backgroundColor: '#0A1F35' } }}
//           >
//             Submit Complaint
//           </Button>
//         </form>
//       </Paper>

//       {/* Complaint List */}
//       <Typography variant="h5" mb={2}>Complaint History</Typography>
//       <Grid container spacing={2}>
//         {complaints.map((complaint) => (
//           <Grid item xs={12} md={6} key={complaint.id}>
//             <Paper sx={{ p: 3, borderLeft: `5px solid ${complaint.status === 'Solved' ? 'green' : 'red'}` }}>
//               <Typography variant="h6" gutterBottom>{complaint.title}</Typography>
//               <Typography>{complaint.description}</Typography>
//               <Typography variant="body2" color="text.secondary" mt={2}>
//                 By: {complaint.name} | Status: {complaint.status}
//               </Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>

//   );
// }

// export default Complaints;



import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import Navbar from '../../components/Navbar';

function Complaints() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/complaints/add-complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Complaint submitted successfully');
        setFormData({ name: '', title: '', description: '' });
      } else {
        alert('Failed to submit complaint');
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
  };

  return (
    <Box className="complaints-section" p={4}>
      <Navbar title="Complaints Management" />
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" mb={2}>Submit a Complaint</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, backgroundColor: '#0D2847', '&:hover': { backgroundColor: '#0A1F35' } }}
          >
            Submit Complaint
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Complaints;
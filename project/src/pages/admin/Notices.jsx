// import Navbar from '../../components/Navbar';
// import { useState, useEffect } from 'react';
// import { Button, Typography, Box, Paper, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import axios from 'axios';

// function Notices() {
//   const [open, setOpen] = useState(false);
//   const [image, setImage] = useState('');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [dateTime, setDateTime] = useState(null);
//   const [notices, setNotices] = useState([]);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const fetchNotices = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/notices');
//       setNotices(response.data);
//     } catch (error) {
//       console.error('Error fetching notices:', error);
//     }
//   };

//   useEffect(() => {
//     fetchNotices();
//   }, []);

//   const handleSubmit = async () => {
//     try {
//       await axios.post('http://localhost:8080/notices', { image, title, description, dateTime });
//       alert('Notice Created Successfully!');
//       fetchNotices();
//       handleClose();
//     } catch (error) {
//       console.error('Error creating notice:', error);
//       alert('Failed to create notice');
//     }
//   };

//   return (
//     <div className="page">
//       <Navbar title="Notices Management" />
      
//       {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}> */}
//         {/* <Typography variant="h4">Notices</Typography> */}
//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
//         <Button 
//           variant="contained"
//           onClick={handleOpen}
//           sx={{ 
//             backgroundColor: '#0D2847',
//             width: '150px',
//             '&:hover': {
//               backgroundColor: '#0A1F35'
//             }
//           }}
//         >
//           Create Notice
//         </Button>
//       </Box>

//       {notices.map((notice) => (
//         <Paper key={notice.id} sx={{ p: 3, mb: 2 }}>
//           <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
//             <img 
//               src={notice.image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 24 24'%3E%3Cpath fill='%23ff0000' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v7h-2zm0 8h2v2h-2z'/%3E%3C/svg%3E"}
//               alt="Notice"
//               style={{ width: 50, height: 50 }}
//             />
//             <Box sx={{ flex: 1 }}>
//               <Typography variant="h6" sx={{ mb: 1 }}>{notice.title}</Typography>
//               <Typography variant="body1" color="text.secondary">
//                 {notice.description}
//               </Typography>
//               <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
//                 {new Date(notice.dateTime).toLocaleString()}
//               </Typography>
//             </Box>
//           </Box>
//         </Paper>
//       ))}

//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle>Create Notice</DialogTitle>
//         <DialogContent>
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
            
//             <TextField
//               label="Title"
//               placeholder="Enter notice title"
//               fullWidth
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DateTimePicker
//                 label="Date & Time"
//                 value={dateTime}
//                 onChange={setDateTime}
//                 renderInput={(params) => <TextField {...params} fullWidth />}
//               />
//             </LocalizationProvider>
//             <TextField
//               label="Description"
//               placeholder="Enter notice description"
//               multiline
//               rows={4}
//               fullWidth
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//             <Button 
//               variant="contained"
//               onClick={handleSubmit}
//               sx={{ 
//                 backgroundColor: '#0D2847',
//                 '&:hover': {
//                   backgroundColor: '#0A1F35'
//                 }
//               }}
//             >
//               Submit Notice
//             </Button>
//           </Box>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default Notices;


import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';
import { Button, Typography, Box, Paper, Dialog, DialogTitle, DialogContent, TextField, IconButton } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

function Notices() {
  const [open, setOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null); // Stores the notice being edited
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState(null);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get('http://localhost:8080/notices');
      setNotices(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  const handleOpen = (notice = null) => {
    if (notice) {
      // Editing existing notice
      setEditingNotice(notice);
      setImage(notice.image);
      setTitle(notice.title);
      setDescription(notice.description);
      setDateTime(notice.dateTime);
    } else {
      // Creating a new notice
      setEditingNotice(null);
      setImage('');
      setTitle('');
      setDescription('');
      setDateTime(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingNotice(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingNotice) {
        // Update existing notice
        await axios.put(`http://localhost:8080/notices/${editingNotice.id}`, {
          image, title, description, dateTime
        });
        alert('Notice Updated Successfully!');
      } else {
        // Create new notice
        await axios.post('http://localhost:8080/notices', {
          image, title, description, dateTime
        });
        alert('Notice Created Successfully!');
      }
      fetchNotices();
      handleClose();
    } catch (error) {
      console.error('Error saving notice:', error);
      alert('Failed to save notice');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await axios.delete(`http://localhost:8080/notices/${id}`);
        alert('Notice Deleted Successfully!');
        fetchNotices();
      } catch (error) {
        console.error('Error deleting notice:', error);
        alert('Failed to delete notice');
      }
    }
  };

  return (
    <div className="page">
      <Navbar title="Notices Management" />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
        <Button 
          variant="contained"
          onClick={() => handleOpen()}
          sx={{ backgroundColor: '#0D2847', width: '150px', '&:hover': { backgroundColor: '#0A1F35' } }}
        >
          Create Notice
        </Button>
      </Box>

      {notices.map((notice) => (
        <Paper key={notice.id} sx={{ p: 3, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <img 
                src={notice.image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 24 24'%3E%3Cpath fill='%23ff0000' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v7h-2zm0 8h2v2h-2z'/%3E%3C/svg%3E"}
                alt="Notice"
                style={{ width: 50, height: 50 }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>{notice.title}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {notice.description}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
                  {new Date(notice.dateTime).toLocaleString()}
                </Typography>
              </Box>
            </Box>
            <Box>
              <IconButton onClick={() => handleOpen(notice)} color="primary">
                <Edit />
              </IconButton>
              <IconButton onClick={() => handleDelete(notice.id)} color="error">
                <Delete />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      ))}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingNotice ? 'Edit Notice' : 'Create Notice'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
            <TextField
              label="Title"
              placeholder="Enter notice title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Date & Time"
                value={dateTime}
                onChange={setDateTime}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
            <TextField
              label="Description"
              placeholder="Enter notice description"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button 
              variant="contained"
              onClick={handleSubmit}
              sx={{ backgroundColor: '#0D2847', '&:hover': { backgroundColor: '#0A1F35' } }}
            >
              {editingNotice ? 'Update Notice' : 'Submit Notice'}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Notices;

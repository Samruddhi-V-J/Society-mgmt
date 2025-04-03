import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';
import { Button, Typography, Box, Paper, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'axios';

function Notices() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState(null);
  const [notices, setNotices] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchNotices = async () => {
    try {
      const response = await axios.get('http://localhost:8080/notices');
      setNotices(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);



  return (
    <div className="page">
      <Navbar title="Notices Management" />
      

      {notices.map((notice) => (
        <Paper key={notice.id} sx={{ p: 3, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
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
        </Paper>
      ))}


    </div>
  );
}

export default Notices;
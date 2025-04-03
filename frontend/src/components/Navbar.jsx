  // import { Box, Typography, Avatar } from '@mui/material';
  // import { useEffect, useState } from 'react';
  // import axios from 'axios';

  // function Navbar({ title }) {
  //   const [username, setUsername] = useState("User");

  //   useEffect(() => {
  //     const fetchUserDetails = async () => {
  //       const email = localStorage.getItem("userEmail");
  //       if (!email) return;

  //       try {
  //         const response = await axios.get(`http://localhost:8080/api/user-details?email=${email}`);
  //         if (response.status === 200) {
  //           setUsername(response.data.name);

  //           localStorage.setItem("userName", response.data.name);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user details:", error);
  //       }
  //     };

  //     fetchUserDetails();
  //   }, []);

  //   return (
  //     <Box sx={{
  //       display: 'flex',
  //       justifyContent: 'space-between',
  //       alignItems: 'center',
  //       mb: 4,
  //       py: 2,
  //       borderBottom: '1px solid #e0e0e0'
  //     }}>
  //       <Typography variant="h4" component="h1">
  //         {title}
  //       </Typography>
  //       <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
  //         <Typography variant="subtitle1">{username}</Typography>
  //         <Avatar sx={{ bgcolor: '#1B2B65' }}>{username.charAt(0).toUpperCase()}</Avatar>
  //       </Box>
  //     </Box>
  //   );
  // }

  // export default Navbar;



  import { Box, Typography, Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Navbar({ title }) {
  const [userDetails, setUserDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const email = localStorage.getItem("userEmail");
      if (!email) return;

      try {
        const response = await axios.get(`http://localhost:8080/api/user-details?email=${email}`);
        if (response.status === 200) {
          setUserDetails(response.data);
          localStorage.setItem("userName", response.data.name);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 4,
      py: 2,
      borderBottom: '1px solid #e0e0e0'
    }}>
      <Typography variant="h4" component="h1">
        {title}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        {/* Username & Avatar */}
        {userDetails && (
          <Box 
            sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }} 
            onClick={() => setShowDetails(!showDetails)}
          >
            <Typography variant="subtitle1">{userDetails.name}</Typography>
            <Avatar sx={{ bgcolor: '#1B2B65' }}>{userDetails.name.charAt(0).toUpperCase()}</Avatar>
          </Box>
        )}

        {/* Show details only when clicked and userDetails exists */}
        {showDetails && userDetails && (
          <Box sx={{ mt: 1, p: 2, bgcolor: '#f5f5f5', borderRadius: 1, boxShadow: 1, width: 280 }}>
            <Typography variant="body1"><b>Email:</b> {userDetails.email}</Typography>
            <Typography variant="body1"><b>Phone:</b> {userDetails.phone}</Typography>
            <Typography variant="body1"><b>Society:</b> {userDetails.societyName}</Typography>
            <Typography variant="body1"><b>Flat No:</b> {userDetails.flatNo}</Typography>
            <Typography variant="body1"><b>Postal Code:</b> {userDetails.postal}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Navbar;

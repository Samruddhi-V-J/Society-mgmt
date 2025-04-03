
// import Navbar from '../../components/Navbar';
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Rating,
//   TextField,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Avatar
// } from '@mui/material';
// import { styled } from '@mui/material/styles';

// const StyledCard = styled(Card)(({ theme }) => ({
//   margin: theme.spacing(2),
//   borderRadius: theme.spacing(1),
// }));

// function Feedback() {
//   const [event, setEvent] = useState(null);
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [newFeedback, setNewFeedback] = useState("");
//   const [rating, setRating] = useState(0);


//   useEffect(() => {
//     // ✅ Fetch the most recent event
//     fetch("http://localhost:8080/api/events/latest")
//       .then(response => response.json())
//       .then(data => {
//         setEvent(data);

//         // ✅ Fetch feedbacks for this event
//         return fetch(`http://localhost:8080/feedbacks?eventId=${data.id}`);
//       })
//       .then(response => response.json())
//       .then(data => setFeedbacks(data))
//       .catch(error => console.error("Error fetching data:", error));
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (newFeedback.trim() && rating > 0) {
//       const feedbackData = {
//         text: newFeedback,
//         rating,
//         eventId: event?.id,
//       };

//       fetch("http://localhost:8080/feedbacks", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(feedbackData),
//       })
//         .then(response => response.json())
//         .then((data) => {
//           setFeedbacks([...feedbacks, data]); // Update feedback list
//           setNewFeedback("");
//           setRating(0);
//         })
//         .catch(error => console.error("Error submitting feedback:", error));
//     }
//   };

//   return (
//     <div className="page">
//       <Navbar title="Feedback Management" />

//       {event && (
//         <StyledCard>
//           <CardContent>
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Avatar src={`data:image/png;base64,${event.imageBase64}`} sx={{ mr: 2 }} />
//               <Typography variant="h6">{event.name}</Typography>
//             </Box>

//             <Typography variant="body1" color="text.secondary" gutterBottom>
//               {event.date}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {event.description}
//             </Typography>

//             <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//               <Rating
//                 value={rating}
//                 onChange={(event, newValue) => setRating(newValue)}
//                 sx={{ mb: 2 }}
//               />
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={3}
//                 variant="outlined"
//                 placeholder="Write your feedback..."
//                 value={newFeedback}
//                 onChange={(e) => setNewFeedback(e.target.value)}
//                 sx={{ mb: 2 }}
//               />
//               <Button variant="contained" type="submit" sx={{ bgcolor: '#1a237e' }}>
//                 Give Feedback
//               </Button>
//             </Box>
//           </CardContent>
//         </StyledCard>
//       )}

//       <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
//         Feedbacks by the Residents
//       </Typography>

//       <List>
//         {feedbacks.map((feedback, index) => (
//           <React.Fragment key={feedback.id}>
//             <ListItem>
//               <ListItemText
//                 primary={
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <Rating value={feedback.rating} readOnly size="small" sx={{ mr: 2 }} />
//                     <Typography>{feedback.text}</Typography>
//                   </Box>
//                 }
//               />
//             </ListItem>
//             {index < feedbacks.length - 1 && <Divider />}
//           </React.Fragment>
//         ))}
//       </List>
//     </div>
//   );
// }

// export default Feedback;



import Navbar from '../../components/Navbar';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Rating,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  borderRadius: theme.spacing(1),
}));

function Feedback() {
  const [event, setEvent] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [username, setUsername] = useState(localStorage.getItem("userName") || "User"); // ✅ Get username from localStorage

  useEffect(() => {
    // ✅ Fetch the most recent event
    fetch("http://localhost:8080/api/events/latest")
      .then(response => response.json())
      .then(data => {
        setEvent(data);

        // ✅ Fetch feedbacks for this event
        return fetch(`http://localhost:8080/feedbacks/event/${data.id}`);
      })
      .then(response => response.json())
      .then(data => setFeedbacks(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newFeedback.trim() && rating > 0) {
      const feedbackData = {
        text: newFeedback,
        rating,
        eventId: event?.id,
        username, // ✅ Store username in feedback
      };

      fetch("http://localhost:8080/feedbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData),
      })
        .then(response => response.json())
        .then((data) => {
          setFeedbacks([...feedbacks, data]); // Update feedback list
          setNewFeedback("");
          setRating(0);
        })
        .catch(error => console.error("Error submitting feedback:", error));
    }
  };

  return (
    <div className="page">
      <Navbar title="Feedback Management" />

      {event && (
        <StyledCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar src={`data:image/png;base64,${event.imageBase64}`} sx={{ mr: 2 }} />
              <Typography variant="h6">{event.name}</Typography>
            </Box>

            <Typography variant="body1" color="text.secondary" gutterBottom>
              {event.date}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.description}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Rating
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                placeholder="Write your feedback..."
                value={newFeedback}
                onChange={(e) => setNewFeedback(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" type="submit" sx={{ bgcolor: '#1a237e' }}>
                Give Feedback
              </Button>
            </Box>
          </CardContent>
        </StyledCard>
      )}

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Feedbacks by the Residents
      </Typography>

      <List>
        {feedbacks.map((feedback, index) => (
          <React.Fragment key={feedback.id}>
            <ListItem>
              <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>
                {feedback.username ? feedback.username.charAt(0).toUpperCase() : "?"}
              </Avatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {feedback.username || "Anonymous"} {/* ✅ Show username */}
                    </Typography>
                    <Rating value={feedback.rating} readOnly size="small" sx={{ mb: 1 }} />
                    <Typography variant="body2">{feedback.text}</Typography>
                  </Box>
                }
              />
            </ListItem>
            {index < feedbacks.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default Feedback;

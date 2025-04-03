

// // // import React, { useState, useEffect } from "react";
// // // import FullCalendar from "@fullcalendar/react";
// // // import dayGridPlugin from "@fullcalendar/daygrid";
// // // import interactionPlugin from "@fullcalendar/interaction";
// // // import axios from "axios";
// // // import Navbar from '../../components/Navbar';
// // // import "../../styles/Events.css";


// // // const BACKEND_URL = "http://localhost:8080/api/events"; // Update with your backend URL

// // // const Events = () => {
// // //   const [events, setEvents] = useState([]);
// // //   const [showForm, setShowForm] = useState(false);
// // //   const [formData, setFormData] = useState({ title: "", date: "", description: "", image: null });
// // //   const [previewImage, setPreviewImage] = useState(null);

// // //   // Fetch events from the backend on component mount
// // //   useEffect(() => {
// // //     fetchEvents();
// // //   }, []);

// // //   const fetchEvents = async () => {
// // //     try {
// // //       const response = await axios.get(BACKEND_URL);
// // //       const eventData = response.data.map(event => ({
// // //         title: event.name,
// // //         start: event.date,
// // //         extendedProps: {
// // //           description: event.description,
// // //           image: event.imageBase64 ? `data:image/png;base64,${event.imageBase64}` : null,
// // //         },
// // //       }));
// // //       setEvents(eventData);
// // //     } catch (error) {
// // //       console.error("Error fetching events:", error);
// // //     }
// // //   };

// // //   // Handle date click to open form
// // //   const handleDateClick = (arg) => {
// // //     setFormData({ ...formData, date: arg.dateStr });
// // //     setShowForm(true);
// // //   };

// // //   // Handle form input changes
// // //   const handleChange = (e) => {
// // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // //   };

// // //   // handleImageChange

// // //   const handleImageChange = (e) => {
// // //     const file = e.target.files[0];
// // //     if (file) {
// // //       if (!file.type.startsWith("image/")) {
// // //         alert("Please select a valid image file.");
// // //         return;
// // //       }
  
// // //       if (file.size > 5 * 1024 * 1024) {  // Limit to 5MB as per backend validation
// // //         alert("File size should be less than 5MB.");
// // //         return;
// // //       }
  
// // //       setFormData({ ...formData, image: file }); // Store the File object
  
// // //       const reader = new FileReader();
// // //       reader.onloadend = () => {
// // //         setPreviewImage(reader.result);
// // //       };
// // //       reader.readAsDataURL(file);
// // //     }
// // //   };


// // //   return (
// // //     <div className="container">
// // //       {/* <Navbar title="Event Management" /> */}
// // //       <h1>Event Calendar</h1>
// // //       <div className="calendar-container">
// // //         <FullCalendar
// // //           plugins={[dayGridPlugin, interactionPlugin]}
// // //           initialView="dayGridMonth"
// // //           events={events}
// // //           dateClick={handleDateClick}
// // //         />
// // //       </div>
      
// // //     </div>
// // //   );
// // // };

// // // export default Events;



// // import React, { useState, useEffect } from "react";
// // import FullCalendar from "@fullcalendar/react";
// // import dayGridPlugin from "@fullcalendar/daygrid";
// // import interactionPlugin from "@fullcalendar/interaction";
// // import axios from "axios";
// // import Modal from "react-modal"; // Install using: npm install react-modal
// // import "../../styles/Events.css";

// // const BACKEND_URL = "http://localhost:8080/api/events";

// // const Events = () => {
// //   const [events, setEvents] = useState([]);
// //   const [selectedEvent, setSelectedEvent] = useState(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);

// //   useEffect(() => {
// //     fetchEvents();
// //   }, []);

// //   const fetchEvents = async () => {
// //     try {
// //       const response = await axios.get(BACKEND_URL);
// //       const eventData = response.data.map(event => ({
// //         title: event.name,
// //         start: event.date,
// //         extendedProps: {
// //           description: event.description,
// //           image: event.imageBase64 ? `data:image/png;base64,${event.imageBase64}` : null,
// //         },
// //       }));
// //       setEvents(eventData);
// //     } catch (error) {
// //       console.error("Error fetching events:", error);
// //     }
// //   };

// //   // Handle event click to show pop-up
// //   const handleEventClick = (info) => {
// //     setSelectedEvent(info.event);
// //     setIsModalOpen(true);
// //   };

// //   return (
// //     <div className="container">
// //       <h1>Event Calendar</h1>
// //       <div className="calendar-container">
// //         <FullCalendar
// //           plugins={[dayGridPlugin, interactionPlugin]}
// //           initialView="dayGridMonth"
// //           events={events}
// //           eventClick={handleEventClick} // Show modal when event is clicked
// //         />
// //       </div>

// //       {/* Event Details Modal */}
// //       {selectedEvent && (
// //         <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal">
// //           <div className="modal-content">
// //             <h2>{selectedEvent.title}</h2>
// //             <p><strong>Date:</strong> {selectedEvent.start.toISOString().split("T")[0]}</p>
// //             <p><strong>Description:</strong> {selectedEvent.extendedProps.description}</p>
// //             {selectedEvent.extendedProps.image && (
// //               <img src={selectedEvent.extendedProps.image} alt="Event" className="event-image" />
// //             )}
// //             <button onClick={() => setIsModalOpen(false)}>Close</button>
// //           </div>
// //         </Modal>
// //       )}
// //     </div>
// //   );
// // };

// // export default Events;




// import React, { useState, useEffect } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import axios from "axios";
// import Modal from "react-modal"; // Install using: npm install react-modal
// import "../../styles/Events.css";

// const BACKEND_URL = "http://localhost:8080/api/events";

// const Events = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get(BACKEND_URL);
//       const eventData = response.data.map(event => ({
//         title: event.name,
//         start: event.date,
//         extendedProps: {
//           description: event.description,
//           image: event.imageBase64 ? `data:image/png;base64,${event.imageBase64}` : null,
//         },
//       }));
//       setEvents(eventData);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };

//   // Handle event click to show pop-up
//   const handleEventClick = (info) => {
//     setSelectedEvent(info.event);
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="container">
//       <h1>Event Calendar</h1>
//       <div className="calendar-container">
//         <FullCalendar
//           plugins={[dayGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={events}
//           eventClick={handleEventClick} // Show modal when event is clicked
//         />
//       </div>

//       {/* Event Details Modal */}
//       {selectedEvent && (
//         <Modal 
//           isOpen={isModalOpen} 
//           onRequestClose={() => setIsModalOpen(false)} 
//           className="modal"
//           overlayClassName="overlay"
//         >
//           <div className="modal-content">
//             <button className="close-button" onClick={() => setIsModalOpen(false)}>❌</button>
//             <h2>{selectedEvent.title}</h2>
//             <p><strong>Date:</strong> {selectedEvent.start.toISOString().split("T")[0]}</p>
//             <p><strong>Description:</strong> {selectedEvent.extendedProps.description}</p>
//             {selectedEvent.extendedProps.image && (
//               <img src={selectedEvent.extendedProps.image} alt="Event" className="event-image" />
//             )}
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default Events;



import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import Modal from "react-modal"; // Install using: npm install react-modal
// import "../../styles/Events.css";

import './style/Events.css'

const BACKEND_URL = "http://localhost:8080/api/events";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(BACKEND_URL);
      const eventData = response.data.map(event => ({
        title: event.name,
        start: event.date,
        extendedProps: {
          description: event.description,
          image: event.imageBase64 ? `data:image/png;base64,${event.imageBase64}` : null,
        },
      }));
      setEvents(eventData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Handle event click to show pop-up
  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setIsModalOpen(true);
  };

  // Close modal function
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null); // Reset selectedEvent to avoid stale data
  };

  return (
    <div className="container">
      <h1>Event Calendar</h1>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick} // Show modal when event is clicked
        />
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <Modal 
          isOpen={isModalOpen} 
          onRequestClose={closeModal} 
          className="modal"
          overlayClassName="overlay"
        >
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>❌</button>
            
            {/* Updated order: Title, Date, Description, Close button */}
            <h2>{selectedEvent.title}</h2>
            <p><strong>Date:</strong> {selectedEvent.start.toISOString().split("T")[0]}</p>
            <p><strong>Description:</strong> {selectedEvent.extendedProps.description}</p>
            
            {selectedEvent.extendedProps.image && (
              <img src={selectedEvent.extendedProps.image} alt="Event" className="event-image" />
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Events;

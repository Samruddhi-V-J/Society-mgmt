import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import Navbar from '../../components/Navbar';
import "../../styles/Events.css";


const BACKEND_URL = "http://localhost:8080/api/events"; // Update with your backend URL

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", date: "", description: "", image: null });
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch events from the backend on component mount
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

  // Handle date click to open form
  const handleDateClick = (arg) => {
    setFormData({ ...formData, date: arg.dateStr });
    setShowForm(true);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handleImageChange

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
  
      if (file.size > 5 * 1024 * 1024) {  // Limit to 5MB as per backend validation
        alert("File size should be less than 5MB.");
        return;
      }
  
      setFormData({ ...formData, image: file }); // Store the File object
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // handleSubmit
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.title || !formData.date || !formData.description || !formData.image) {
      alert("Please fill all required fields.");
      return;
    }
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.title);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", formData.image); // Append File object
  
      await axios.post(`${BACKEND_URL}/add-events`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      fetchEvents(); // Refresh event list
  
      // Reset form
      setShowForm(false);
      setFormData({ title: "", date: "", description: "", image: null });
      setPreviewImage(null);
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };
  


 
  return (
    <div className="container">
      {/* <Navbar title="Event Management" /> */}
      <h1>Event Calendar</h1>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
        />
      </div>

      {/* Add Event Button */}
      <button className="add-event-btn" onClick={() => setShowForm(true)}>+ Add Event</button>

      {/* Event Form Modal (Overlay on Calendar) */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Event</h2>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required />

              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />

              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required />

              <label>Event Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {previewImage && <img src={previewImage} alt="Preview" className="image-preview" />}

              <button type="submit">Add Event</button>
              <button className="close-btn" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;

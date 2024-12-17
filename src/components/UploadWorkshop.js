import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button } from '@mui/material';
import './Css/style.css'; // Ensure this path is correct

function UploadWorkshop() {
    const [workshop, setWorkshop] = useState({
        title: '',
        instructor:'',
        company:'',
        description: '',
        benefits: '',
        date: '',
        time: '',
        availableSlots: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setWorkshop({ ...workshop, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', workshop.title);
        formData.append('instructor', workshop.instructor);
        formData.append('company', workshop.company);
        formData.append('description', workshop.description);
        formData.append('benefits', workshop.benefits);
        formData.append('date', workshop.date);
        formData.append('time', workshop.time);
        formData.append('availableSlots', workshop.availableSlots);
        if (imageFile) {
            formData.append('image', imageFile); // Attach the image file
        }

        try {
            const response = await axios.post('https://wmsserver-production.up.railway.app/createworkshops', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Workshop created successfully!');
            setWorkshop({
                title: '',
                instructor:'',
                company:'',
                description: '',
                benefits: '',
                date: '',
                time: '',
                availableSlots: ''
            });
            setImageFile(null);
        } catch (error) {
            console.error("There was an error creating the workshop!", error);
            setMessage('Failed to create workshop.');
        }
    };

    return (
        <div className="upload-container">
            <div className="upload-bg-con">
                <Typography variant="h4" gutterBottom style={{color:"#ffc107",fontFamily:"Copperplate Gothic",fontWeight:"bold"}}>
                    Upload New Workshop
                </Typography>
                
                <form onSubmit={handleSubmit} className="upload-form">
                    <TextField
                        label="Workshop Title"
                        name="title"
                        value={workshop.title}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Workshop Instructor"
                        name="instructor"
                        value={workshop.instructor}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Workshop Company"
                        name="company"
                        value={workshop.company}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Description (comma-separated)"
                        name="description"
                        value={workshop.description}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={1}
                        required
                    />
                    <TextField
                        label="Benefits (comma-separated)"
                        name="benefits"
                        value={workshop.benefits}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={1}
                        required
                    />
                    <TextField
                        type="date"
                        name="date"
                        value={workshop.date}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        type="time"
                        name="time"
                        value={workshop.time}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        type="number"
                        label="Available Slots"
                        name="availableSlots"
                        value={workshop.availableSlots}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        style={{ margin: '10px 0' }}
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Upload Workshop
                    </Button>
                    <Typography variant="body2" style={{ marginTop: '15px', color: 'black' }}>
                        Go back to <a href="/" style={{ color: '#2196f3' }}>Home</a>
                    </Typography>
                </form>
                {message && <Typography className="message">{message}</Typography>}
            </div>
        </div>
    );
}

export default UploadWorkshop;

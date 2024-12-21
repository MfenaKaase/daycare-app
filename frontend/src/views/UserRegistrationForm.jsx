import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const UserRegistrationForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        address: '',
        role: 'parent', // Default role
    });

    const [photo, setPhoto] = useState(null); // Separate state for the photo file
    const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle photo input change
    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]); // Save the file object
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        // Append form data fields
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        // Append photo if exists
        if (photo) {
            formDataToSend.append('photo', photo);
        }

        try {
            const response = await axios.post('http://localhost:8000/api/users', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setAlert({ show: true, message: 'User registered successfully!', variant: 'success' });
        } catch (error) {
            setAlert({
                show: true,
                message: error.response?.data?.message || 'Registration failed',
                variant: 'danger',
            });
        }
    };

    return (
        <div className="container mt-5">
            <h2>User Registration</h2>
            {alert.show && (
                <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
                    {alert.message}
                </Alert>
            )}
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="photo">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control
                        type="file"
                        name="photo"
                        onChange={handlePhotoChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter address (optional)"
                    />
                </Form.Group>

                <Form.Group controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Control as="select" name="role" value={formData.role} onChange={handleChange}>
                        <option value="admin">Admin</option>
                        <option value="parent">Parent</option>
                        <option value="staff">Staff</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Register
                </Button>
            </Form>
        </div>
    );
};

export default UserRegistrationForm;
